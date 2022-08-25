### dict 字典

字典特点：

1. 可以容纳多个元素
2. 可以容纳不同类型的元素
3. 每一份数据是`key:value`键值对
4. key和value可以是任意数据类型（key不可为字典）
5. 可以通过key获取到value，key不可重复（重复会覆盖原有数据）
6. 不支持下标索引
7. 可以修改（增加/删除/更新元素等）
8. 支持for循环，不支持while循环

#### 定义语法

```
# 定义字面量
{key:value, key:value, key:value ...}

# 定义变量
变量名称 = {key:value, key:value, key:value ...}

# 定义空字典
变量名称 = {}
变量名称 = dict()
```

示例

```
my_dict = {"java": 1, "python": 2, "go": 3}
my_dict_empty_01 = {}
my_dict_empty_02 = dict()
print(f"字典：{my_dict} 类型：{type(my_dict)}")
print(f"空字典：{my_dict_empty_01} 类型：{type(my_dict_empty_01)}")
print(f"空字典：{my_dict_empty_02} 类型：{type(my_dict_empty_02)}")

my_dict = {"java": 1, "java": 2, "go": 3}
print(f"重复key：{my_dict}")

my_dict = {"java": 1, "python": 2, "go": 3}
print(f"通过key获取value：{my_dict['java']}")

my_dict = {
    "张三": {"age": 18, "nickname": "zhangsan"},
    "李四": {"age": 20, "nickname": "lisi"},
}
print(f"嵌套字典：{my_dict}")
print(f"嵌套字典获取值：{my_dict['李四']['age']}")
```

#### 字典常用操作方法

| 方法                | 描述                                          |
| ------------------- | --------------------------------------------- |
| `字典[key]`         | 获取指定 key 对应的 value 值                  |
| `字典[key] = value` | 添加或更新键值对                              |
| `字典.pop(key)`     | 删除指定键的元素                              |
| `字典.clear()`      | 清空字典                                      |
| `字典.keys()`       | 获取包含字典键的列表，可用于 for 循环遍历字典 |
| `字典.values()`     | 获取包含字典值的列表                          |
| `len(字典)`         | 统计字典中有多少元素                          |

```
my_dict = {"java": 1, "python": 2, "go": 3}

my_dict["php"] = -1
print(f"新增元素：{my_dict}")

my_dict["python"] = 100
print(f"更新元素：{my_dict}")

php = my_dict.pop("php")
print(f"{my_dict} 删除元素：{php}")

my_dict.clear()
print(f"清空元素：{my_dict}")

my_dict = {"java": 1, "python": 2, "go": 3}
print(f"字典内的元素数量：{len(my_dict)}")

keys = my_dict.keys()
print(f"全部key：{keys}")
```

#### 遍历字典

```
for key in keys:
    print(f"[方式1] key:{key}    value:{my_dict[key]}")

for key in my_dict:
    print(f"[方式2] key:{key}    value:{my_dict[key]}")

values = my_dict.values()
for value in values:
    print(f"[方式3] value:{value}")
```
