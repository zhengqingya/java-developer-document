# centos7(redhat7)卸载自带yum并安装国内yum源

```shell
# 检查是否安装yum包
rpm -qa |grep yum

# 删除redhat自带的yum包
rpm -qa|grep yum|xargs rpm -e --nodeps

# 下载所需yum安装包
wget http://mirrors.163.com/centos/7.9.2009/os/x86_64/Packages/yum-3.4.3-168.el7.centos.noarch.rpm
wget http://mirrors.163.com/centos/7.9.2009/os/x86_64/Packages/yum-metadata-parser-1.1.4-10.el7.x86_64.rpm
wget http://mirrors.163.com/centos/7.9.2009/os/x86_64/Packages/yum-plugin-fastestmirror-1.1.31-54.el7_8.noarch.rpm
# 安装yum (一次安装3个)
rpm -ivh yum-*

# 检查yum是否安装成功
rpm -qa |grep yum

# 在/etc目录下重命名备份原来的repo
mv /etc/yum.repos.d /etc/yum.repos.d.backup
# 建一个新的yum.repos.d目录
mkdir -p /etc/yum.repos.d
# 下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

# 清理yum缓存，使设置生效
yum clean all
# 将服务器上的软件包信息缓存到本地,以提高搜索安装软件的速度
yum makecache
```
