### retransform

> 加载外部的.class文件，retransform jvm已加载的类。
> 热部署

```shell
# 反编译查看旧数据
jad com.zhengqing.demo.api.TestController time

# 自行修改编译文件 TestController.java

# 如果多次执行 retransform 加载同一个 class 文件，则会有多条 retransform entry.
retransform src/main/java/com/zhengqing/demo/api/TestController.class

# 反编译查看新数据
jad com.zhengqing.demo.api.TestController time

# 查看
retransform -l

# 删除
retransform -d 1
# 删除所有
retransform --deleteAll
```
