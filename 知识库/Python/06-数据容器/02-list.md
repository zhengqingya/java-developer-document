### list 列表

列表特点：

1. 可以容纳多个元素（上限为2**63-1、9223372036854775807个）
2. 可以容纳不同类型的元素（混装）
3. 数据是有序存储的（下标索引）
4. 允许重复数据存在
5. 可以修改/增加/删除元素等
6. 支持while/for循环

#### 定义语法

```
# 字面量
[元素1, 元素2, 元素3 ...]

# 定义变量
变量名称 = [元素1, 元素2, 元素3 ...]

# 定义空列表
变量名称 = []
变量名称 = list()
```

示例

```
# 定义一个列表
my_list = [1, 2, 3]
print(my_list)
print(type(my_list))  # <class 'list'>

# 定义一个多数据类型的列表
my_list = ["zhengqingya", 666, True]
print(my_list)
print(type(my_list))

# 定义一个嵌套的列表
my_list = [[1, 2, 3], [4, 5, 6]]
print(my_list)
print(type(my_list))
```

#### 使用下标索引获取值

```
# 通过下标索引取出对应位置的数据
# 格式：列表[下标索引]
#       从前向后从0开始，每次+1
#       从后向前从-1开始，每次-1
my_list = ["张三", "李四", "王五"]
print(my_list[0])  # 张三
print(my_list[1])  # 李四
print(my_list[2])  # 王五
# tips: 下标索引超出范围会报错    IndexError: list index out of range
# print(my_list[3])
print(my_list[-1])  # 王五
print(my_list[-2])  # 李四
print(my_list[-3])  # 张三

# 取出嵌套列表的元素
my_list = [[1, 2, 3], [4, 5, 6]]
print(my_list[1][2])  # 6
```

#### 列表常用操作方法

| 方法                     | 描述                                     |
| ------------------------ | ---------------------------------------- |
| `列表.index(元素)`       | 查找指定元素下标                         |
| `列表.insert(下标,元素)` | 在指定下标处，插入指定元素               |
| `列表.append(元素)`      | 往列表中追加一个元素                     |
| `列表.extend(容器)`      | 将数据容器的内容依次取出，追加到列表尾部 |
| `del 列表[下标]`         | 删除列表指定下标元素                     |
| `列表.pop(下标)`         | 删除列表指定下标元素                     |
| `列表.remove(元素)`      | 从前往后，删除列表中第一个匹配的元素     |
| `列表.count(元素)`       | 统计此元素在列表中出现的次数             |
| `len(列表)`              | 统计列表中有多少元素                     |
| `列表.clear()`           | 清空列表                                 |

```
mylist = ["java", "python", "go"]
print(f"1. 查找python在列表内的下标索引：{mylist.index('python')}")
# 如果被查找的元素不存在会报错     ValueError: 'php' is not in list
# mylist.index("php")

mylist[0] = "java-plus"
print(f"2. 修改指定下标索引的值：{mylist}")

mylist.insert(1, "C++")
print(f"3. 在指定下标位置插入新元素：{mylist}")

mylist.append("Typescript")
print(f"4. 在列表的尾部追加单个新元素：{mylist}")

mylist.extend([1, 2, 3])
print(f"5. 在列表的尾部追加多个新元素：{mylist}")

del mylist[2]
print(f"6.1 删除指定下标索引的元素：{mylist}")
element = mylist.pop(1)
print(f"6.2 通过pop方法取出元素后列表内容：{mylist}   取出的元素是：{element}")

mylist = ["java", "python", "go", "ts", "go"]
mylist.remove("go")
print(f"7. 删除某元素在列表中的第一个匹配项：{mylist}")

mylist.clear()
print(f"清空列表：{mylist}")

mylist = ["java", "python", "python", "ts", "python"]
print(f"9. 统计列表内python的数量：{mylist.count('python')}")

print(f"10. 统计列表中全部的元素数量：{len(mylist)}")
```

#### 遍历列表

遍历/迭代：将容器内的元素依次取出，并处理

##### while循环

```
def list_while_func():
    mylist = ["java", "python", "go"]
    # 循环控制变量：通过下标索引来控制，默认是0
    # 每一次循环，将下标索引变量+1
    # 循环条件：下标索引变量 < 列表的元素数量
    index = 0
    while index < len(mylist):
        element = mylist[index]
        print(f"[while] 元素：{element}")
        index += 1

list_while_func()
```

##### for循环

```
def list_for_func():
    mylist = [1, 2, 3]
    for element in mylist:
        print(f"[for] 元素：{element}")

list_for_func()
```
