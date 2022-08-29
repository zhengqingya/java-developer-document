### str 字符串

字符串特点：

1. 只可以存储字符串
2. 长度任意（取决于内存大小）
3. 支持下标索引
4. 允许重复字符串存在
5. 不可以修改（修改/增加/删除元素等） -- tips: 不可修改字符串本身，但可通过replace替换得到一个新字符串
6. 支持while/for循环

#### 常用操作方法

| 方法                                    | 描述                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------- |
| `字符串[下标]`                          | 根据下标索引获取值                                                                    |
| `字符串.index(字符串）`                 | 查找指定字符的第一个匹配项的下标                                                      |
| `字符串.replace(字符串1, 字符串2)`      | 将字符串内的全部 字符串 1，替换为 字符串 2 ，不会修改原字符串，而是得到一个新的字符串 |
| `字符串.split(字符串)`                  | 分隔字符串，不会修改原字符串，而是得到一个新的列表                                    |
| `字符串.strip()`/`字符串.strip(字符串)` | 移除首尾的空格和换行符或指定字符串                                                    |
| `字符串.count(字符串)`                  | 统计字符串内某字符串的出现次数                                                        |
| `len(字符串)`                           | 统计字符串的字符个数                                                                  |

```
my_str = "zhengqingya"
print(f"通过下标索引取值：{my_str[1]} {my_str[-2]}")
print(f"[index] ：{my_str.index('e')}")

new_my_str = my_str.replace("g", "G")
print(f"[replace] 原字符串：{my_str} 新字符串：{new_my_str}")  # zhenGqinGya

# split：分隔字符串，划分为多个字符串，并存入列表对象中
my_str = "java python go"
my_str_list = my_str.split(" ")
print(f"[split] 原字符串：{my_str} 分隔字符串后：{my_str_list} 类型：{type(my_str_list)}")

my_str = "  java go python  "
new_my_str = my_str.strip()  # 不传入参数，去除首尾空格
print(f"[strip] 原字符串：{my_str} 被strip后：{new_my_str}")

my_str = "123java go python321"
new_my_str = my_str.strip("123")  # 去除首尾含有123的字符串
print(f"[strip] 原字符串：{my_str} 被strip后：{new_my_str}")  # java go python

my_str = "zhengqingya"
print(f"统计字符串中某字符串的出现次数：{my_str.count('g')}")  # 2
print(f"统计字符串的长度：{len(my_str)}")  # 11
```

#### 遍历字符串

##### while循环

```
my_str = "zhengqingya"
index = 0
while index < len(my_str):
    print(f"[while] 元素：{my_str[index]}")
    index += 1
```

##### for循环

```
my_str = "zhengqingya"
for element in my_str:
    print(f"[for] 元素：{element}")
```
