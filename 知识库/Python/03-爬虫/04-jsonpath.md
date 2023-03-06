# jsonpath

解析json数据

### 安装

```shell
pip install jsonpath
```

### 示例 `test.py`

```
import jsonpath

data = {
    "code": 200,
    "message": "success",
    "data": {"id": 1, "username": "zhengqingya", "sex": 1},
}

print(jsonpath.jsonpath(data, "$..username"))
```

---

### `JsonPath`与`XPath`语法对比

| XPath | JSONPath  | 描述                                        |
|-------|-----------|-------------------------------------------|
| `/`   | `$`       | 根节点                                       |
| `.`   | `@`       | 现行节点                                      |
| `/`   | `.`or`[]` | 取子节点                                      |
| `..`  | `n/a`     | 取父节点，Jsonpath未支持                          |
| `//`  | `..`      | 就是不管位置，选择所有符合条件的条件                        |
| `*`   | `*`       | 匹配所有元素节点                                  |
| `@`   | `n/a`     | 根据属性访问，Json不支持，因为Json是个Key-value递归结构，不需要。 |
| `[]`  | `[]`      | 迭代器标示（可以在里边做简单的迭代操作，如数组下标，根据内容选值等）        |
| `\`   | `[,]`     | 支持迭代器中做多选。                                |
| `[]`  | `?()`     | 支持过滤操作.                                   |
| `n/a` | `()`      | 支持表达式计算                                   |
| `()`  | `n/a`     | 分组，JsonPath不支持                            |

