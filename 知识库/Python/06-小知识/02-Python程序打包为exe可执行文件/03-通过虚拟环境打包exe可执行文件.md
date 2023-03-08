# 通过虚拟环境打包exe可执行文件

```shell
# 将当前项目需要的环境输出 -- 提供给虚拟环境使用
pipreqs . --encoding=utf8 --force

# 创建一个虚拟环境
conda create -n my_exe python=3.10.6
# 进入
conda activate my_exe
# 查看环境中的包
conda list
# 一键安装依赖
pip install -r requirements.txt

# 打包
pyinstaller -F -w -i favicon.ico -n csdn csdn.py

# 退出当前环境
conda deactivate
# 删除虚拟环境
conda remove -n my_exe --all
```
