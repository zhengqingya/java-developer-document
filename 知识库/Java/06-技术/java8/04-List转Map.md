# List转Map

> tips: 当集合对象key重复时可根据`(oldData, newData) -> newData`设置保留新值还是旧值，这里是保留新值

```
Map<Integer, User> map = list.stream().collect(Collectors.toMap(User::getId, t -> t, (oldData, newData) -> newData));

Map<Integer, String> map2 = list.stream().collect(Collectors.toMap(User::getId, User::getName, (oldData, newData) -> newData));
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

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Java8_list_to_map {
    @Test
    public void test() throws Exception {
        List<User> list = Lists.newArrayList(
                User.builder().id(1).age(16).name("小张").build(),
                User.builder().id(10).age(20).name("小孙").build(),
                User.builder().id(1).age(18).name("李四").build(),
                User.builder().id(3).age(6).name("王五").build()
        );
        // 当集合对象key重复时可根据`(oldData, newData) -> newData`设置保留新值还是旧值，这里是保留新值
        Map<Integer, User> map = list.stream().collect(Collectors.toMap(User::getId, t -> t, (oldData, newData) -> newData));
        System.out.println(JSONUtil.toJsonStr(map));

        Map<Integer, String> map2 = list.stream().collect(Collectors.toMap(User::getId, User::getName, (oldData, newData) -> newData));
        System.out.println(JSONUtil.toJsonStr(map2));
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