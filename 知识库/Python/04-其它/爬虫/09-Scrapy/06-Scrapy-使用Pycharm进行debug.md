# 在Pycharm中debug调试Scrapy

和`scrapy.cfg`文件同级新增文件`main.py`

```
from scrapy import cmdline

cmdline.execute("scrapy crawl 爬虫名".split())
```

右击运行`main.py`进行debug调试

![img.png](images/pycharm-debug-scrapy.png)
