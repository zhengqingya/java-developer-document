# 获取csdn文章数据

### 1、环境搭建

```shell
# 创建项目
scrapy startproject scrapy_csdn
cd scrapy_csdn
# 创建爬虫
scrapy genspider csdn https://zhengqing.blog.csdn.net
```

### 2、注释`settings.py`配置文件中的`ROBOTSTXT_OBEY = True`

### 3、`spiders\csdn.py`

```
import scrapy


class CsdnSpider(scrapy.Spider):
    name = "csdn"
    allowed_domains = ["zhengqing.blog.csdn.net"]
    start_urls = ["https://zhengqing.blog.csdn.net/article/list/1"]

    page = 1

    def parse(self, response):
        list = response.xpath(
            "//div[@class='article-item-box csdn-tracking-statistics']"
        )
        for item in list:
            title = item.xpath("./h4/a//text()")[2].get().strip()
            url = item.xpath("./h4/a//@href").get()
            print(title, url)

        print(f"第{self.page}页 数据解析完成...")

        if self.page < 3:
            self.page += 1
            print(f"第{self.page}页")
            url = "https://zhengqing.blog.csdn.net/article/list/" + str(self.page)
            # 下一页继续
            yield scrapy.Request(
                url,
                callback=self.parse,
            )
```

### 4、运行 `main.py`

和`scrapy.cfg`同级

```shell
from scrapy import cmdline

cmdline.execute("scrapy crawl csdn".split())
```
