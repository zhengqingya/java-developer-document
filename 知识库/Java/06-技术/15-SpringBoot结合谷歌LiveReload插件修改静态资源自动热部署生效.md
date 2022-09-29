# SpringBoot 结合 谷歌LiveReload插件 修改静态资源自动热部署生效

### 安装谷歌LiveReload插件

https://chrome.google.com/webstore/search/LiveReload?hl=zh-CN

### SpringBoot项目 加入 devtools依赖

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

此时随便在 resources/static 目录下添加一个静态 html 页面，然后启动 SpringBoot 项目，在打开了 LiveReload 的选项卡中访问 html 页面。
访问成功后，我们再去手动修改 html 页面代码，修改成功后，回到浏览器，不用做任何操作，就会发现浏览器自动刷新了，页面已经更新了。

### 如果开发者安装并且启动了 LiveReload 插件，同时也添加了 devtools 依赖，但是却并不想当静态页面发生变化时浏览器自动刷新，那么可以在 application.properties 中添加如下代码进行配置：

```yaml
spring.devtools.livereload.enabled=false
```
