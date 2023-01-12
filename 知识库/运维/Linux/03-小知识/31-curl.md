# curl

### 将url链接内容保存到指定文件中

```shell
# 使用 > 符号将输出重定向到本地文件中
curl https://gitee.com/zhengqingya > zhengqingya.html

# 通过 curl 自带的 -o/-O 选项将内容保存到文件中。
#      -o（小写的 o）：结果会被保存到命令行中提供的文件名
#      -O（大写的 O）：URL 中的文件名会被用作保存输出的文件名
curl -o test1.html https://gitee.com/zhengqingya
curl -O https://gitee.com/zhengqingya/docker-compose/blob/master/README.md
```
