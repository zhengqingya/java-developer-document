# Linux安装Conda

### 一、安装

```shell
wget https://repo.anaconda.com/archive/Anaconda3-2022.10-Linux-x86_64.sh
# 安装 （一路回车，直到要求输入yes）
bash Anaconda3-2022.10-Linux-x86_64.sh
```

### 二、配置环境变量

```shell
cat>> /etc/profile <<EOF

############################## ↓↓↓↓↓↓ set conda environment ↓↓↓↓↓↓ #############################
export PATH=~/anaconda3/bin:\$PATH
################################################################################################

EOF

# 使配置生效
source /etc/profile
```

验证

```shell
conda -V
# conda 22.9.0
```

### 三、配置镜像源

参考 https://mirrors.tuna.tsinghua.edu.cn/help/anaconda

```shell
cat> ~/.condarc <<EOF
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
# 包安装跳过【y/n】
always_yes: true

EOF
```

### 四、配置pip

```shell
mkdir ~/.pip
cat> ~/.pip/pip.conf <<EOF
[global]
timeout=40
index-url=https://pypi.tuna.tsinghua.edu.cn/simple/
extra-index-url=
        http://mirrors.aliyun.com/pypi/simple/
        http://pypi.douban.com/simple
        http://pypi.mirrors.ustc.edu.cn/simple/

[install]
trusted-host=
        pypi.tuna.tsinghua.edu.cn
        mirrors.aliyun.com
        pypi.douban.com
        pypi.mirrors.ustc.edu.cn

EOF
```

### 五、常用命令

```shell
# 创建虚拟环境
conda create -n my_env_test python==3.7

# 激活环境
conda activate my_env_test

# 退出环境
conda deactivate

# 查看虚拟环境
conda info --envs

# 删除虚拟环境
conda remove -n my_env_test --all
```
