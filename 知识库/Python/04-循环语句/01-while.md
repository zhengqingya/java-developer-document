### while

只要条件满足会无限循环执行...

```
while 条件:
    条件满足时执行...
    ...
```

```
i = 0
while i <= 10:
    i += 1
    print(i)
```

### 嵌套使用

```
while 条件1:
    条件1满足时执行...
    ...
    while 条件2:
        条件2满足时执行...
        ...
```

```
i = 0
j = 0
while i <= 10:
    i += 1
    print(i)
    while j <= 20:
        j += 5
        print("j: ", j)
print("***************")
```

---

### 九九乘法表

```
i = 1
while i <= 9:
    j = 1
    while j <= i:
        # 内层循环的print语句，不要换行，通过\t制表符进行对齐（\t:等同于在键盘上按下tab键）
        print(f"{j} * {i} = {j * i}\t", end="")
        j += 1
    i += 1
    print()  # print空内容，就是输出一个换行
```