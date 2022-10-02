### watch

> 监听方法执行情况: 返回值、抛出异常、入参

```shell
# 监听第一个提交参数 & 返回对象中的time字段值
watch com.zhengqing.demo.api.TestController time "{params[0],returnObj.obj.time}"

# 监听第一个提交参数 & 指定输出结果的属性遍历深度(默认为1)
watch com.zhengqing.demo.api.TestController time "{params[0],returnObj}" -x 3

# 监听异常 -n：只执行2次
watch com.zhengqing.demo.api.TestController time "{params[0],returnObj,throwExp}" -x 3 -n 2
```

![watch.png](images/watch.png)
