# Jackson

### 前后端时间处理

#### 全局

```yml
spring:
  # jackson全局处理-JSON入参及返回值Date时间
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
```

#### 单独

1. @JsonFormat 默认是标准时区的时间，多出现少8小时的情况
   使用时，按需求加上时区 北京时间 东八区 timezone=”GMT+8”
   作用：后台的时间 格式化 发送到前台
2. @DateTimeFormat 接受前台的时间格式 传到后台的格式

```
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Demo {   
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss"<!--,iso= DateTimeFormat.ISO.DATE_TIME-->)
    private Date time;
}
```

### 字段别名

#### post请求

1. `@JsonProperty`：序列化和反序列化过程中修改java属性名
2. `@JsonAlias`：反序列化时让java属性可以接收多个别名

```
// 字段别名
@JsonAlias("name_xx")
// @JsonAlias({"name_xx", "name_2"})
// @JsonProperty("name_xx")
private String name;
```

![](images/jackson-01.png)

![](images/jackson-02.png)

#### get请求

> tips: 需要自定义注解`@RequestParamAlias`
> 参考 https://gitee.com/zhengqingya/small-tools

![](images/get请求-字段别名.png)

### 枚举响应指定字段值

> 默认情况下返回枚举名称，即 BLACK/WHITE

```java
package com.zhengqing.demo.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

@Getter
@AllArgsConstructor
//@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum TestTypeEnum {
    BLACK(1, "黑名单"),

    WHITE(2, "白名单");

    private final Integer type;

    @JsonValue
    private final String desc;
}
```

`@JsonFormat(shape = JsonFormat.Shape.OBJECT)` 效果如下：
![](./images/18-Jackson-1730889824069.png)


`@JsonValue` 效果如下:
![](./images/18-Jackson-1730889749014.png)
