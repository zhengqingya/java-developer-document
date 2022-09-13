### 一、前言

> 通过`binlog2sql`工具进行数据恢复

#### binlog2sql使用条件

![在这里插入图片描述](https://img-blog.csdnimg.cn/788cbca772c34f68aa138e89eb804170.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 二、binlog2sql

> [https://github.com/danfengcao/binlog2sql](https://github.com/danfengcao/binlog2sql)


#### 1、安装

```shell
git clone https://github.com/danfengcao/binlog2sql.git && cd binlog2sql
pip3 install -r requirements.txt
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/24b2f4209585438eaa01bd16ccfede57.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)


#### 2、使用

```sql
-- 结束正在写入的日志文件，创建一个新的日志文件进行写入
flush logs;
```

##### ① 建库建表造数据

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
insert into test.t_user values(3,'test'),(4,'admin');
-- 更新数据
update test.t_user set username='test03' where id=3;
```

查看最新正在写入的日志文件

```shell
show master status;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a381068885b94113868c9ce2bf70f218.png)



##### ② 解析出标准SQL

```shell
python3 binlog2sql.py -h127.0.0.1 -P3306 -uroot -p'root' -dtest -t t_user --start-file='mysql-bin.000002'
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ea7ed322ba8d47298cd3793d4ce38ae1.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)


##### ③ 解析出回滚SQL

```shell
# python3 binlog2sql.py --flashback -h127.0.0.1 -P3306 -uroot -p'root' -dtest -t t_user --start-file='mysql-bin.000002'
# 解析出回滚SQL并写入`rollback.sql`文件进行查看
python3 binlog2sql.py -h127.0.0.1 -P3306 -uroot -p'root' -dtest -t t_user --start-file='mysql-bin.000002' -B > rollback.sql | cat
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a66fdfb5f20a40a79f02f7a8594dc67e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

##### ④ 执行回滚语句

```shell
mysql -h127.0.0.1 -P3306 -uroot -p'root' < rollback.sql
```

到这里，数据恢复就完成了... 闪回 `^_^`

#### 3、命令选项

![在这里插入图片描述](https://img-blog.csdnimg.cn/2139e001408141e6b5ca83aae2ca868f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

|                  选项                  |                                                                               描述                                                                               |
| :------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| -h host; -P port; -u user; -p password |                                                                          mysql连接配置                                                                           |
|               `解析模式`               |                                                                                                                                                                  |
|              --stop-never              |                                               持续解析binlog。可选。默认False，同步至执行命令时最新的binlog位置。                                                |
|          -K, --no-primary-key          |                                                              对INSERT语句去除主键。可选。默认False                                                               |
|            -B, --flashback             |                               生成回滚SQL，可解析大文件，不受内存限制。可选。默认False。与stop-never或no-primary-key不能同时添加。                               |
|            --back-interval             |                                    -B模式下，每打印一千行回滚SQL，加一句SLEEP多少秒，如不想加SLEEP，请设为0。可选。默认1.0。                                     |
|             `解析范围控制`             |                                                                                                                                                                  |
|              --start-file              |                                                          起始解析文件，只需文件名，无需全路径 。必须。                                                           |
|      --start-position/--start-pos      |                                                         起始解析位置。可选。默认为start-file的起始位置。                                                         |
|         --stop-file/--end-file         |                                       终止解析文件。可选。默认为start-file同一个文件。若解析模式为stop-never，此选项失效。                                       |
|       --stop-position/--end-pos        |                                       终止解析位置。可选。默认为stop-file的最末位置；若解析模式为stop-never，此选项失效。                                        |
|            --start-datetime            |                                                    起始解析时间，格式'%Y-%m-%d %H:%M:%S'。可选。默认不过滤。                                                     |
|            --stop-datetime             |                                                    终止解析时间，格式'%Y-%m-%d %H:%M:%S'。可选。默认不过滤。                                                     |
|               `对象过滤`               |                                                                                                                                                                  |
|            -d, --databases             |                                               只解析目标db的sql，多个库用空格隔开，如-d db1 db2。可选。默认为空。                                                |
|              -t, --tables              |                                             只解析目标table的sql，多张表用空格隔开，如-t tbl1 tbl2。可选。默认为空。                                             |
|               --only-dml               |                                                              只解析dml，忽略ddl。可选。默认False。                                                               |
|               --sql-type               | 只解析指定类型，支持INSERT, UPDATE, DELETE。多个类型用空格隔开，如--sql-type INSERT DELETE。可选。默认为增删改都解析。用了此参数但没填任何类型，则三者都不解析。 |
