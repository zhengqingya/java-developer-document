# Stream 流式操作

Java8对集合操作功能的增强，专注于对集合的各种高效、便利、优雅的聚合操作。

#### 获取list某个字段 组装 新list

```
List<Integer> userIdList = userList.stream().map(e -> e.getUserId()).collect(Collectors.toList());
```

#### 根据指定字段分组 `Collectors.groupingBy()`

```
Map<String, List<User>> mapByName = list.stream().collect(Collectors.groupingBy(User::getName));
```

#### 去重 `distinct()`

```
List<Integer> numList = Lists.newArrayList(1, 5, 3, 3, 6);
numList = numList.stream().distinct().collect(Collectors.toList());

// 根据指定字段去重
list = list.stream().collect(Collectors.collectingAndThen(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(User::getId))), ArrayList::new));
```

#### 条件过滤 `filter()`

```
// 只要含有“小孙”的数据
list = list.stream().filter(e -> e.getName().equals("小孙")).collect(Collectors.toList());
```

#### 求和

```
// 基本类型
int sumAge = userList.stream().mapToInt(User::getAge).sum();
// 其他  -- 若bigDecimal对象为null，可filter()过滤掉空指针
BigDecimal totalMemberNum = userList.stream().map(User::getMemberNum).reduce(BigDecimal.ZERO, BigDecimal::add);
```

#### 最大值/最小值

```
Date minDate = userList.stream().map(User::getCreateTime).min(Date::compareTo).get();
Date maxDate = userList.stream().map(User::getCreateTime).max(Date::compareTo).get();
User maxUp = userList.stream().max(Comparator.comparingInt(User::getAge)).get();
```

#### 差值（新增/删除）

```
List<Integer> userIdListNew = Lists.newArrayList(1, 2, 3, 5, 6);
List<Integer> userIdListOld = Lists.newArrayList(1, 2, 3, 4);

// 删除人员 [4]
List<Integer> removeUserIdList = userIdListOld.stream().filter(userIdOld -> !userIdListNew.contains(userIdOld)).collect(Collectors.toList());

// 新增人员 [5, 6]
List<Integer> addUserIdList = userIdListNew.stream().filter(userIdNew -> !userIdListOld.contains(userIdNew)).collect(Collectors.toList());
```

#### 分类统计数量

```
// 多字段统计 -- ex: 统计相同name下相同age的个数
Map<String, Map<Integer, Long>> map = list.stream().collect(
                Collectors.groupingBy(User::getName, Collectors.groupingBy(User::getAge, Collectors.counting()))
        );

// 单字段统计 [LongSummaryStatistics中包含总数、最小值、最大值、平均值等信息]   --  ex: 根据名称去统计
Map<String, LongSummaryStatistics> map = list.stream()
        .collect(
                Collectors.groupingBy(User::getName, Collectors.summarizingLong(User::getAge))
        );
```

#### 求list重复元素值

```
@Test
public void test02() throws Exception {
    List<Integer> list = Lists.newArrayList(1, 2, 3, 4, 5, 6, 1, 6, 6);
    List<Integer> repeatDataList = list.stream()
        .collect(Collectors.toMap(e -> e, e -> 1, Integer::sum))
        .entrySet().stream()
        .filter(entry -> entry.getValue() > 1)
        .map(Map.Entry::getKey)
        .collect(Collectors.toList());
    System.out.println(repeatDataList); // [1, 6]
    
    
    // 求list对象中某一个字段的重复值
    List<String> repeatValueDataList = dictList
                    .stream().map(e -> e.getValue()).collect(Collectors.toList())
                    .stream().collect(Collectors.toMap(e -> e, e -> 1, Integer::sum))
                    .entrySet().stream()
                    .filter(entry -> entry.getValue() > 1)
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());
}

public <T> List<T> getRepeatDataList(List<T> list) {
    return list.stream()
            // 获得元素出现频率的 Map，键为元素，值为元素出现的次数
            .collect(Collectors.toMap(e -> e, e -> 1, Integer::sum))
            // Set<Entry>转换为Stream<Entry>
            .entrySet().stream()
            // 过滤出元素出现次数大于 1 的 entry
            .filter(entry -> entry.getValue() > 1)
            // 获得 entry 的键（重复元素）对应的 Stream
            .map(Entry::getKey)
            // 转化为 List
            .collect(Collectors.toList());
}
```

---

### demo

```java
package com.zhengqing.demo.daily.base.java8;

import cn.hutool.json.JSONUtil;
import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.junit.Test;

import java.util.*;
import java.util.stream.Collectors;

public class Java8_stream {
    @Test
    public void test() throws Exception {
        List<Integer> numList = Lists.newArrayList(1, 5, 3, 3, 6);
        List<User> list = Lists.newArrayList(
                User.builder().id(1).age(16).name("小张").build(),
                User.builder().id(10).age(20).name("小孙").build(),
                User.builder().id(1).age(18).name("李四").build(),
                User.builder().id(3).age(6).name("王五").build()
        );

        Map<String, List<User>> mapByName = list.stream().collect(Collectors.groupingBy(User::getName));
        System.out.println("分组：" + JSONUtil.toJsonStr(mapByName));

        numList = numList.stream().distinct().collect(Collectors.toList());
        System.out.println("去重：" + numList);

        list = list.stream().collect(Collectors.collectingAndThen(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(User::getId))), ArrayList::new));
        System.out.println("根据指定字段去重：" + JSONUtil.toJsonStr(list));

        list = list.stream().filter(e -> e.getName().equals("小孙")).collect(Collectors.toList());
        System.out.println("条件过滤：" + JSONUtil.toJsonStr(list));
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    static class User {
        private Integer id;
        private String name;
        private Integer age;
        private Date time;
    }
}
```