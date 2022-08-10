### 一、前言

> 基于`mysql5.7`版本根据binlog进行数据恢复

#### 1、查看自己的数据库版本

```sql
SELECT VERSION();
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/42435a867dfe415da86538a7421eed7a.png)

#### 2、官方文档

mysql5.7之备份和恢复: [https://dev.mysql.com/doc/refman/5.7/en/backup-and-recovery.html](https://dev.mysql.com/doc/refman/5.7/en/backup-and-recovery.html)

![在这里插入图片描述](https://img-blog.csdnimg.cn/1d8d4819ff9043fc89cf3013367d328a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3、查看binlog是否开启

```sql
show variables like 'log_%';
```

`log_bin`值：
1. OFF -> 未开启；
2. ON -> 开启；

![在这里插入图片描述](https://img-blog.csdnimg.cn/5d4cbb215a04420d8cdd5fe79f2ab36f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 4、开启binlog

> 修改`my.cnf`文件，添加如下内容，重启mysql

```
# 同一局域网内注意要唯一
server-id=3306
# 开启二进制日志功能 & 日志位置存放位置`/var/lib/mysql`
#log-bin=mysql-bin
log-bin=/var/lib/mysql/mysql-bin
# binlog格式
# 1. STATEMENT：基于SQL语句的模式，binlog 数据量小，但是某些语句和函数在复制过程可能导致数据不一致甚至出错；
# 2. MIXED：混合模式，根据语句来选用是 STATEMENT 还是 ROW 模式；
# 3. ROW：基于行的模式，记录的是行的完整变化。安全，但 binlog 会比其他两种模式大很多；
binlog_format=ROW
# FULL：binlog记录每一行的完整变更 MINIMAL：只记录影响后的行
binlog_row_image=FULL
# 日志文件大小
max_binlog_size=1G
```

### 二、数据恢复

> 温馨小提示:请先备份数据库!

#### 1、全量恢复

> 此方式只适合对数据有整体备份的情况下做整体恢复，应该更适用于部署新环境时迁移数据时使用
> 可参考： [https://zhengqing.blog.csdn.net/article/details/86481822](https://zhengqing.blog.csdn.net/article/details/86481822)

```shell
# 导出所有数据库数据
mysqldump -h 127.0.0.1 -P 3306  -uroot -proot --all-databases > /tmp/all_20210903.sql

# 导入数据
mysql -uroot -proot
source /tmp/all_20210903.sql
```


#### 2、通过binlog恢复

> 注：数据恢复`mysqlbinlog`相关命令操作在binlog日志文件`/var/lib/mysql`所在路径下操作！
> 不然，binlog日志文件需要写绝对路径！
> 主要根据`时间点`/`事件位置`进行操作恢复数据

```shell
# 进入bin-log日志文件所在目录
cd /var/lib/mysql

# 恢复数据 

# 1、全部恢复（加`--no-defaults`解决`mysqlbinlog: [ERROR] unknown variable 'default-character-set=utf8mb4'`问题）
# mysqlbinlog mysql-bin.000006 | mysql -uroot -proot
mysqlbinlog --no-defaults mysql-bin.000006 | mysql -uroot -proot

# 2、根据时间点恢复
# 2.1、恢复"2021-09-03 00:00:00"之前的数据
mysqlbinlog --no-defaults --stop-datetime="2021-09-03 00:00:00" mysql-bin.000006 | mysql -uroot -proot
# 2.2、恢复"2021-09-03 00:00:00"之后的数据
mysqlbinlog --no-defaults --start-datetime="2021-09-03 00:00:00" mysql-bin.000006 | mysql -uroot -proot
# 2.3、恢复"2021-09-03 00:00:00"-"2021-09-03 23:59:59"之间的数据
mysqlbinlog --no-defaults --start-datetime="2021-09-03 00:00:00" --stop-datetime="2021-09-03 23:59:59" mysql-bin.000006 | mysql -uroot -proot

# 3、根据事件位置恢复
# 3.1、恢复位置"1000"之后的数据
mysqlbinlog --no-defaults --start-position=1000 mysql-bin.000008 | mysql -uroot -proot
# 3.2、恢复位置"1000"之前的数据
mysqlbinlog --no-defaults --stop-position=1000 mysql-bin.000008 | mysql -uroot -proot
# 3.3、恢复位置"1000"-"2000"之间的数据
mysqlbinlog --no-defaults --start-position=1000 --stop-position=2000 mysql-bin.000008 | mysql -uroot -proot
```


#### 3、小白操作教学



```sql
-- 结束正在写入的日志文件，创建一个新的日志文件进行写入
flush logs;
-- 查看最新正在写入的日志文件
show master status;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c34ebf56cf97448a921fae6327e7af26.png)

###### 小白建库建表造数据

