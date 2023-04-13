# InnoDB调试死锁

```
-- 间隙锁是否关闭   innodb_locks_unsafe_for_binlog值为ON时关闭区间锁，此时一致性会被破坏（所以是unsafe）  OFF 标识使用区间锁
show global variables like "innodb_locks%";

-- 当前会话事务自动提交配置是否关闭  off为关闭
show session variables like "autocommit";

-- 查看当前会话的隔离级别 RR
select @@tx_isolation;

-- 设置当前session事务手动提交
set session autocommit=0;
```

### 初始化数据

```
create table t (
id int(10) primary key
)engine=innodb;

start transaction;
insert into t values(1);
insert into t values(3);
insert into t values(10);
commit;
```

### 实验一，间隙锁互斥

开启区间锁，RR的隔离级别下，上例会四个区间

```
(-infinity, 1)
(1, 3)
(3, 10)
(10, infinity)
```

事务A删除某个区间内的一条不存在记录，获取到共享间隙锁，会阻止其他事务B在相应的区间插入数据，因为插入需要获取排他间隙锁。

```
-- session A：
start transaction;

delete from t where id = 5;
delete from t where id BETWEEN 5 AND 7;
```

```
-- session B：
start transaction;

insert into t values(0);
insert into t values(2);
insert into t values(12);

select * from t;

insert into t values(7);
```

事务B插入的值：0, 2, 12都不在(3, 10)区间内，能够成功插入，而7在(3, 10)这个区间内，会阻塞。


```
-- 查看锁的情况
show engine innodb status;
```

### 实验二，共享排他锁死锁

```
-- session A先执行：
start transaction;

insert into t values(7);
```


```
-- session B后执行：
start transaction;

insert into t values(7);
```


```
-- session C最后执行：
start transaction;

insert into t values(7);
```

三个事务都试图往表中插入一条为7的记录：

1. A先执行，插入成功，并获取id=7的排他锁；
2. B后执行，需要进行PK校验，故需要先获取id=7的共享锁，阻塞；
3. C后执行，也需要进行PK校验，也要先获取id=7的共享锁，也阻塞；

如果此时，session A执行：

```
rollback;
```

id=7排他锁释放。

则B，C会继续进行主键校验：
1. B会获取到id=7共享锁，主键未互斥；
2. C也会获取到id=7共享锁，主键未互斥；

B和C要想插入成功，必须获得id=7的排他锁，但由于双方都已经获取到id=7的共享锁，它们都无法获取到彼此的排他锁，死锁就出现了。

当然，InnoDB有死锁检测机制，B和C中的一个事务会插入成功，另一个事务会自动放弃：

```
> 1213 - Deadlock found when trying to get lock; try restarting transaction
```

```
-- 查看死锁日志
show engine innodb status \G;

-- 导出日志信息
mysql -uroot -proot --execute="show engine innodb status \G" > /tmp/test.log
```

### 实验三，并发间隙锁的死锁

共享排他锁，在并发量插入相同记录的情况下会出现，相应的案例比较容易分析。而并发的间隙锁死锁，是比较难定位的。

回到数据的初始状态，这次需要两个并发的session，其SQL执行序列如下：

```
A：set session autocommit=0;
A：start transaction;
A：delete from t where id=6;
         B：set session autocommit=0;
         B：start transaction;
         B：delete from t where id=7;
A：insert into t values(5);
          B：insert into t values(8);


A执行delete后，会获得(3, 10)的共享间隙锁。
B执行delete后，也会获得(3, 10)的共享间隙锁。
A执行insert后，希望获得(3, 10)的排他间隙锁，于是会阻塞。
B执行insert后，也希望获得(3, 10)的排他间隙锁，于是死锁出现。
```


---

总结
1. 并发事务，间隙锁可能互斥；
    - A删除不存在的记录，获取共享间隙锁
    - B插入，必须获得排他间隙锁，故互斥
2. 并发插入相同记录，可能死锁（某一个回滚）；
3. 并发插入，可能出现间隙锁死锁（难排查）；
4. show engine innodb status; 可以查看InnoDB的锁情况，也可以调试死锁； 
