# requests

- https://github.com/psf/requests
- https://requests.readthedocs.io/projects/cn/zh_CN/latest

一个简单而优雅的 HTTP 库。

### 安装

```shell
pip install requests
```

### 示例 `test.py`

```
import requests

# get请求
response = requests.get("https://www.baidu.com")
# 设置响应编码格式
response.encoding = "utf-8"

print("网页源码：", response.text)
print("响应头：", response.headers)
```

