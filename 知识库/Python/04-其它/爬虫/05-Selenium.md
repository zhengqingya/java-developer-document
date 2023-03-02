# Selenium

https://www.selenium.dev

直接运行在浏览器中，就像真正的用户在操作一样。
自动化测试工具。

### 安装

1. 查看谷歌浏览器版本 `右上角三个点` -> `帮助` -> `关于 Google Chrome`
2. 根据自己的浏览器版本(版本前面的数值即可)下载对应驱动 https://chromedriver.chromium.org/downloads
   ( 我这里使用的版本 https://chromedriver.storage.googleapis.com/index.html?path=109.0.5414.74/ )
3. `pip install selenium==4.8.2`

### 入门示例 `test.py`

打开百度搜索zhengqingya，下一页，滑动到底部，来回切换上一页，退出。

```
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

# 定义chrome驱动地址
path = Service("./chromedriver.exe")

# 打开谷歌浏览器
# 设置option -> 解决版本4自动关闭浏览器问题
option = webdriver.ChromeOptions()
option.add_experimental_option("detach", True)
browser = webdriver.Chrome(service=path, options=option)

# 访问
browser.get("https://www.baidu.com")

# 搜索框中输入zhengqingya
browser.find_element(By.ID, "kw").send_keys("zhengqingya")
# 点击搜素按钮
browser.find_element(By.ID, "su").click()

# 睡1秒
time.sleep(1)

# 滑到底部
js_bottom = "document.documentElement.scrollTop = 100000"
browser.execute_script(js_bottom)

# 找到下一页按钮
nextButton = browser.find_element(By.XPATH, '//a[@class="n"]')
# 点击下一页
nextButton.click()

time.sleep(1)

# 滑到底部
browser.execute_script(js_bottom)

time.sleep(1)

# 回到上一页（浏览器上的方向键 左）
browser.back()
# 回到上一页（浏览器上的方向键 右）
browser.forward()

# 退出
# browser.quit()
```
