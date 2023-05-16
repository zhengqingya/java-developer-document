# JsonPath

用于读取 JSON 文档的 Java DSL。

- https://github.com/json-path/JsonPath
- https://goessner.net/articles/JsonPath/

```xml

<dependency>
    <groupId>com.jayway.jsonpath</groupId>
    <artifactId>json-path</artifactId>
    <version>2.8.0</version>
</dependency>
```

```java
package com.zhengqing.demo.daily.other;

import com.jayway.jsonpath.JsonPath;
import org.junit.Test;

import java.util.List;
import java.util.Map;

public class TestJsonPath {

    @Test
    public void test() throws Exception {
        String json = "{\"store\":{\"book\":[{\"category\":\"reference\",\"author\":\"Nigel Rees\",\"title\":\"Sayings of the Century\",\"price\":8.95},{\"category\":\"fiction\",\"author\":\"Evelyn Waugh\",\"title\":\"Sword of Honour\",\"price\":12.99},{\"category\":\"fiction\",\"author\":\"Herman Melville\",\"title\":\"Moby Dick\",\"isbn\":\"0-553-21311-3\",\"price\":8.99},{\"category\":\"fiction\",\"author\":\"J. R. R. Tolkien\",\"title\":\"The Lord of the Rings\",\"isbn\":\"0-395-19395-8\",\"price\":22.99}],\"bicycle\":{\"color\":\"red\",\"price\":19.95}},\"expensive\":10}";

        List<String> authors = JsonPath.read(json, "$.store.book[*].author");

        // 所有价格低于 10 的书籍
        List<Map<String, Object>> books = JsonPath.parse(json).read("$.store.book[?(@.price < 10)]");

        System.out.println(books);
    }

}
```

