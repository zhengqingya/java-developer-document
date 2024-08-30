# Logback运行时动态更改日志级别

> jvm指定参数控制日志级别： `-Dlogging.level.root=info -Dlogging.level.org.apache=error`

### SpringBoot

```java
package com.zhengqing.demo.api;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import cn.hutool.core.date.DateUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/log/level")
@Api(tags = "日志级别")
public class LogLevelController {

    @ApiOperation("修改日志级别")
    @GetMapping("update/{logLevel}") // http://127.0.0.1/api/log/level/update/debug
    public void updateLogLevel(@PathVariable String logLevel) {
        // 获取LoggerContext实例
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        // 获取RootLogger并设置日志级别
        loggerContext.getLogger("ROOT").setLevel(Level.DEBUG);
        // 获取指定包下的Logger并设置日志级别
        //   日志级别：
        //      TRACE:最详细的日志
        //      DEBUG:调试级别
        //      INFO: 提示级别
        //      WARN: 警告级别
        //      ERROR：错误级别  --》级别最高,看到的日志最少
        loggerContext.getLogger("com.zhengqing.demo").setLevel(Level.valueOf(logLevel));
    }

    @ApiOperation("测试")
    @GetMapping("test") // http://127.0.0.1/api/log/level/test
    public void test() {
        log.trace("time: {}", DateUtil.now());
        log.debug("time: {}", DateUtil.now());
        log.info("time: {}", DateUtil.now());
        log.warn("time: {}", DateUtil.now());
        log.error("time: {}", DateUtil.now());
    }

}
```

### JunitTest测试类

```java
package com.zhengqing.demo.daily.other;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import cn.hutool.core.date.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.slf4j.LoggerFactory;

@Slf4j
public class LogTest {

    @Test
    public void test() throws Exception {
        this.updateLogLevel();
        log.debug("time: {}", DateUtil.now());
        log.info("time: {}", DateUtil.now());
        log.error("time: {}", DateUtil.now());
    }

    private void updateLogLevel() {
        // 获取LoggerContext实例
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        // 获取RootLogger并设置日志级别
        loggerContext.getLogger("ROOT").setLevel(Level.DEBUG);
        // 获取指定包下的Logger并设置日志级别
        loggerContext.getLogger("com.zhengqing.demo").setLevel(Level.ERROR);
    }

}
```

### 其它

也可以使用下面的方式

```
LoggingSystem system = LoggingSystem.get(LoggingSystem.class.getClassLoader());
system.setLogLevel(packageName, logLevel);
// eg: LoggingSystem.get(LoggingSystem.class.getClassLoader()).setLogLevel("com.zhengqing.demo", LogLevel.WARN);
```
