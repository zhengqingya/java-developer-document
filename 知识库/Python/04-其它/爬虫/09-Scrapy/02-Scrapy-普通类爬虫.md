# 基于Scrapy框架实现一个简单的爬虫

普通爬虫类 `scrapy.Spider` -- 适用于采集多个页面数据

#### 1、创建项目

```shell
scrapy startproject 项目名
# eg:
scrapy startproject scrapy_baidu
```

#### 2、`项目名\spiders` 目录下创建一个爬虫

```shell
scrapy genspider 爬虫名 网站地址
# eg:
scrapy genspider baidu https://www.baidu.com
```

#### 3、注释`settings.py`配置文件中的`ROBOTSTXT_OBEY = True`

#### 4、编写 `baidu.py`

```
import scrapy


class BaiduSpider(scrapy.Spider):
    name = "baidu"
    allowed_domains = ["http://www.baidu.com"]
    start_urls = ["http://www.baidu.com/"]

    def parse(self, response):
        print("xxxxxxxxxxxxxxxxxx: ", response.xpath("//*[@id='su']/@value").get())
        # 写入本地文件
        with open("baidu.html", "w", encoding="utf-8") as fp:
            fp.write(response.text)
```

#### 5、运行爬虫

```shell
# 查看文件夹下的爬虫
scrapy list

# 运行
scrapy crawl xxx
# eg:
scrapy crawl baidu
```

项目结构
![img.png](images/scrapy-baidu.png)

