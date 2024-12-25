# Jackson - 前后端时间处理

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
