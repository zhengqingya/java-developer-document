# Conda命令

```shell
# 查看有哪些环境
conda env list

# 创建一个新环境
conda create -n my_env_name

# 进入某一个环境
conda activate my_env_name

# 查看环境中的包
conda list

# 安装包 
conda install xxx

# 删除某个包
conda remove xxx

# 退出当前环境
conda deactivate

# 复制某个虚拟环境
conda  create  --name  new_env_name  --clone  old_env_name

# 删除虚拟环境
conda remove -n my_env_name --all
```
