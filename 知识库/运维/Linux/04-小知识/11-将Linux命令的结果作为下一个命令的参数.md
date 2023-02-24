### 将Linux命令的结果作为下一个命令的参数

```shell
# xargs -i 指定一个替换字符串 {}，这个字符串在 xargs 扩展时会被替换掉
date | xargs echo
date | xargs -i echo "时间：[{}]"
```
