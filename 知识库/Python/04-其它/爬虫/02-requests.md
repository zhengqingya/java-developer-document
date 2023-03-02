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

### 代理

请求网站时通过代理去请求该网站

- [快代理](https://www.kuaidaili.com/free)

示例 `test.py`

```
import requests

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
}

# 代理 https://www.kuaidaili.com/free
proxies = {"http": "202.109.157.60:9000"}

# get请求
response = requests.get(url="https://www.baidu.com", headers=headers, proxies=proxies)
# 设置响应编码格式
response.encoding = "utf-8"

print("响应头：", response.headers)

# 写入本地文件
with open("baidu.html", "w", encoding="utf-8") as fp:
    fp.write(response.text)
```