# etherpad


## 下载

https://etherpad.org/#download

## 运行

> ex: Windows

运行 `etherpad-lite-win\start.bat`

访问 http://127.0.0.1:9001

自定义皮肤 http://127.0.0.1:9001/p/test#skinvariantsbuilder

## 配置文件 `etherpad-lite-win\settings.json`

###### 账号密码

```
"users": {
    "admin": {
      // 1) "password" can be replaced with "hash" if you install ep_hash_auth
      // 2) please note that if password is null, the user will not be created
      "password": "admin",
      "is_admin": true
    },
    "user": {
      // 1) "password" can be replaced with "hash" if you install ep_hash_auth
      // 2) please note that if password is null, the user will not be created
      "password": "123456",
      "is_admin": false
    }
  }
```

###### ip端口

```
  "ip": "0.0.0.0",
  "port": 9001,
```

###### 数据库类型

```
 "dbType" : "mysql",
  "dbSettings" : {
    "user":     "root",
    "host":     "localhost",
    "port":     3306,
    "password": "root",
    "database": "etherpad_lite_db",
    "charset":  "utf8mb4"
  },
```

## Etherpad plugins

https://static.etherpad.org/index.html

本地安装插件地址： http://127.0.0.1:9001/admin/plugins

安装的插件依赖放在 `etherpad-lite-win\node_modules`

部分插件
1. ep_comments_page_short_edition: 文本注释
2. ep_tables4: 表格
3. ep_headings2: 标题支持
4. ep_image_upload: 图片上传


```
# 获得全部功能
cd etherpad-lite-win
cnpm install --no-save --legacy-peer-deps ep_headings2 ep_markdown ep_comments_page ep_align ep_font_color ep_webrtc ep_embedded_hyperlinks2
```


## Easysync算法

> `石墨文档`的文档协作也是基于`easysync`来实现的协同编辑


https://github.com/ether/etherpad-lite/tree/develop/doc/easysync

## 关于二开

> 个人试过修改依赖 `etherpad-lite-win\node_modules`，后重启，会生效 ~
