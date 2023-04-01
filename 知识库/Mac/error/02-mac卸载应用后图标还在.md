# mac卸载应用后图标还在

解决

```shell
# 重置 macOS 启动台图标 -- 分类的数据会丢失，应用得重新分类了，建议谨慎使用！
defaults write com.apple.dock ResetLaunchPad -bool true; killall Dock
```
