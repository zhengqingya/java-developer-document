# BeautifulSoup

解析html

> tips: 效率没有`lxml`好

### 安装

```shell
pip install bs4
```

### 示例 `test.py`

```
from bs4 import BeautifulSoup
import requests

url = "https://zhengqing.blog.csdn.net"
res = requests.get(url)
data = res.text

soup = BeautifulSoup(data, "lxml")
author = soup.select("div[class='user-profile-head-name-vip']")[0].get_text()
print(author)
```
