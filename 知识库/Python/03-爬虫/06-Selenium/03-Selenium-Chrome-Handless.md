# Chrome Headless

Chrome Headless 模式， Google 针对 Chrome 浏览器 59版 新增加的一种模式，可以在不打开UI界面的情况下使用Chrome浏览器。
无界面浏览器。效率高，Selenium的语法，它都能用。

### 环境要求

- Chrome
- Unix\Linux 系统需要 chrome >= 59
- Windows 系统需要 chrome >= 60
- Python3.6
- Selenium==3.4.*
- ChromeDriver==2.31

### 示例`test.py`

```
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# 封装handless
def share_browser():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    # TODO 自己的驱动位置
    service = Service("./chromedriver.exe")
    browser = webdriver.Chrome(options=chrome_options, service=service)
    return browser


# 使用
browser = share_browser()
browser.get("https://www.baidu.com")
browser.save_screenshot("baidu.png")
```
