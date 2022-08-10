@[TOC](文章目录)

### 一、前言

`Percona XtraBackup`是支持MySQL`热备份`&`非阻塞备份`的开源工具。

文档： [https://www.percona.com/doc/percona-xtrabackup/2.4/index.html](https://www.percona.com/doc/percona-xtrabackup/2.4/index.html)

1. [MySQL(23) 数据恢复之binlog](https://zhengqing.blog.csdn.net/article/details/120114506)
2. [MySQL(24) 数据恢复之binlog2sql](https://zhengqing.blog.csdn.net/article/details/120118835)

> tips: 本文使用`Percona XtraBackup 2.4`版本，它可以备份MySQL 5.1、5.5、5.6 和 `5.7` 服务器上的InnoDB、XtraDB 和MyISAM表中的 数据，以及带有 XtraDB的Percona Server for MySQL 。
> MySQL8.0可使用Percona XtraBackup 8.0版本


本文环境

1. CentOS Linux release 7.6.1810 (Core)
2. MySQL 5.7.26

### 二、安装XtraBackup

> 可参考 [https://www.percona.com/doc/percona-xtrabackup/2.4/installation/yum_repo.html](https://www.percona.com/doc/percona-xtrabackup/2.4/installation/yum_repo.html)

```shell
# 从Percona存储库安装Percona XtraBackup
yum install https://repo.percona.com/yum/percona-release-latest.noarch.rpm
# RHEL / Centos 5 不支持直接从远程位置安装软件包，因此您需要先下载软件包并使用rpm手动安装
wget https://repo.percona.com/yum/percona-release-latest.noarch.rpm
rpm -ivh percona-release-latest.noarch.rpm
# 测试存储库
yum list | grep percona
# 安装xtrabackup
yum install percona-xtrabackup-24
# 查看帮助
innobackupex --help
```

### 三、数据备份与恢复

#### 1、完整备份与恢复

##### 备份

```shell
innobackupex --defaults-file=数据库配置文件 --host=数据库主机 --port=数据库端口 --user=数据库用户 -password='数据库密码' --database='数据库1 数据库2' --parallel=线程数 --no-timestamp 备份目录
# --no-timestamp 表示不要创建一个时间戳目录来存储备份，指定具体备份文件夹
innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --no-timestamp /home/mysql_backup/full_20220325/
```

##### 恢复

```shell
# 停止mysql
service mysql stop
# 移除并备份数据文件
mv /usr/local/mysql/data/ /usr/local/mysql/data_bak/
# 创建新的数据目录
mkdir -p /usr/local/mysql/data/


# 恢复数据   --copy-back: 将备份数据复制到mysql的数据目录下
innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --copy-back /home/mysql_backup/full_20220325/


# 授权数据库文件
chown -R mysql:mysql /usr/local/mysql/data/
# 启动MySQL
service mysql start
# 自行查看数据是否恢复
mysql -uroot -proot -e "show databases;"
```

#### 2、增量备份与恢复

备份之前先改改数据，方便一会儿恢复时检验

##### 备份

```shell
# 基于之前的完整备份的目录 /home/mysql_backup/full_20220325/ 操作

# 增量备份1
# --incremental 指定增量备份1的目录
# --incremental-basedir=指定完整备份的目录
innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --no-timestamp --incremental /home/mysql_backup/incre_20220325_1 --incremental-basedir=/home/mysql_backup/full_20220325/
# 查看`backup_type`为`incremental`
cat /home/mysql_backup/incre_20220325_1/xtrabackup_checkpoints | grep 'backup_type'


# 增量备份2
# --incremental 指定增量备份2的目录
# --incremental-basedir=指定完整备份的目录
innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --no-timestamp --incremental /home/mysql_backup/incre_20220325_2 --incremental-basedir=/home/mysql_backup/full_20220325/
# 查看`backup_type`为`incremental`
cat /home/mysql_backup/incre_20220325_2/xtrabackup_checkpoints | grep 'backup_type'
```

##### 恢复

```shell
# 增量备份与完整备份不同点：须在每个备份上重放已提交的事务
innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --apply-log --redo-only /home/mysql_backup/full_20220325/
# 事务提交后，查看`backup_type`为`log-applied`
cat /home/mysql_backup/full_20220325/xtrabackup_checkpoints | grep 'backup_type'

# 完整备份数据+增量备份2数据(最后一次增量备份) 合并，数据最终合并到完整备份目录内
# --incremental-dir= 指定增量备份2的目录
innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --apply-log --redo-only /home/mysql_backup/full_20220325/ --incremental-dir=/home/mysql_backup/incre_20220325_2/

# 准备完整备份(完整+增量合并后的数据)以回滚待处理的事务
innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --apply-log /home/mysql_backup/full_20220325/
# 查看`backup_type`为`full-prepared`
cat /home/mysql_backup/full_20220325/xtrabackup_checkpoints | grep 'backup_type'


# 停止mysql
service mysql stop
# 移除并备份数据文件
mv /usr/local/mysql/data/ /usr/local/mysql/data_bak/
# 创建新的数据目录
mkdir -p /usr/local/mysql/data/


# 恢复数据   --copy-back: 将备份数据复制到mysql的数据目录下
innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --copy-back /home/mysql_backup/full_20220325/


# 授权数据库文件
chown -R mysql:mysql /usr/local/mysql/data/
# 启动MySQL
service mysql start
# 自行查看数据是否恢复
mysql -uroot -proot -e "show databases;"
```


![在这里插入图片描述](https://img-blog.csdnimg.cn/f2b473daee2e438bbc7867867ffa2949.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_19,color_FFFFFF,t_70,g_se,x_16)


--- 

> 今日分享语句：
> 人生的奋斗目标不要太大，认准了一件事情，投入兴趣与热情坚持去做，你就会成功。

