# Oracle 分析函数over(Partition by...)及开窗函数 -> 可参考： https://www.cnblogs.com/dongyj/p/5992083.html
 
### 常用的分析函数如下：
```oracle
row_number() over(partition by ... order by ...)
rank() over(partition by ... order by ...)
dense_rank() over(partition by ... order by ...)
count() over(partition by ... order by ...)
max() over(partition by ... order by ...)
min() over(partition by ... order by ...)
sum() over(partition by ... order by ...)
avg() over(partition by ... order by ...)
first_value() over(partition by ... order by ...)
last_value() over(partition by ... order by ...)
lag() over(partition by ... order by ...)
lead() over(partition by ... order by ...)
```

### 一：分析函数over
      Oracle从8.1.6开始提供分析函数，分析函数用于计算基于组的某种聚合值，它和聚合函数的不同之处是对于每个组返回多行，而聚合函数对于每个组只返回一行。 

注意：
    1.在求第一名成绩的时候，不能用row_number()，因为如果同班有两个并列第一，row_number()只返回一个结果 
    2.rank()和dense_rank()的区别是：
      --rank()是跳跃排序，有两个第二名时接下来就是第四名
      --dense_rank()l是连续排序，有两个第二名时仍然跟着第三名
      
### 二：开窗函数           
      开窗函数指定了分析函数工作的数据窗口大小，这个数据窗口大小可能会随着行的变化而变化，举例如下： 
1： 
   over（order by salary） 按照salary排序进行累计，order by是个默认的开窗函数
   over（partition by deptno）按照部门分区
2：
  over（order by salary range between 5 preceding and 5 following）
   每行对应的数据窗口是之前行幅度值不超过5，之后行幅度值不超过5
   
### 关于partition by
    这些都是分析函数，好像是8.0以后才有的 row_number()和rownum差不多，功能更强一点（可以在各个分组内从1开时排序） 
    rank()是跳跃排序，有两个第二名时接下来就是第四名（同样是在各个分组内） 
    dense_rank()l是连续排序，有两个第二名时仍然跟着第三名。
    相比之下row_number是没有重复值的 lag（arg1,arg2,arg3): 
                arg1是从其他行返回的表达式 
                arg2是希望检索的当前行分区的偏移量。是一个正的偏移量，时一个往回检索以前的行的数目。 
                arg3是在arg2表示的数目超出了分组的范围时返回的值。

```
--row_number() 顺序排序
select row_number() over(partition by deptid order by salary) my_rank ,deptid,USERID,salary from tsaler;
--rank() （跳跃排序，如果有两个第一级别时，接下来是第三级别）
select rank() over(partition by deptid order by salary) my_rank,deptid,USERID,salary from tsaler;
--dense_rank（）（连续排序，如果有两个第一级别时，接下来是第二级）
select dense_rank() over(partition by deptid order by salary) my_rank,deptid,USERID,salary from tsaler;
-------方案3解决方案
select * from (select rank() over(partition by deptid order by salary) my_rank,deptid,USERID,salary from tsaler) where my_rank=1;
select * from (select dense_rank() over(partition by deptid order by salary) my_rank,deptid,USERID,salary from tsaler) where my_rank=1;
```
