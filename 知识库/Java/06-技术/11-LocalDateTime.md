```java
public class Test{
    @Test
    public void test() throws Exception{
        // 获取秒数时间戳（10位）
        LocalDateTime.now().toInstant(ZoneOffset.of("+8"));
        // 获取毫秒数时间戳（13位）
        LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli();
        
        // 求时间差
        LocalDateTime now = LocalDateTime.now();
        System.out.println("计算两个时间的差：");
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(now,end);
        long days = duration.toDays(); //相差的天数
        long hours = duration.toHours();//相差的小时数
        long minutes = duration.toMinutes();//相差的分钟数
        long millis = duration.toMillis();//相差毫秒数
        long nanos = duration.toNanos();//相差的纳秒数
        System.out.println(now);
        System.out.println(end);
        System.out.println("发送短信耗时【 "+days+"天："+hours+" 小时："+minutes+" 分钟："+millis+" 毫秒："+nanos+" 纳秒】");
    }
}
```
