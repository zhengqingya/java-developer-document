# Conda命令

```shell
# 查看有哪些环境
conda env list

# 创建一个新环境
conda create -n my_env_name

# 进入某一个环境
conda activate my_env_name
# 或
activate my_env_name

# 查看环境中的包
conda list

# 搜索包
conda search pandas
# 查看某个范围内的版本包 -- eg: # 搜索版本处于1.0.0及1.1之间的pandas
conda search "pandas [version='>=1.0.0,<1.1']"

# 安装包 
conda install xxx
# 指定镜像源安装包
conda install -c https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/ 包名

# 删除某个包
conda remove xxx

# 退出当前环境
conda deactivate

# 复制某个虚拟环境
conda  create  --name  new_env_name  --clone  old_env_name

# 删除虚拟环境
conda remove -n my_env_name --all
```

eg: 创建一个python=3.10.6的虚拟环境

```shell
conda create -n python3.10.6
activate python3.10.6
conda install selenium
conda list
```

---

tips: 虚拟环境中安装的软件包在

- windows：`D:\zhengqingya\soft\soft-dev\Python\anaconda3\envs\虚拟环境\Lib\site-packages`
- linux：`/root/anaconda3/envs/虚拟环境/lib/python3.8/site-packages`
