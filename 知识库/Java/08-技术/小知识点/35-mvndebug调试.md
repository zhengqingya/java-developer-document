# maven debug 调试

```shell
mvndebug clean compile
# Listening for transport dt_socket at address: 8000
```

![](./images/35-mvndebug调试-1727075463399.png)


eg: mapstruct插件调试，在 `org.mapstruct.ap.spi.DefaultAccessorNamingStrategy#getMethodType` 中打个断点，再debug方式启动remote debug
