### Centos7.6安装Nginx

```shell
# 安装依赖
# yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel

# 下载
wget -c wget http://nginx.org/download/nginx-1.22.0.tar.gz

# 解压
tar -zxvf nginx-1.22.0.tar.gz
cd nginx-1.22.0

# 配置 -- 需要SSL
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module

# 编译安装
make
make install

# 启动
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
 
# 重载配置
/usr/local/nginx/sbin/nginx -s reload
```