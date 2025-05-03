# 域名绑定Cloudflare实现无限邮箱

> tips：我的域名是在阿里云购买的，下面是阿里云操作为例。

注册登录Cloudflare
https://dash.cloudflare.com

添加域名
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746266797597.png)

选择第一个Free计划
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746266967867.png)

点击前往激活
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267059189.png)

![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267097744.png)

阿里云DNS修改
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267471109.png)
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267552270.png)
回到Cloudflare，点继续。

再刷新Cloudflare，显示活动状态，说明配置成功。tips: 可能会需要等待一段时间，我这边实操1分钟左右。
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267685701.png)

电子邮件 -> 电子邮件路由 -> 开始使用
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267821924.png)

跳过入门指南
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267874491.png)

启用电子邮件路由
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267903255.png)
添加记录并启用
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746267936462.png)

添加目标地址
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746268193187.png)
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746268209747.png)

接收邮箱通知 校验即可
![436ff49f7bd03a33859e2c15b114c16.jpg](./images/18-域名绑定Cloudflare实现无限邮箱_1746268286247.jpg)
校验之后目标地址状态为变为已验证。
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746268330257.png)

路由规则 -> 编辑
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746268450716.png)
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746268484435.png)
保存之后将状态改成启用。
![](./images/18-域名绑定Cloudflare实现无限邮箱_1746268513621.png)

接下来就可以发邮箱测试下了，eg：zq666@zhengqingya.com
![34544474f15e0518529ee616aa9c04c.jpg](./images/18-域名绑定Cloudflare实现无限邮箱_1746269152604.jpg)

