# InnoDB的七种锁

> [https://mp.weixin.qq.com/s/f4_o-6-JEbIzPCH09mxHJg](https://mp.weixin.qq.com/s/f4_o-6-JEbIzPCH09mxHJg)
> 基于环境： MySQL，InnoDB，默认的隔离级别(RR)

### 1. 自增锁(Auto-inc Locks)

表级锁，专门针对事务插入AUTO_INC的列，如果插入位置冲突，多个事务会阻塞，以保证数据一致性；

最简单的情况，如果一个事务正在往表中插入记录，所有其他事务的插入必须等待，以便第一个事务插入的行，是连续的主键值。

```
CREATE TABLE `t` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into t(name) values(1);
insert into t(name) values(2);
insert into t(name) values(3);
```

事务A处理

```
-- 开启事务A
START transaction ;

insert into t(name) values(4);

-- 然后在另外一个连接事务B中执行插入查看数据隔离
select * from t;

insert into t(name) values(5);

-- 这对于事务A来说，就很奇怪了，AUTO_INCREMENT的列，连续插入了两条记录，一条是4，接下来一条变成了6，就像莫名其妙的幻影。
select * from t;


-- 提交事务
COMMIT;
```

事务B处理

```
-- 在RR的隔离级别下，不可能读取到还未提交事务A生成的数据。
select * from t;

insert into t(name) values(5);
```
  
### 2. 共享/排它锁(Shared and Exclusive Locks)

行级锁，S锁与X锁，强锁；

1. 事务拿到某一行记录的共享S锁，才可以`读取`这一行；
2. 事务拿到某一行记录的排它X锁，才可以`修改`或者`删除`这一行；

![共享排它锁兼容互斥表.png](../images/InnoDB共享排它锁兼容互斥表.png)

即：

1. 多个事务可以拿到一把S锁，`读读可以并行`；
2. 而只有一个事务可以拿到X锁，`写写/读写必须互斥`；

共享/排它锁的潜在问题是，不能充分的并行，解决思路是数据多版本

```
CREATE TABLE `t2` (
  `id` int(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into t2 values(1,1);
insert into t2 values(2,2);
insert into t2 values(3,3);
```

事务A处理

```
-- 开启事务A
START transaction ;

insert into t2 values(4,4);

-- 然后在另外一个连接事务B中执行插入查看数据隔离
select * from t2;

-- 这对于事务A来说，事务B已经插入id为5的数据，这里就会失败
insert into t2 values(5,5);


-- 提交事务
COMMIT;
```

事务B处理

```
-- 在RR的隔离级别下，不可能读取到还未提交事务A生成的数据。
select * from t2;

insert into t2 values(5,5);
```


### 3. 意向锁(Intention Locks)

表级锁，IS锁与IX锁，弱锁，仅仅表明意向；

InnoDB支持多粒度锁(multiple granularity locking)，它允许行级锁与表级锁共存，实际应用中，InnoDB使用的是意向锁。

意向锁是指，未来的某个时刻，事务可能要加共享/排它锁了，先提前声明一个意向。

意向锁有这样一些特点：
1. 首先，意向锁，是一个表级别的锁(table-level locking)；
2. 意向锁分为：
    - 意向共享锁(intention shared lock, IS)，它预示着，事务有意向对表中的某些行加共享S锁
    - 意向排它锁(intention exclusive lock, IX)，它预示着，事务有意向对表中的某些行加排它X锁
    - 举个例子：
    ```
    select ... lock in share mode，要设置IS锁；
    select ... for update，要设置IX锁；
    ```
3. 意向锁协议(intention locking protocol)并不复杂：
- 事务要获得某些行的S锁，必须先获得表的IS锁
- 事务要获得某些行的X锁，必须先获得表的IX锁
4. 由于意向锁仅仅表明意向，它其实是比较弱的锁，意向锁之间并不相互互斥，而是可以并行，其兼容互斥表如下：
![InnoDB意向锁01.png](../images/InnoDB意向锁01.png)
5. 额，既然意向锁之间都相互兼容，那其意义在哪里呢？它会与共享锁/排它锁互斥，其兼容互斥表如下：
![InnoDB意向锁02.png](../images/InnoDB意向锁02.png)

画外音：排它锁是很强的锁，不与其他类型的锁兼容。
这也很好理解，修改和删除某一行的时候，必须获得强锁，禁止这一行上的其他并发，以保障数据的一致性。

### 4. 插入意向锁(Insert Intention Locks)

针对insert的，如果插入位置不冲突，多个事务不会阻塞，以提高插入并发；

对已有数据行的修改与删除，必须加强互斥锁X锁，那对于数据的插入，是否还需要加这么强的锁，来实施互斥呢？插入意向锁，孕育而生。

插入意向锁，是间隙锁(Gap Locks)的一种（所以，也是实施在索引上的），它是专门针对insert操作的。

> 间隙锁下文才会介绍，暂且理解为，它是一种实施在索引上，锁定索引某个区间范围的锁。

它的玩法是：
多个事务，在同一个索引，同一个范围区间插入记录时，如果插入的位置不冲突，不会阻塞彼此。


【思路小结】
1. InnoDB使用共享锁，可以提高读读并发；
2. 为了保证数据强一致，InnoDB使用强互斥锁，保证同一行记录修改与删除的串行性；
3. InnoDB使用插入意向锁，可以提高插入并发；


【继续插入，知识铺垫】 InnoDB的细粒度锁，是实现在索引记录上的，如果查询没有命中索引，也将退化为表锁。

【InnoDB的索引】 InnoDB的索引有两类索引，聚集索引(Clustered Index)与普通索引(Secondary Index)。

InnoDB的每一个表都会有聚集索引：
1. 如果表定义了PK，则PK就是聚集索引；
2. 如果表没有定义PK，则第一个非空unique列是聚集索引；
3. 否则，InnoDB会创建一个隐藏的row-id作为聚集索引；

为了方便说明，后文都将以PK说明。

索引的结构是B+树，这里不展开B+树的细节，说几个结论：
1. 在索引结构中，非叶子节点存储key，叶子节点存储value；
2. 聚集索引，叶子节点存储行记录(row)；
   画外音：所以，InnoDB索引和记录是存储在一起的，而MyISAM的索引和记录是分开存储的。
3. 普通索引，叶子节点存储了PK的值；
   
画外音：
所以，InnoDB的普通索引，如果未满足索引覆盖，实际上会扫描两遍：
- 第一遍，由普通索引找到PK；
- 第二遍，由PK找到行记录；

### 5. 记录锁(Record Locks)

索引记录上加锁，对索引记录实施互斥，以保证数据一致性；

```
-- 开启事务A
START transaction;
select * from t where id=1 for update;
```

```
-- 事务B  这时候无法操作
UPDATE t SET name='111' WHERE id = 1;
```

### 6. 间隙锁(Gap Locks)

间隙锁，它封锁`索引记录中的间隔`，或者第一条索引记录之前的范围，又或者最后一条索引记录之后的范围。

```
-- 会封锁区间，以阻止其他事务id=10的记录插入。
select * from t 
where id between 8 and 15 
for update;

-- 为什么要阻止id=10的记录插入？
-- 如果能够插入成功，头一个事务执行相同的SQL语句，会发现结果集多出了一条记录，即幻影数据。
```

间隙锁的主要目的，就是为了防止其他事务在间隔中插入数据，以导致“不可重复读”。

如果把事务的隔离级别降级为读提交(Read Committed, RC)，间隙锁则会自动失效。


### 7. 临键锁(Next-key Locks)

临键锁，是记录锁与间隙锁的组合，它的封锁范围，既包含索引记录，又包含索引区间。

更具体的，临键锁会封锁索引记录本身，以及索引记录之前的区间。

如果一个会话占有了索引记录R的共享/排他锁，其他会话不能立刻在R之前的区间插入新的索引记录。


依然是上面的例子，InnoDB，RR：

```
t(id PK, name KEY, sex, flag);
```


表中有四条记录：

```
1, shenjian, m, A
3, zhangsan, m, A
5, lisi, m, A
9, wangwu, f, B
```

PK上潜在的临键锁为：

```
(-infinity, 1]
(1, 3]
(3, 5]
(5, 9]
(9, +infinity)
```

临键锁的主要目的，也是为了避免幻读(Phantom Read)。如果把事务的隔离级别降级为RC，临键锁则也会失效。


---


【总结】
1. 自增锁(Auto-inc Locks)：`表级锁`，专门针对事务插入AUTO_INC的列，`如果插入位置冲突，多个事务会阻塞`，以保证数据一致性；
2. 共享/排它锁(Shared and Exclusive Locks)：`行级锁`，S锁与X锁，`强锁`；
3. 意向锁(Intention Locks)：`表级锁`，IS锁与IX锁，`弱锁`，仅仅表明意向；
4. 插入意向锁(Insert Intention Locks)：`针对insert的，如果插入位置不冲突，多个事务不会阻塞`，以提高插入并发；
5. 记录锁(Record Locks)：`索引记录上加锁`，对索引记录实施互斥，以保证数据一致性；
6. 间隙锁(Gap Locks)：`封锁索引记录中间的间隔`，在RR下有效，防止间隔中被其他事务插入；
7. 临键锁(Next-key Locks)：`封锁索引记录，以及索引记录中间的间隔`，在RR下有效，防止幻读；
