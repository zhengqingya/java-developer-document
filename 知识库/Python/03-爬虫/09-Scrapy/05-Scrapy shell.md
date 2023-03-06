# Scrapy shell

https://docs.scrapy.org/en/latest/topics/shell.html

方便调试的互动窗口，不用运行爬虫。

> scrapy爬虫程序无法直接在Pycharm中debug调试，所以可以用这个调试...
> 但是也可以配置Pycharm去debug

```shell
# 安装ipython -- 语法高亮，语法提示等
pip install ipython

# 调试
scrapy shell <url>
# eg:
scrapy shell www.baidu.com
# 拿到“百度一下”的值
response.xpath("//*[@id='su']//@value").extract_first()
```

![img.png](images/scrapy-shell.png)
