# thefuck

- https://github.com/nvbn/thefuck

可以纠正控制台命令中的错误。

eg:

```shell
➜ apt-get install vim
E: Could not open lock file /var/lib/dpkg/lock - open (13: Permission denied)
E: Unable to lock the administration directory (/var/lib/dpkg/), are you root?

➜ fuck
sudo apt-get install vim [enter/↑/↓/ctrl+c]
[sudo] password for nvbn:
Reading package lists... Done
...
```

### Linux安装使用

```shell
# 安装
pip3 install thefuck

# 配置
echo 'eval $(thefuck --alias)' >> ~/.zshrc
source ~/.zshrc
```