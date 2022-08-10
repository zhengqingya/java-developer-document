# DataX

# 环境准备

```shell script
# DataX: http://datax-opensource.oss-cn-hangzhou.aliyuncs.com/datax.tar.gz
# DataX-Web: https://gitee.com/mirrors/DataX-Web

# datax默认python2环境下执行datax.py  
# python3 需替换 `datax\bin`下3个文件 -> 这3个文件地址目录参考`datax-web\datax-python3`
```

## 本地运行测试

```shell script
# 启动datax ===================================
cd datax/bin
# python3环境
python datax.py ../job/job.json

# Datax执行命令后出现中文乱码问题
CHCP 65001

# 启动datax-web ===================================
1. datax-admin
2. datax-executor
```
