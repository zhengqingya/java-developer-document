### set 集合

集合特点：

1. 可以容纳多个元素
2. 可以容纳不同类型的元素（混装）
3. 数据是无序存储的（不支持下标索引）
4. 不允许重复数据存在
5. 可以修改(增加/删除元素等)
6. 支持for循环，不支持while循环（因为不支持下标索引）

#### 定义语法

```
# 定义字面量
{元素1, 元素2, 元素3 ...}

# 定义变量
变量名称 = {元素1, 元素2, 元素3 ...}

# 定义空集合
变量名称 = set()
```

#### 集合常用操作方法

| 方法                             | 描述                                                             |
| -------------------------------- | ---------------------------------------------------------------- |
| `集合.add(元素)`                 | 添加指定元素                                                     |
| `集合.remove(元素)`              | 移除指定元素                                                     |
| `集合.pop()`                     | 随机取出一个元素                                                 |
| `集合.clear()`                   | 清空集合                                                         |
| `集合1.difference(集合2)`        | 得到一个新集合，内含 2 个集合的差集，原有的 2 个集合内容不变     |
| `集合1.difference_update(集合2)` | 在集合 1 中，删除集合 2 中存在的元素，集合 1 被修改，集合 2 不变 |
| `集合1.union(集合2)`             | 合并集合，得到 1 个新集合，原有的 2 个集合内容不变               |
| `len(集合)`                      | 统计集合中有多少元素                                             |

```
my_set = {"java", "python", "go"}
my_set_empty = set()
print(f"集合：{my_set}  类型：{type(my_set)}")
print(f"空集合：{my_set_empty}  类型：{type(my_set_empty)}")

my_set.add("c++")
my_set.add("php")
print(f"添加新元素：{my_set}")  # {'java', 'php', 'go', 'c++', 'python'}

my_set.remove("c++")
print(f"移除元素：{my_set}")  # {'java', 'php', 'go', 'python'}

element = my_set.pop()
print(f"随机取出一个元素：{element}, 取出元素后的集合：{my_set}")

my_set.clear()
print(f"清空集合：{my_set}")  # set()

print("************************")

set1 = {1, 2, 3}
set2 = {2, 5, 6}
print(f"取2个集合的差集：{set1.difference(set2)}")  # {1, 3}
print(f"取2个集合的差集，原set1不变：{set1}")
print(f"取2个集合的差集，原set2不变：{set2}")


set1.difference_update(set2)
print(f"消除2个集合的差集后，set1结果：{set1}")  # {1, 3}
print(f"消除2个集合的差集后，set2不变：{set2}")  # {2, 5, 6}

set_union = set1.union(set2)
print(f"合并集合：{set_union}")  # {1, 2, 3, 5, 6}
print(f"合并集合后set1不变：{set1}")
print(f"合并集合后set2不变：{set2}")

print(f"set1内的元素数量：{len(set1)}")  # 2
```

#### 遍历集合

```
# 集合不支持下标索引，不能用while循环
# 可以用for循环
my_set = {"java", "python", "go"}
for element in my_set:
    print(f"[for] 元素：{element}")
```