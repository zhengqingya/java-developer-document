### JSON

JSON是一种轻量级的数据交互格式。
JSON本质上是一个带有特定格式的字符串。

```json
{
  "name": "admin",
  "age": 18
}
```

```json
[
  {
    "name": "admin",
    "age": 18
  },
  {
    "name": "test",
    "age": 20
  }
]
```

### Python数据和JSON数据 相互转换

| 方法                                   | 描述                       |
| -------------------------------------- |--------------------------|
| `json.dumps(data, ensure_ascii=False)` | python中的列表或字典 转 json字符串，`ensure_ascii=False`：解决中文乱码问题 |
| `json.loads(json_str)`                 | json字符串 转 python中的列表或字典  |

```
import json

# 定义列表
data = [{"name": "admin", "age": 18}, {"name": "test", "age": 20}]
# 列表 转 json字符串 -- `ensure_ascii=False`：解决中文乱码问题
json_str = json.dumps(data, ensure_ascii=False)
print(f"{type(json_str)}  ---  {json_str}")

# 定义字典
data = {"name": "admin", "age": 18}
# 字典 转 json字符串 -- `ensure_ascii=False`：解决中文乱码问题
json_str = json.dumps(data, ensure_ascii=False)
print(f"{type(json_str)}  ---  {json_str}")

# 定义json字符串
json_str = '[{"name": "admin", "age": 18}, {"name": "test", "age": 20}]'
# json字符串 转 列表
python_list = json.loads(json_str)
print(f"{type(python_list)}  ---  {python_list}")

# json字符串 转 字典
json_str = '{"name": "admin", "age": 18}'
python_dict = json.loads(json_str)
print(f"{type(python_dict)}  ---  {python_dict}")
```