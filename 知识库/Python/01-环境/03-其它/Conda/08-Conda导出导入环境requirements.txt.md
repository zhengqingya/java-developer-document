# Conda导出导入环境`requirements.txt`

```shell
# 导出环境到 requirements.txt
conda list -e > requirements.txt

# 一键导入安装环境
conda install --yes --file requirements.txt
```
