# Lua脚本

```shell
# 调用脚本，脚本需要的key类型的参数个数
eval "return redis.call('set', 'name', 'zhengqingya')" 0

# key value 作为参数传递
eval "return redis.call('set', KEYS[1], ARGV[1])" 1 name zhengqingya
```

![redis-lua.png](images/redis-lua.png)
