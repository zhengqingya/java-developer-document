# CrawlSpider

基于crawl的规则性爬虫类 `scrapy.spider.crawlspider` -- 适用于采集同一个页面数据

#### 1、创建项目

```shell
scrapy startproject scrapy_dushu
```

#### 2、`项目名\spiders` 目录下创建一个爬虫

```shell
scrapy genspider -t crawl 爬虫名 url地址
# eg:
scrapy genspider -t crawl dushu 'www.dushu.com'
```

#### 3、修改`settings.py`配置文件

1. 注释`ROBOTSTXT_OBEY = True`
2. 放开`ITEM_PIPELINES`

#### 4、`dushu.py`

```
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from scrapy_dushu.items import ScrapyDushuItem


class DushuSpider(CrawlSpider):
    name = "dushu"
    allowed_domains = ["www.dushu.com"]
    start_urls = ["https://www.dushu.com/book/1107_1.html"]

    # 规则解析器
    rules = (
        Rule(
            # 链接提取器
            #        LinkExtractor(
            #            allow=r'Items/',      # 满足括号中“正则表达式”的值会被提取，如果为空，则全部匹配。
            #            deny=xxx,             # 满足正则表达式的则不会被提取。
            #            restrict_xpaths=xxx,  # 满足xpath表达式的值会被提取
            #            restrict_css=xxx,     # 满足css表达式的值会被提取
            #            deny_domains=xxx,     # 不会被提取的链接的domains。
            #        )
            LinkExtractor(allow=r"/book/1107_\d+\.html"),
            callback="parse_item",
            follow=True,
        ),
    )

    # 数据提取
    def parse_item(self, response):
        list = response.xpath("//div[@class='bookslist']//img")

        for item in list:
            name = item.xpath("./@alt").extract_first()
            img = item.xpath("./@data-original").extract_first()
            # print(name, img)
            book = ScrapyDushuItem(name=name, img=img)
            yield book
```

#### 5、`items.py`

```
import scrapy


class ScrapyDushuItem(scrapy.Item):
    name = scrapy.Field()
    img = scrapy.Field()
```

#### 6、`pipelines.py`

```
from itemadapter import ItemAdapter


class ScrapyDushuPipeline:
    def open_spider(self, spider):
        # 打开文件
        self.fp = open("book.txt", "w", encoding="utf-8")

    def process_item(self, item, spider):
        # 持久化 -- 写入数据
        self.fp.write(str(item))
        return item

    def close_spider(self, spider):
        # 关闭文件
        self.fp.close()
```

#### 7、运行爬虫

```shell
scrapy crawl dushu
```


