### Linux上安装Python环境

下载解释器地址 https://www.python.org/downloads

![python-linux-downloads.png](images/python-linux-downloads.png)

```shell
cd /zhengqingya/soft/python

# 安装所需依赖 
yum install wget zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make zlib zlib-devel libffi-devel -y

# 下载解释器 -- 如果慢的话，可通过直接下载上图中给出的源码包，然后上传到服务器上
wget https://www.python.org/ftp/python/3.10.6/Python-3.10.6.tgz

# 解压
tar -xvf Python-3.10.6.tgz

```