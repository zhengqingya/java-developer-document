# MySQL约束主键与唯一索引约束

> https://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651967231&idx=1&sn=c1835e11afc8479af01b0c488112a477

触发约束检测的时机：

1. insert；
2. update；

当检测到违反约束时，不同存储引擎的处理动作是不一样的。

### 如果存储引擎支持事务，SQL会自动回滚。

例子：

```
create table t1 (
    id int(10) primary key
)engine=innodb;
 

insert into t1 values(1);
insert into t1 values(2);
insert into t1 values(2);

update t1 set id=id+1;
```

其中第二条insert会因为违反约束，而导致回滚。

### 如果存储引擎不支持事务，SQL的执行会中断，此时可能会导致后续有符合条件的行不被操作，出现不符合预期的结果。

例子：

```
create table t2 (
    id int(10) unique
)engine=MyISAM;

 
insert into t2 values(1);
insert into t2 values(5);
insert into t2 values(6);
insert into t2 values(10);

update t2 set id=id+1;
```

update执行后，猜猜会得到什么结果集？

1. 猜想一：2, 6, 7, 11
1. 猜想二：1, 5, 6, 10

都不对，正确答案是：2, 5, 6, 10

1. 第一行id=1，加1后，没有违反unique约束，执行成功；
2. 第二行id=5，加1后，由于id=6的记录存在，违反uinique约束，SQL终止，修改失败；
3. 第三行id=6，第四行id=10便不再执行；

画外音：这太操蛋了，一个update语句，部分执行成功，部分执行失败。

为了避免这种情况出现，请使用InnoDB存储引擎，InnoDB在遇到违反约束时，会自动回滚update语句，一行都不会修改成功。

另外，对于insert的约束冲突，可以使用：

```
insert … on duplicate key
```

指出在违反主键或唯一索引约束时，需要进行的额外操作。

例子：

```
create table t3 (
    id int(10) unique,
    flag char(10) default 'true'
)engine=MyISAM;

 

insert into t3(id) values(1);
insert into t3(id) values(5);
insert into t3(id) values(6);
insert into t3(id) values(10);


insert into t3(id) values(10) on duplicate key update flag='false';
```

插入id=10的记录，会违反unique约束，此时执行update flag=’false’，于是有一行记录被update了。

这相当于执行：

```
update t3 set flag='false' where id=10;
```

仔细看，insert的结果返回，提示：

```
Query OK, 2 rows affected
```

有意思么？

总结
对于主键与唯一索引约束：

1. 执行insert和update时，会触发约束检查；
2. InnoDB违反约束时，会回滚对应SQL；
3. MyISAM违反约束时，会中断对应的SQL，可能造成不符合预期的结果集；
4. 可以使用 insert … on duplicate key 来指定触发约束时的动作；
5. 通常使用 show warnings; 来查看与调试违反约束的ERROR；
