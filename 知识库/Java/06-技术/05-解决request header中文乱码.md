# 解决request header中文乱码

### 1、header赋值

```
httpHeaders.add("key", URLEncoder.encode("中文字段", "UTF-8"));
```

### 2、header取值

```java
URLDecoder.decode(request.getHeader("key"),"UTF-8")
```
