### grep命令

```shell script
最常用的-全字匹配
grep -wrn  weiqifa ./sound/

查找 某个字符串但是不在指定文件夹查找
grep -E "http"  ./ -R --exclude-dir=./sound/ 
grep -E "http"  . -R --exclude-dir={.git,res,bin}
排除扩展名为 java 和 js 的文件
grep -E "http"  . -R --exclude=*.{java,js}

1 基本使用
查询包含hadoop的行
grep hadoop /etc/password
grep aaa  ./*.txt 

2 cut截取以:分割保留第七段
root@ubuntu:~/kernel_rk3399_yan4_dev/kernel# grep dsl /etc/passwd | cut -d: -f7
/bin/bash
root@ubuntu:~/kernel_rk3399_yan4_dev/kernel# grep dsl /etc/passwd 
dsl:x:1000:1000:dsl,,,:/home/dsl:/bin/bash
root@ubuntu:~/kernel_rk3399_yan4_dev/kernel# 


3 查询不包含hadoop的行
grep -v hadoop /etc/passwd

4 正则表达包含hadoop
grep 'hadoop' /etc/passwd

5 正则表达(点代表任意一个字符)
grep 'h.*p' /etc/passwd

6 正则表达以hadoop开头
grep '^hadoop' /etc/passwd

7 正则表达以hadoop结尾
grep 'hadoop$' /etc/passwd

规则：
.  : 任意一个字符
a* : 任意多个a(零个或多个a)
a? : 零个或一个a
a+ : 一个或多个a
.* : 任意多个任意字符
\. : 转义.
o\{2\} : o重复两次

查找不是以#开头的行
grep -v '^#' a.txt | grep -v '^$' 

以h或r开头的
grep '^[hr]' /etc/passwd

不是以h和r开头的
grep '^[^hr]' /etc/passwd

不是以h到r开头的
grep '^[^h-r]' /etc/passwd


# 查找当期目录下的文件是否包含指定的文件内容
grep -H -r "考勤汇总报表" . | cut -d: -f1
# 查找文件或文件夹
find -name xx.jsp
```
