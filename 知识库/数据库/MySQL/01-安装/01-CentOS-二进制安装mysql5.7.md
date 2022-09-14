# 二进制安装mysql5.7

rpm方式安装不利于维护

> 基于 CentOS Linux release 7.6.1810 (Core)
> https://dev.mysql.com/doc/refman/5.7/en/binary-installation.html
> https://blog.csdn.net/qq_42349306/article/details/117524801

```shell
# 查看系统位数
getconf LONG_BIT
# 查看CentOS系统版本
cat /etc/redhat-release
# 查看内核版本
uname -a
```

---

## 条件准备

### 检查是否存在自带mariadb

CentOS7 开始不自带 MySQL，替换成了 mariadb，但是我们安装 MySQL 的时候会冲突，所以需要先卸载 mariadb。

```shell
# 查找是否存在自带mariadb
rpm -qa | grep mariadb

# 如果存在则卸载, 比如我查找出来的名称为mariadb-libs-5.5.60-1.el7_5.x86_64
rpm -e mariadb-libs-5.5.60-1.el7_5.x86_64 --nodeps
```

### 检查是否安装过MySQL

```shell
# 检查是否安装过mysql
rpm -qa | grep mysql

# 如果存在则卸载, 比如名称为mysql-libs-5.1.52.x86_64
rpm -e mysql-libs-5.1.52.x86_64 --nodeps
```

### 检查是否开启MySQL使用端口

```shell
# 查看想开的端口是否已开,若此提示FirewallD is not running, 表示为不可知的防火墙 需要查看状态并开启防火墙, 如果是云服务器还需要去控制台配置安全组访问
firewall-cmd --query-port=3306/tcp

# 开启端口, success代表成功
firewall-cmd --add-port=3306/tcp --permanent
# 刷新配置, 使配置生效
firewall-cmd --reload
```

---

## 安装MySQL

### 创建用户和用户组

```shell
groupadd mysql
useradd -r -g mysql -s /bin/false mysql
```

### 将二进制包进行解压设置软链接

```shell
cd /usr/local/
# 下载二进制文件 -- 会有点慢，可提前从其它地方下载资源
wget https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz
# 解压
tar -zxvf mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz
# 设置软链接
ln -s mysql-5.7.26-linux-glibc2.12-x86_64 mysql
```

### 编辑my.cnf

```shell
vim /etc/my.cnf
```

内容见 [my.cnf](my.cnf)

### 初始化数据目录

```shell
# 授权
cd /usr/local/mysql
mkdir mysql-files
chown mysql:mysql mysql-files
chmod 750 mysql-files

# 初始化数据目录，包含了 MySQL 数据库初始表。
bin/mysqld --defaults-file=/etc/my.cnf --initialize --user=mysql
```

执行后会生成一个随机密码

```shell
# 查看随机密码
cat /usr/local/mysql/data/mysql-error.log

# 日志如下，密码为最后的`fIavwiDUW3.i`
2022-03-24T09:41:56.979154Z 0 [Warning] 'NO_ZERO_DATE', 'NO_ZERO_IN_DATE' and 'ERROR_FOR_DIVISION_BY_ZERO' sql modes should be used with strict mode. They will be merged with strict mode in a future release.
2022-03-24T09:41:57.284431Z 0 [Warning] InnoDB: New log files created, LSN=45790
2022-03-24T09:41:57.448202Z 0 [Warning] InnoDB: Creating foreign key constraint system tables.
2022-03-24T09:41:57.521923Z 0 [Warning] No existing UUID has been found, so we assume that this is the first time that this server has been started. Generating a new UUID: a59583ec-ab56-11ec-82ee-525400926db6.
2022-03-24T09:41:57.525804Z 0 [Warning] Gtid table is not ready to be used. Table 'mysql.gtid_executed' cannot be opened.
2022-03-24T09:41:57.526230Z 1 [Note] A temporary password is generated for root@localhost: fIavwiDUW3.i
```

### 设置环境变量

```shell
# 编辑文件
vim /etc/profile

# 末尾添加内容
export PATH=$PATH:/usr/local/mysql/bin

# 刷新配置
source /etc/profile
```

### 启动MySQL

```shell
/usr/local/mysql/support-files/mysql.server start
```

看到 Starting MySQL. SUCCESS! 即可登录测试了。

### 测试

```shell
# 使用随机密码登录，含特殊字符最好加''包裹
mysql -uroot -p'fIavwiDUW3.i'

# 修改密码
set password=password('root');

# 退出重新登录
exit

# 查看版本
mysql -uroot -proot -e "select version();"

# 登录
mysql -uroot -proot


# 创建用户，授权远程登录，刷新权限。
GRANT ALL PRIVILEGES ON *.* TO 'zhengqingya'@'%' IDENTIFIED BY '123456';
FLUSH PRIVILEGES;


# root远程连接
use mysql;
select host from user where user='root';
update user set host = '%' where user ='root';
# 刷新配置
flush privileges;
```

### 开机自启

> 也在 /etc/rc.d/init.d 写个 autoStart.sh 脚本用来管理需要自启的程序

```shell
# 复制启动脚本到资源目录下加入系统服务
cp /usr/local/mysql/support-files/mysql.server /etc/rc.d/init.d/mysql

# 增加mysql服务控制脚本执行权限
chmod +x /etc/rc.d/init.d/mysql

# 将mysql服务加入到系统服务
chkconfig --add mysql

# 检查mysql服务是否已经生效
chkconfig --list mysql

# 将mysql从系统服务中删除
chkconfig --del mysql
```

### 其它

```shell
# 查看mysql运行状态
service mysql status

# 停止mysql
service mysql stop

# 启动mysql
service mysql start

# 重启mysql
service mysql restart

# 查看进程
ps -ef|grep mysql
```