```sql
-- 创建数据库-test
create database test;
use test;
-- 创建表t_user
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(20) DEFAULT NULL COMMENT '用户名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='测试表';
-- 插入数据
insert into test.t_user values(1,'test'),(2,'admin');
```

######  小白查看日志文件内容

```shell
# 查看日志文件大小
du -sh mysql-bin*
# 如果日志文件不大，可以通过此方式直接查看
mysqlbinlog --no-defaults -v mysql-bin.000002
# 如果日志文件大，则选择一页一页的方式查看吧
mysqlbinlog --no-defaults -v mysql-bin.000002 | more
```

下面为`mysql-bin.000002`日志文件内容，一个简单的建库，建表，新增数据内容

```
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 4
#210905 16:19:23 server id 3306  end_log_pos 123 CRC32 0x509e9c38       Start: binlog v 4, server v 5.7.26-log created 210905 16:19:23
# Warning: this binlog is either in use or was not closed properly.
BINLOG '
i300YQ/qDAAAdwAAAHsAAAABAAQANS43LjI2LWxvZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAEzgNAAgAEgAEBAQEEgAAXwAEGggAAAAICAgCAAAACgoKKioAEjQA
ATicnlA=
'/*!*/;
# at 123
#210905 16:19:23 server id 3306  end_log_pos 154 CRC32 0x1607f568       Previous-GTIDs
# [empty]
# at 154
#210905 16:20:28 server id 3306  end_log_pos 219 CRC32 0x0f215cf5       Anonymous_GTID  last_committed=0        sequence_number=1       rbr_only=no
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 219
#210905 16:20:28 server id 3306  end_log_pos 313 CRC32 0xbd2f9107       Query   thread_id=3     exec_time=0     error_code=0
SET TIMESTAMP=1630830028/*!*/;
SET @@session.pseudo_thread_id=3/*!*/;
SET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1168113664/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C utf8mb4 *//*!*/;
SET @@session.character_set_client=45,@@session.collation_connection=45,@@session.collation_server=45/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
create database test
/*!*/;
# at 313
#210905 16:20:41 server id 3306  end_log_pos 378 CRC32 0x996a1c5e       Anonymous_GTID  last_committed=1        sequence_number=2       rbr_only=no
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 378
#210905 16:20:41 server id 3306  end_log_pos 688 CRC32 0xee3bc520       Query   thread_id=3     exec_time=0     error_code=0
use `test`/*!*/;
SET TIMESTAMP=1630830041/*!*/;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(20) DEFAULT NULL COMMENT '用户名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='测试表'
/*!*/;
# at 688
#210905 16:21:14 server id 3306  end_log_pos 753 CRC32 0xf09526cc       Anonymous_GTID  last_committed=2        sequence_number=3       rbr_only=yes
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 753
#210905 16:21:14 server id 3306  end_log_pos 825 CRC32 0x83a30735       Query   thread_id=3     exec_time=0     error_code=0
SET TIMESTAMP=1630830074/*!*/;
BEGIN
/*!*/;
# at 825
#210905 16:21:14 server id 3306  end_log_pos 877 CRC32 0x0cc0d937       Table_map: `test`.`t_user` mapped to number 112
# at 877
#210905 16:21:14 server id 3306  end_log_pos 933 CRC32 0x9f85ceed       Write_rows: table id 112 flags: STMT_END_F

BINLOG '
+n00YRPqDAAANAAAAG0DAAAAAHAAAAAAAAEABHRlc3QABnRfdXNlcgACAw8CPAACN9nADA==
+n00YR7qDAAAOAAAAKUDAAAAAHAAAAAAAAEAAgAC//wBAAAABHRlc3T8AgAAAAVhZG1pbu3OhZ8=
'/*!*/;
### INSERT INTO `test`.`t_user`
### SET
###   @1=1
###   @2='test'
### INSERT INTO `test`.`t_user`
### SET
###   @1=2
###   @2='admin'
# at 933
#210905 16:21:14 server id 3306  end_log_pos 964 CRC32 0x3e9c8ccb       Xid = 301
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
```

###### 小白删库

```sql
drop database test;
```

###### 小白恢复数据

```sql
-- 结束正在写入的日志文件，创建一个新的日志文件进行写入 => 目的：方便做数据恢复时，所有操作数据写入新的日志中，不然数据恢复时，之前的相关sql操作语句会再次写入到当前日志文件，当然这里根据自己需不需要此操作！
flush logs;
-- 查看最新正在写入的日志文件
show master status;
```

从binlog可以看出执行删库命令的事件位置在`1996`，时间点在`2021-09-05 16:42:08`

