# 将数据存入MySQL

### 1、修改`settings.py`配置文件

DB数据库参数 & 新增一个MySQL管道

```
DB_HOST = "172.16.16.244"  # 本机ip
BD_PORT = 3306  # 端口号
DB_USER = "root"  # 数据库用户名
DB_PASSWORD = "root"  # 数据库密码
DB_NAME = "demo"  # 数据库名称
DB_CHARSET = "utf8"  # 类型


ITEM_PIPELINES = {
    "scrapy_dushu.pipelines.ScrapyDushuPipeline": 300,
    "scrapy_dushu.pipelines.MySQLPipeline": 301,
}
```

### 2、编写`pipelines.py`

```
from itemadapter import ItemAdapter


class ScrapyDushuPipeline:
    def open_spider(self, spider):
        print("====================== ↓↓↓↓↓↓ 本地 ↓↓↓↓↓↓ ======================")
        # 打开文件
        self.fp = open("book.txt", "w", encoding="utf-8")

    def process_item(self, item, spider):
        # 持久化 -- 写入数据
        self.fp.write(str(item))
        return item

    def close_spider(self, spider):
        # 关闭文件
        self.fp.close()
        print("====================== ↑↑↑↑↑↑ 本地 ↑↑↑↑↑↑ ======================")


import pymysql
from scrapy.utils.project import get_project_settings  # 引用settings文件中数据库参数


class MySQLPipeline:
    def open_spider(self, spider):
        print("====================== ↓↓↓↓↓↓ MySQL ↓↓↓↓↓↓ ======================")
        # 引用数据库参数加以调用
        settings = get_project_settings()
        self.host = settings["DB_HOST"]
        self.port = settings["BD_PORT"]
        self.user = settings["DB_USER"]
        self.password = settings["DB_PASSWORD"]
        self.name = settings["DB_NAME"]
        self.charset = settings["DB_CHARSET"]
        # 连接数据库
        self.connect()

    def connect(self):
        self.coon = pymysql.connect(
            host=self.host,
            port=self.port,
            user=self.user,
            password=self.password,
            db=self.name,
            charset=self.charset,
        )
        self.cursor = self.coon.cursor()

    def process_item(self, item, spider):
        # 持久化 -- 写入数据
        sql = 'insert into t_book(name,img) values("{}","{}")'.format(
            item["name"], item["img"]
        )
        self.cursor.execute(sql)
        self.coon.commit()
        return item

    def close_spider(self, spider):
        # 关闭连接
        self.cursor.close()
        self.coon.close()
        print("====================== ↑↑↑↑↑↑ MySQL ↑↑↑↑↑↑ ======================")
```
