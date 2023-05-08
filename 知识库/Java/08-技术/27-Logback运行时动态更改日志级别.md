# Logback运行时动态更改日志级别

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