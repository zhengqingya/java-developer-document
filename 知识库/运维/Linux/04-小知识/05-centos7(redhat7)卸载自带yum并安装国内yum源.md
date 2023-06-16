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

# **************************************** ↓↓↓↓↓↓ ******************************************************
# 如果这时候报错： （ 提示缺少相关依赖 ）
# 警告：yum-3.4.3-168.el7.centos.noarch.rpm: 头V3 RSA/SHA256 Signature, 密钥 ID f4a80eb5: NOKEY
# 错误：依赖检测失败：
#         pygpgme 被 yum-3.4.3-168.el7.centos.noarch 需要
#         pyliblzma 被 yum-3.4.3-168.el7.centos.noarch 需要
#         python-urlgrabber >= 3.10-8 被 yum-3.4.3-168.el7.centos.noarch 需要
#         pyxattr 被 yum-3.4.3-168.el7.centos.noarch 需要

# 解决： 每个人环境不同，进入镜像站搜索对应的依赖进行安装即可 https://mirrors.aliyun.com/centos/7.9.2009/os/x86_64/Packages/
wget https://mirrors.aliyun.com/centos/7.9.2009/os/x86_64/Packages/pygpgme-0.3-9.el7.x86_64.rpm
wget https://mirrors.aliyun.com/centos/7.9.2009/os/x86_64/Packages/pyliblzma-0.5.3-11.el7.x86_64.rpm
wget https://mirrors.aliyun.com/centos/7.9.2009/os/x86_64/Packages/pyxattr-0.5.1-5.el7.x86_64.rpm
rpm -ivh py*
wget https://mirrors.aliyun.com/centos/7.9.2009/os/x86_64/Packages/python-urlgrabber-3.10-10.el7.noarch.rpm
rpm -ivh python-urlgrabber*

rpm -ivh yum-* --force --nodeps
# **************************************** ↑↑↑↑↑↑ ******************************************************



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

---

执行yum报错如下：

```shell
[root@localhost]# yum
There was a problem importing one of the Python modules
required to run yum. The error leading to this problem was:

   librpm.so.3: cannot open shared object file: No such file or directory

Please install a package which provides this module, or
verify that the module is installed correctly.

It's possible that the above module doesn't match the
current version of Python, which is:
2.7.5 (default, Oct 14 2020, 14:45:30) 
[GCC 4.8.5 20150623 (Red Hat 4.8.5-44)]

If you cannot solve this problem yourself, please go to 
the yum faq at:
  http://yum.baseurl.org/wiki/Faq
```

尝试了换python版本，和建立 so 相关文件链接，eg: `ln -s /usr/lib64/librpm.so.8.2.0 /usr/lib64/librpm.so.3`
然后会发现丢失一个又一个 eg: `librpmio.so.3` `liblua-5.1.so` ...
然后放弃了...

腾讯云服务器 `TencentOS Server release 3.1 (Final)`上自带yum4.7.0，建议不要去按上面的方式重装yum，
版本不同，环境差异大，导致的问题复杂度不同，最终选择了从备份的镜像还原系统了，还好有备份 ^_^
