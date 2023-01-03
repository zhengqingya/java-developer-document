### grep命令

grep命令屏蔽进程本身`grep --color=auto xxx`

```shell
ps -ef | grep [服务名] | grep -v grep

# ex:
ps -ef | grep java | grep -v grep
```
