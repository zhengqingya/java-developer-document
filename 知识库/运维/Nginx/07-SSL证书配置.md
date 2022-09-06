# Nginx - SSL证书配置

`/usr/local/nginx/conf/nginx.conf`

```
# HTTP server  -- http://www.zhengqingya.com
server {
    # http使用80端口
    listen       80;
    server_name localhost;
    
    # 把http的域名请求转成https    ex: 访问 http://www.zhengqingya.com 时自动跳转为 https://www.zhengqingya.com
	# return 301 https://$host$request_uri; 

    location / {
        root   html;
        index  index.html index.htm;
    }
}


# HTTPS server  -- https://www.zhengqingya.com
server {
    # SSL使用443端口
    listen       443 ssl;
    # SSL证书绑定的域名
    server_name www.zhengqingya.com;

    # 证书pem文件
    ssl_certificate      /home/ssl/fullchain.cer;
    # 证书key文件
    ssl_certificate_key  /home/ssl/cert.key;
    
    # 启用 SSL Session 缓存
    ssl_session_cache    shared:SSL:1m;
    # 缓存SSL握手产生的参数和加密密钥的时长
    ssl_session_timeout 5m;
    # 使用的加密套件的类型
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; 
    # 表示使用的TLS协议的类型
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    # 加密套件优先选择服务器的加密套件
    ssl_prefer_server_ciphers on; 

    location / {
        root   html;
        index  index.html index.htm;
    }
}
```

```shell
# 重载配置
/usr/local/nginx/sbin/nginx -s reload
```