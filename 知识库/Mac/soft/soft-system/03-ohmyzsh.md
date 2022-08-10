###### ohmyzsh

[https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

[https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)

```shell
mkdir -p ohmyzsh
touch install.sh
# 编写下载好的脚本内容到此文件
vim install.sh
# 安装
sh install.sh
```

```shell
# 修改zsh配置
vim ~/.zshrc

# 需修改的配置主要如下： -----------------------------------
ZSH_THEME="ys"

# 自动更新
DISABLE_UPDATE_PROMPT=true

# 【多个插件用空格分开】        
plugins=(
  git       # 默认开启的插件，提供了大量 git 的alias
  z         # z命令快速跳转目录，会记忆你曾经进入过的目录，用模糊匹配快速进入你想要的目录
  # zsh-autosuggestions # 历史命令记录
  extract   # x命令解压一切文件  ex: x test.zip
  web-search # 可在命令行中使用搜索引擎进行搜索  ex: 【 `baidu 郑清it`  或 `google 郑清it` 】
  last-working-dir         # 下次进入终端时定位到上次打开的目录下
  zsh-syntax-highlighting  # 一个类似 fish 的命令高亮插件
)
# ------------------------------------------------------

# 如果zsh提示如下：
[oh-my-zsh] plugin 'zsh-autosuggestions' not found
[oh-my-zsh] plugin 'zsh-syntax-highlighting' not found
# 则执行如下命令：
# 进入oh-my-zsh自定义插件目录
cd ~/.oh-my-zsh/custom/plugins
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
# 在配置文件最后加上source...
echo "source ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc

# 更新配置：
source ~/.zshrc
```
