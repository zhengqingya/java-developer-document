### debug跳过class文件

问题：不配置的情况下每次debug会进入`org.springframework.aop.framework.CglibAopProxy.class`或者其它class文件

解决：

`File` -> `Settings...` -> `Build,Exclution,Deployment` -> `Debugger` -> `Stepping`

1. 类名
2. 包名.*

![idea-debug-stepping.png](images/idea-debug-stepping.png)