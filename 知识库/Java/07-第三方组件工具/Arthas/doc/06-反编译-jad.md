### jad

> 反编译

```shell
# 反编译指定已加载类的源码
jad com.zhengqing.demo.api.TestController

# 反编译指定已加载类中的某一个方法的源码
jad com.zhengqing.demo.api.TestController test

# 默认情况下，反编译结果里会带有ClassLoader信息，通过--source-only选项，可以只打印源代码。方便和mc/retransform命令结合使用。
jad --source-only com.zhengqing.demo.api.TestController
# 查看某一个方法
jad --source-only com.zhengqing.demo.api.TestController test

# 反编译时不显示行号
jad --source-only com.zhengqing.demo.api.TestController --lineNumber false

# 方法
jad --source-only com.zhengqing.demo.api.TestController handleBusiness2 --lineNumber false
```

![jad.png](images/jad.png)
