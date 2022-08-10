###### Homebrew

> https://brew.sh/index_zh-cn

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201122001900709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70#pic_center)

配置加速

```shell
# 1、替换brew.git
cd "$(brew --repo)"

git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git //清华
# 或
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git //中科大

# 2、替换homebrew-core.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"

git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git //中科大
# 或
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git //清华

# 3、替换homebrew-cask
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-cask"

git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

# 4、替换homebrew-bottles: 
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile 
# 或
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile source ~/.bash_profile 

# 5、应用生效
brew update -v
```

镜像复原

```shell
# 重置brew.git:
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git

# 重置homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

问题修复

```shell
# 诊断Homebrew的问题:
brew doctor

# 重置brew.git设置:
cd "$(brew --repo)"
git fetch
git reset --hard origin/master

# homebrew-core.git同理:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git fetch
git reset --hard origin/master

# 应用生效:
brew update
```