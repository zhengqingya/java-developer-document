# linux -- 安装redis7.0.5

```shell
# 安装6版本的redis，gcc版本一定要5.3以上!
gcc -v
# 安装高版本的gcc
yum -y install centos-release-scl && yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils && scl enable devtoolset-9 bash

# 下载
wget https://download.redis.io/releases/redis-7.0.5.tar.gz
tar -zxvf redis-7.0.5.tar.gz

# 安装
cd redis-7.0.5
make
cd src
make install PREFIX=/usr/local/redis

# 移动配置文件到安装目录
cd ../
mkdir /usr/local/redis/etc
mv redis.conf /usr/local/redis/etc

# 修改配置，支持台启动和远程连接
vim /usr/local/redis/etc/redis.conf
# daemonize yes
# protected-mode no
# bind 0.0.0.0

# 拷贝启动脚本至 /usr/local/bin目录
cp /usr/local/redis/bin/redis-server /usr/local/bin
cp /usr/local/redis/bin/redis-cli /usr/local/bin

# 启动
redis-server /usr/local/redis/etc/redis.conf

# 启动客户端
redis-cli

# 设置密码
config set requirepass 123456

# 测试
127.0.0.1:6379> set test hello-redis
# OK
127.0.0.1:6379> get test
# "hello-redis"


# 开放6379端口
firewall-cmd --zone=public --add-port=6379/tcp --permanent
# 重启firewall
firewall-cmd --reload
```
