# python项目中`requirements.txt`

### 整个环境

```shell
# 将python整个环境中的包导出到requirements.txt(记录环境里面的依赖包和精确地版本号) -- 方便提供给新的环境使用
pip freeze > requirements.txt

# 一键安装依赖
pip install -r requirements.txt
```

### 只导出项目环境

```shell
pip install pipreqs
# 使用pipreqs导出到requirements.txt
pipreqs . --encoding=utf8 --force
```
