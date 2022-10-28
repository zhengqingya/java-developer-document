# Lua语法入门

Nginx编程需要用到Lua语言，因此我们必须先入门Lua的基本语法。

### 一、初识Lua

> 官网：https://www.lua.org

Lua 是一种轻量小巧的脚本语言，用标准C语言编写并以源代码形式开放， 其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。

Lua经常嵌入到C语言开发的程序中，例如游戏开发、游戏插件等。

Nginx本身也是C语言开发，因此也允许基于Lua做拓展。

### 二、HelloWorld

CentOS7默认已经安装了Lua语言环境，所以可以直接运行Lua代码。

```shell
# 创建文件
echo "print('Hello World')" > hello.lua

# 运行
lua hello.lua
```

### 三、变量和循环

#### 1、Lua的数据类型

![Lua-常见数据类型.png](images/Lua-常见数据类型.png)

另外，Lua提供了`type()`函数来判断一个变量的数据类型：

```shell
> printf (type('hello'))
string
> printf (type(true))
boolean
```

#### 2、声明变量

Lua声明变量的时候无需指定数据类型，而是用local来声明变量为局部变量

```lua
-- 声明字符串，可以用单引号或双引号，
local str = 'hello'
-- 字符串拼接可以使用 ..
local str2 = 'hello' .. 'world'
-- 声明数字
local num = 21
-- 声明布尔类型
local flag = true
```

Lua中的table类型既可以作为数组，又可以作为Java中的map来使用。
数组就是特殊的table，key是数组角标而已

```lua
-- 声明数组 ，key为角标的 table
local arr = {'java', 'python', 'lua'}
-- 声明table，类似java的map
local map =  {name='Jack', age=21}
```

Lua中的数组角标是从1开始，访问的时候与Java中类似

```lua
-- 访问数组，lua数组的角标从1开始
print(arr[1])
```

Lua中的table可以用key来访问

```lua
-- 访问table
print(map['name'])
print(map.name)
```

#### 3、循环

对于table，我们可以利用for循环来遍历。不过数组和普通table遍历略有差异。

遍历数组：

```lua
-- 声明数组 key为索引的 table
local arr = {'java', 'python', 'lua'}
-- 遍历数组
for index,value in ipairs(arr) do
    print(index, value) 
end
```

遍历普通table

```lua
-- 声明map，也就是table
local map = {name='Jack', age=21}
-- 遍历table
for key,value in pairs(map) do
   print(key, value) 
end
```

### 四、条件控制、函数

Lua中的条件控制和函数声明与Java类似。

#### 1、函数

定义函数的语法：

```lua
function 函数名( argument1, argument2..., argumentn)
    -- 函数体
    return 返回值
end
```

例如，定义一个函数，用来打印数组：

```lua
function printArr(arr)
    for index, value in ipairs(arr) do
        print(value)
    end
end
```

#### 2、条件控制

类似Java的条件控制，例如if、else语法：

```lua
if(布尔表达式)
then
   --[ 布尔表达式为 true 时执行该语句块 --]
else
   --[ 布尔表达式为 false 时执行该语句块 --]
end

```

与java不同，布尔表达式中的逻辑运算是基于英文单词：

![Lua-逻辑运算.png](images/Lua-逻辑运算.png)

#### 3、案例

需求：自定义一个函数，可以打印table，当参数为nil时，打印错误信息

```lua
function printArr(arr)
    if not arr then
        print('数组不能为空！')
    end
    for index, value in ipairs(arr) do
        print(value)
    end
end
```

