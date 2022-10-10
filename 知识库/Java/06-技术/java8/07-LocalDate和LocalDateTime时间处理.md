# LocalDate和LocalDateTime时间处理

```java
package com.zhengqing.demo.daily.base.java8;

import org.junit.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;

public class Java8_time {
    @Test
    public void test() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("当前时间：" + now);
        System.out.println("格式化：" + now.format(DateTimeFormatter.ofPattern("YYYY-MM-dd hh:mm:ss")));
        LocalDateTime firstDay = now.withDayOfMonth(1);
        System.out.println("本月第一天：" + firstDay);
        LocalDateTime lastSecondOfDay = now.withHour(23).withMinute(59).withSecond(59);
        System.out.println("当天最后一秒：" + lastSecondOfDay);
        LocalDateTime lastDay = now.with(TemporalAdjusters.lastDayOfMonth());
        System.out.println("本月最后一天:" + lastDay);

        // 获取秒数时间戳（10位）
        LocalDateTime.now().toInstant(ZoneOffset.of("+8"));
        // 获取毫秒数时间戳（13位）
        LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli();

        // 求时间差
        LocalDateTime now = LocalDateTime.now();
        System.out.println("计算两个时间的差：");
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(now, end);
        long days = duration.toDays(); //相差的天数
        long hours = duration.toHours();//相差的小时数
        long minutes = duration.toMinutes();//相差的分钟数
        long millis = duration.toMillis();//相差毫秒数
        long nanos = duration.toNanos();//相差的纳秒数
        System.out.println(now);
        System.out.println(end);
        System.out.println("耗时【 " + days + "天：" + hours + " 小时：" + minutes + " 分钟：" + millis + " 毫秒：" + nanos + " 纳秒】");
    }
}
```