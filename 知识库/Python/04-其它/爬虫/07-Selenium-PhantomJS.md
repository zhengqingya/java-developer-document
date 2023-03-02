# PhantomJS

- https://phantomjs.org
- https://github.com/ariya/phantomjs

无界面浏览器，效率高一点，Selenium的语法，它都能用。
因内部闹矛盾，PhantomJS 宣布封存归档暂停开发...

### 安装

1. 下载`phantomjs-2.1.1-windows.zip` https://phantomjs.org/download.html
2. 拿到`phantomjs-2.1.1-windows\bin\phantomjs.exe`
3. 新版本的selenium已经弃用了PhantomJS，如果想使用PhantomJS需要降低selenium版本
   `pip install selenium==2.48.0`

### 使用示例 `test.py`

```
import time
from selenium import webdriver

browser = webdriver.PhantomJS("./phantomjs.exe")

# 访问
browser.get("https://www.baidu.com")

# 搜索框中输入python
browser.find_element_by_id("kw").send_keys("python")
# 点击搜素按钮
browser.find_element_by_id("su").click()

time.sleep(1)

# 保存截图
browser.save_screenshot("baidu.png")
```