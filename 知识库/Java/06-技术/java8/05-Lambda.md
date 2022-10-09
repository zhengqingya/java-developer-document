# Lambda

### Lambda 语法

1. (params) -> expression
2. (params) -> {statements;}

### Lambda 语法特性

1. 使用 -> 分割 Lambda 参数和处理语句。
2. 类型可选，可以不指定参数类型，编译器可以自动判断。
3. 圆括号可选，如果只有一个参数，可以不需要圆括号，多个参数必须要圆括号。
4. 花括号可选，一个语句可以不用花括号，多个参数则花括号必须。
5. 返回值可选，如果只有一个表达式，可以自动返回，不需要 return 语句；花括号中需要 return 语法。
6. Lambda 中引用的外部变量必须为 final 类型，内部声明的变量不可修改，内部声明的变量名称不能与外部变量名相同。

### Lambda 使用

#### 函数接口

```java
package com.zhengqing.demo.daily.base.java8;

import org.junit.Test;

public class Java8_lambda {
    @Test
    public void test_function() throws Exception {
        BiFunction<String, Integer, String> hello = (String name, Integer age) -> "姓名：" + name + "，年龄：" + age;
        hello.apply("zhengqingya", 18);
    }
}
```

#### 方法引用

当 Lambda 只执行一个方法时可使用`实例/类::方法`

```
List<Integer> list = Lists.newArrayList(1, 5, 2, 3, 6);
list.forEach(System.out::println);
```

#### 流式操作

1. 串行流: `stream()`
2. 并行流: `parallelStream()`

```
# 去重遍历
List<Integer> list = Lists.newArrayList(1, 5, 2, 6, 6);
list.stream().distinct().forEach(System.err::print);
```

#### 遍历方式

```
list.forEach(System.out::println);

map.forEach((k, v) -> System.out.println("key:value = " + k + ":" + v));
```

---

### demo

```java
package com.zhengqing.demo.daily.base.java8;

import com.google.common.collect.Lists;
import org.junit.Test;

import java.util.List;
import java.util.function.BiFunction;

public class Java8_lambda {
    @Test
    public void test_function() throws Exception {
        BiFunction<String, Integer, String> hello = (String name, Integer age) -> "姓名：" + name + "，年龄：" + age;
        hello.apply("zhengqingya", 18);
    }

    @Test
    public void test_method_reference() throws Exception {
        List<Integer> list = Lists.newArrayList(1, 5, 2, 3, 6);
        list.forEach(System.out::println);
    }

    @Test
    public void test_stream() throws Exception {
        List<Integer> list = Lists.newArrayList(1, 5, 2, 6, 6);
        list.stream().distinct().forEach(System.err::print);
    }
}
```