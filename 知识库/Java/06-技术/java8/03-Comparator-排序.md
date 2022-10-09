# Comparator 排序

### List排序

```
List<Integer> numList = Lists.newArrayList(1, 5, 6, 2);
// 升序 -- 此方式需赋值
numList = numList.stream().sorted().collect(Collectors.toList());
// 升序
numList.sort(Comparator.naturalOrder());
// 降序
numList.sort(Comparator.reverseOrder());
```

### List按某个字段排序 -- 对象中的字段

> tips: 支持 字符串（String）、日期（Date）、整型（Integer）、整形（Long）

- 升序: `Comparator.comparing`
- 降序: `Comparator.comparing(User::getId,Comparator.reverseOrder())`

#### 单字段排序

##### 对字段age升序

```
# 方式1：
list.sort(Comparator.comparing(User::getAge));
# 方式2：  -- 此方式需赋值
list = list.stream().sorted(Comparator.comparing(User::getAge)).collect(Collectors.toList());
```

##### 对字段age降序

```
# 方式1：
list.sort(Comparator.comparing(User::getAge).reversed());
# 方式2：  -- 此方式需赋值
list = list.stream().sorted(Comparator.comparing(User::getAge).reversed()).collect(Collectors.toList());
```

#### 多字段排序

##### 对age升序 & age相同时根据id降序

```
list = list.stream()
        .sorted(
                Comparator.comparing(User::getAge).thenComparing(User::getId, Comparator.reverseOrder())
        )
        .collect(Collectors.toList());
```

##### 对age降序 & age相同时根据id升序

```
list = list.stream()
        .sorted(
                Comparator.comparing(User::getAge).reversed().thenComparing(User::getId)
        )
        .collect(Collectors.toList());
```

#### 空值处理

##### 升序时，属性值为空排前面

```
list.sort(Comparator.comparing(User::getAge, Comparator.nullsFirst(Integer::compareTo)));
```

##### 升序时，属性值为空排后面

```
list.sort(Comparator.comparing(User::getAge, Comparator.nullsLast(Integer::compareTo)));
```

##### 降序时，属性值为空排到后面

```
list.sort(Comparator.comparing(User::getAge, Comparator.nullsFirst(Integer::compareTo)).reversed());
```

##### 降序时，属性值为空排到前面

```
list.sort(Comparator.comparing(User::getAge, Comparator.nullsLast(Integer::compareTo)).reversed());
```

---

### demo

```java
package com.zhengqing.demo.daily.base.java8.comparator;

import cn.hutool.json.JSONUtil;
import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.junit.Test;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class Java8Comparator {
    @Test
    public void test() throws Exception {
        System.err.println("=================== ↓↓↓↓↓↓ 单字段排序 ↓↓↓↓↓↓ ===================");
        List<Integer> numList = Lists.newArrayList(1, 5, 6, 2);
        // 升序 -- 此方式需赋值
        numList = numList.stream().sorted().collect(Collectors.toList());
        System.out.println(numList);
        // 升序
        numList.sort(Comparator.naturalOrder());
        System.out.println(numList);
        // 降序
        numList.sort(Comparator.reverseOrder());
        System.out.println(numList);


        System.err.println("\n=================== ↓↓↓↓↓↓ 单字段排序 -- 对象中的字段 ↓↓↓↓↓↓ ===================");
        List<User> list = Lists.newArrayList(
                User.builder().id(1).age(16).name("小张").build(),
                User.builder().id(10).age(20).name("小孙").build(),
                User.builder().id(2).age(18).name("李四").build(),
                User.builder().id(3).age(6).name("王五").build(),
                User.builder().id(6).age(6).name("王五2").build()
        );

        list.sort(Comparator.comparing(User::getAge));
        System.out.println("对字段age升序：" + JSONUtil.toJsonStr(list));
        list = list.stream().sorted(Comparator.comparing(User::getAge)).collect(Collectors.toList());
        System.out.println(JSONUtil.toJsonStr(list));

        list.sort(Comparator.comparing(User::getAge).reversed());
        System.out.println("对字段age降序：" + JSONUtil.toJsonStr(list));
        list = list.stream().sorted(Comparator.comparing(User::getAge).reversed()).collect(Collectors.toList());
        System.out.println(JSONUtil.toJsonStr(list));


        System.err.println("\n=================== ↓↓↓↓↓↓ 多字段排序 ↓↓↓↓↓↓ ===================");
        list = list.stream()
                .sorted(
                        Comparator.comparing(User::getAge).thenComparing(User::getId, Comparator.reverseOrder())
                )
                .collect(Collectors.toList());
        System.out.println("对age升序 & age相同时根据id降序：" + JSONUtil.toJsonStr(list));

        list = list.stream()
                .sorted(
                        Comparator.comparing(User::getAge).reversed().thenComparing(User::getId)
                )
                .collect(Collectors.toList());
        System.out.println("对age降序 & age相同时根据id升序：" + JSONUtil.toJsonStr(list));

        System.err.println("\n=================== ↓↓↓↓↓↓ 空值处理 ↓↓↓↓↓↓ ===================");
        list.add(User.builder().id(100).age(null).name("hi").build());
        list.sort(Comparator.comparing(User::getAge, Comparator.nullsFirst(Integer::compareTo)));
        System.out.println("升序时，属性值为空排前面：" + JSONUtil.toJsonStr(list));
        list.sort(Comparator.comparing(User::getAge, Comparator.nullsLast(Integer::compareTo)));
        System.out.println("升序时，属性值为空排后面：" + JSONUtil.toJsonStr(list));
        list.sort(Comparator.comparing(User::getAge, Comparator.nullsFirst(Integer::compareTo)).reversed());
        System.out.println("降序时，属性值为空排到后面：" + JSONUtil.toJsonStr(list));
        list.sort(Comparator.comparing(User::getAge, Comparator.nullsLast(Integer::compareTo)).reversed());
        System.out.println("降序时，属性值为空排到前面：" + JSONUtil.toJsonStr(list));
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