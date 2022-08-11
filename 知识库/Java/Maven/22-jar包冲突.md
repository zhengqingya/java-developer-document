### jar包冲突原因

> 可见 [版本仲裁.md](18-版本仲裁.md)

1. A -> B(版本1.1)
2. A -> B(版本1.2)

由于路径相同时先声明者优先原则：依赖B将使用`版本1.1`；
由于2个版本不同，`版本1.1`中缺少了`版本1.2`的xx类；
导致A使用B时由于找不到类出现问题！

### jar包冲突解决

IDEA安装插件`Maven Helper`

Exclude冲突的jar包即可

![maven-helper-exclude.png](images/maven-helper-exclude.png)