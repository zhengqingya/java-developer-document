# Chocolatey

```shell
choco -h                              # 查看帮助
choco <command> -h                    # 查看相应命令的帮助
choco install <package name>          # 安装软件包
choco search <keyword>                # 搜索软件包，会列出跟关键字相关的所有软件包
choco upgrade <package name>          # 升级软件包
choco uninstall <package name>        # 卸载软件包
choco list --local-only               # 列出本地已安装的软件包
choco list -li OR choco list -lai     # 列出Windows系统已安装的软件
choco upgrade all -y                  # 升级所有已安装的包
# 安装软件
choco install compass -source ruby             # Ruby Gem
choco install sphynx -source python            # Python Egg
choco install IIS -source windowsfeatures      # IIS服务器特性
choco install IIS7.5Express -source webpi      # Webpi特性
choco install mysql -y                         # mysql 
choco install maven                            # maven
choco upgrade maven                            # 升级maven
choco install jdk7                             # jdk7
choco install jdk8                             # jdk8
choco install autohotkey.portable              # AutoHotkey (Portable)
choco install nodejs.install                   # node
choco install git.install                      # git
choco install python                           # python
choco install ruby                             # ruby
choco install jdk8                             # JDK8
choco install googlechrome                     # Chrome
choco install google-chrome-x64                # Google Chrome (64-bit only)
choco install firefox                          # firefox
choco install notepadplusplus.install          # notepad++
choco install Atom                             # Atom
choco install SublimeText3                     # SublimeText3
choco install intellijidea-community           # IntelliJ IDEA社区版
choco install intellijidea-ultimate            # IntelliJ IDEA旗舰版
choco install jdk8 googlechrome vscode 7zip    # 一次安装多个软件包
choco install nodejs.install --version 0.10.35 # 安装指定版本
choco install dev-package.config               # 安装`dev-package.config`文件内描述的所有软件包
```

`dev-package.config

```
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="jdk8" />
  <package id="googlechrome" version="71.0.3578.98" />
  <package id="vscode" />
  <package id="7zip" />
</packages>
```
