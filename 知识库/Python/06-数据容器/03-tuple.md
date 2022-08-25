### tuple 元组

元组特点：

1. 可以容纳多个数据
2. 可以容纳不同类型的元素（混装）
3. 数据是有序存储的（下标索引）
4. 允许重复数据存在
5. 不可以修改（修改/增加/删除元素等） -- tips: 可以修改内部list中的元素
6. 支持while/for循环

#### 定义语法

```
# 字面量 tips: 元组只有一个数据时，这个数据后面要添加,
(元素1, )
(元素1, 元素2, 元素3 ...)

# 定义变量
变量名称 = (元素1, 元素2, 元素3 ...)

# 定义空元组
变量名称 = ()
变量名称 = tuple()
```

示例

```
# 定义元组
t1 = ("zhengqingya", 666, True)
t2 = ()
t3 = tuple()
print(f"t1 类型：{type(t1)}  内容：{t1}")
print(f"t2 类型：{type(t2)}  内容：{t2}")
print(f"t3 类型：{type(t3)}  内容：{t3}")

# 定义单个元素的元组
t4 = ("zhengqingya",)
print(f"t4 类型：{type(t4)}  内容：{t4}")
# 元组的嵌套
t5 = ((1, 2, 3), (4, 5, 6))
print(f"t5 类型：{type(t5)}  内容：{t5}")
```

#### 使用下标索引获取值

```
my_tuple = ("zhengqingya", 666, True)
print(f"下标索引获取值：{my_tuple[1]}")
```

#### 常用操作方法

| 方法               | 描述                 |
| ------------------ | -------------------- |
| `元组.index()`     | 查找指定元素下标     |
| `元组.count(元素)` | 统计此元素出现的次数 |
| `len(元组)`        | 统计元组中有多少元素 |

```
my_tuple = ("zhengqingya", 666, True)
print(f"下标索引获取值：{my_tuple[1]}")

# 修改元组内容
# my_tuple[0] = "go"  # 报错 TypeError: 'tuple' object does not support item assignment
my_tuple = (1, ["go", "python"])
my_tuple[1][0] = "go-plus"
print(f"修改元组内部list中的元素：{my_tuple}")  # (1, ['go-plus', 'python'])

my_tuple = ("java", "python", "go")
print(f"查找指定元素下标：{my_tuple.index('python')}")

my_tuple = ("java", "python", "python", "python", "go")
print(f"统计此元素出现的次数：{my_tuple.count('python')}")

print(f"统计元组中有多少元素：{len(my_tuple)}")
```

#### 遍历元组

##### while循环

```
my_tuple = ("java", "python", "go")
index = 0
while index < len(my_tuple):
    print(f"[while] 元素：{my_tuple[index]}")
    index += 1
```

##### for循环

```
my_tuple = ("c++", "python", "go")
for element in my_tuple:
    print(f"[for] 元素：{element}")
```
