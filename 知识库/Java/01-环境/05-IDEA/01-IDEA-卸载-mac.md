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
