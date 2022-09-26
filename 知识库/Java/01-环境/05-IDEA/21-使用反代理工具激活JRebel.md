# idea - 使用反代理工具激活JRebel

### 运行反代理工具

```
docker run -d --name jrebel -p 8888:8888 registry.cn-hangzhou.aliyuncs.com/zhengqing/jrebel
```

默认反代`idea.lanyus.com`, 运行起来后

1. 激活地址： `ip地址:8888/UUID` -> 注：UUID可以自己生成，并且必须是UUID才能通过验证 -> [UUID在线生成](http://www.uuid.online/)
2. 邮箱随意填写