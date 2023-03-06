# xpath

解析html

### 安装lxml

```shell
pip install lxml
```

### 示例 `test.py`

```
from lxml import etree
import requests

url = "https://zhengqing.blog.csdn.net"
res = requests.get(url)
data = res.text
html = etree.HTML(data)

author = html.xpath("//div[@class='user-profile-head-name-vip']//text()")
pv = html.xpath("//div[@class='user-profile-statistics-num']//text()")[0]

print("作者：", author)
print("访问量：", pv)
```