![在这里插入图片描述](https://img-blog.csdnimg.cn/93dca70f2c364b039649b2c84f90b299.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)


```shell
# 方式一： 恢复 ”mysql-bin.000002“日志文件中 事件位置”1996“ 之前的数据
mysqlbinlog --no-defaults --stop-position=1996 mysql-bin.000002 | mysql -uroot -proot
# 方式二： 恢复 ”mysql-bin.000002“日志文件中 时间点”2021-09-05 16:42:08“ 之前的数据
mysqlbinlog --no-defaults --stop-datetime='2021-09-05 16:42:08' mysql-bin.000002 | mysql -uroot -proot
```

之后查看数据已恢复成功`^_^`
![在这里插入图片描述](https://img-blog.csdnimg.cn/0be3e9e465e04c30889150f0b8dd2446.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)


### 三、其它

#### 1、binlog文件生成策略
1. mysql重启；
2. 执行flush logs命令;
3. binlog文件大小达到设定的日志文件最大值（不是绝对，例如：指定1G，因为某些情况，超过1G后，暂时还不会重新生成新的日志文件进行写入）；

![在这里插入图片描述](https://img-blog.csdnimg.cn/6324ff2b70254836a3e2f237a1f46f59.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_19,color_FFFFFF,t_70,g_se,x_16)

#### 2、查看/删除 binlog

```sql
-- 查看binlog格式
show variables like 'binlog_format';
show variables like '%row_im%';

-- 查询 BINLOG 位置
show variables like 'datadir';

-- 查看日志文件
show binary logs;
-- 或 show master logs;

-- 查看正在写入的日志文件
show master status;

-- 查看当前binlog文件内容 (“limit 0,10” => 从第0条数据开始，展示10条数据，切记加limit查看，不然数据量大的时候吓死乖乖！)
show binlog events limit 0,10;
-- 可以格式化输出 
show binlog events limit 0,10 \G;
-- 或指定日志文件查看 
show binlog events in 'mysql-bin.000003' limit 0,10;

-- 注：
-- Log_name:    此条log存在哪个文件中 
-- Pos:         log在bin-log中的开始位置 
-- Event_type:  log的类型信息 
-- Server_id:   可以查看配置中的server_id,表示log是哪个服务器产生 
-- End_log_pos: log在bin-log中的结束位置 
-- Info:        log的一些备注信息，可以直观的看出进行了什么操作 


-- 查看日志 （此方式查看日志，可看见完整sql操作）
mysqlbinlog --no-defaults -v mysql-bin.000008


-- 结束正在写入的日志文件，创建一个新的日志文件进行写入
flush logs;
show master status;

-- 删除所有二进制日志，并重新开始记录（此命令谨慎操作！）
reset master;
show master status;

-- 将'mysql-bin.000003'编号之前的所有日志进行删除
purge master logs to 'mysql-bin.000003';
-- 将在'yyyy-mm-dd hh:mm:ss'时间之前的所有日志进行删除
purge master logs before '2021-09-03 17:30:00'
```


#### 3、binlog导出

```shell
# 进入bin-log日志文件所在目录
cd /var/lib/mysql

# 导出成sql格式 

# 1、全部导出（加`--no-defaults`解决`mysqlbinlog: [ERROR] unknown variable 'default-character-set=utf8mb4'`问题）
# mysqlbinlog mysql-bin.000006 > /tmp/mysql-bin06-1.sql 
mysqlbinlog --no-defaults mysql-bin.000006 > /tmp/mysql-bin06-1.sql

# 2、根据时间点导出
# 2.1、导出"2021-09-03 00:00:00"之前的数据
mysqlbinlog --no-defaults --stop-datetime="2021-09-03 00:00:00" mysql-bin.000006 > /tmp/mysql-bin06-1.log
# 2.2、导出"2021-09-03 00:00:00"之后的数据
mysqlbinlog --no-defaults --start-datetime="2021-09-03 00:00:00" mysql-bin.000006 > /tmp/mysql-bin06-2.log
# 2.3、导出"2021-09-03 00:00:00"-"2021-09-03 23:59:59"之间的数据
mysqlbinlog --no-defaults --start-datetime="2021-09-03 00:00:00" --stop-datetime="2021-09-03 23:59:59" mysql-bin.000006 > /tmp/mysql-bin06-3.log

# 3、根据事件位置导出
# 3.1、导出位置"1000"之后的数据
mysqlbinlog --no-defaults --start-position=1000 mysql-bin.000008 > /tmp/mysql-bin08-1.log
# 3.2、导出位置"1000"之前的数据
mysqlbinlog --no-defaults --stop-position=1000 mysql-bin.000008 > /tmp/mysql-bin08-2.log
# 3.3、导出位置"1000"-"2000"之间的数据
mysqlbinlog --no-defaults --start-position=1000  --stop-position=2000 mysql-bin.000008 > /tmp/mysql-bin08-3.log
```

#### 4、mysql全局只读锁

```sql
-- 查看全局锁状态
show variables like '%read_only%';
-- 设置全局只读 （普通权限的用户只读，不能写数据）
set global read_only=1;
-- 解开全局锁
set global read_only=0;
```
