### IntelliJ IDEA

[点击下载 IDEA](https://www.jetbrains.com/zh-cn/idea/download/#section=windows)

> 本系列基于`ideaIU-2022.1.1.win`操作

安装之后

`windows`：配置存放目录`C:\Users\zhengqingya\AppData\Roaming\JetBrains\IntelliJIdea2022.1`

`mac`: 配置存放目录

```
# 注：因为路径有空格原因直接进不去，需要一层一层进入或路径加上双引号进入
open "/Users/zhengqingya/Library/Application Support/JetBrains/IntelliJIdea2021.1"
```

### IDE 激活

申请开源开发许可证 -> https://www.jetbrains.com/shop/eform/opensource

---

### Mac 卸载 idea

```shell
rm -rf /Users/zhengqingya/Library/Logs/JetBrains/IntelliJIdea2021.1
rm -rf "/Users/zhengqingya/Library/Application Support/JetBrains/IntelliJIdea2021.1"
rm -rf /Users/zhengqingya/Library/Caches/JetBrains/IntelliJIdea2021.1
```

#### Mac 安装新版本 idea 打不开问题

> ex: ideaIU-2022.3.1.dmg
> 解决可参考 https://youtrack.jetbrains.com/issue/JBR-4296

1. 删除`/Users/zhengqingya/Library/LaunchAgents/jetbrains.vmoptions.plist`文件
2. 重启 mac
3. 打开 idea 即可
