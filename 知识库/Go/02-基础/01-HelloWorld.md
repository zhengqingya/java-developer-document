# Go学习笔记

## HelloWorld

```go
// 包声明
package main

// 引入包
import "fmt"

// 可执行函数
func main() {
	// 这是单行注释

	/*
		这是
		多行注释
	*/

	fmt.Println("Hello World !")

	// 变量名: 由字母、数字、下划线组成，其中首个字符不能为数字
	var str string = "字符串"
	fmt.Println("【" + str + "】")

}
```

## 执行程序

```shell script
# 方式一：
go run hello.go

# 方式二： -> 生成二进制文件
go build hello.go    # 此命令会生成hello.exe文件
hello.exe            # 运行
```
