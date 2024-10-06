# Selenium自动化测试之键盘、鼠标操作

### 一、鼠标操作

模拟用户在页面上用鼠标进行的操作

#### 导包方法

```
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver import ActionChains
```

#### 使用语法

使用`ActionChains`需要在鼠标操作后，使用`.perform()`提交鼠标操作

链式编程

```
ActionChains("驱动").context_click("页面元素").鼠标其他操作("页面元素").xxx().perform()
```

分布式编程

```
ac = ActionChains("驱动")
ac.鼠标操作1("页面元素")
ac.鼠标操作2("页面元素")
ac.鼠标操作3("页面元素")
ac.perform()
```

#### 鼠标常用操作

```
#鼠标左键单击：
click(on_element=None)
#模拟鼠标单击且按住不放：
click_and_hold(on_element=None)
#模拟鼠标双击：
double_click(on_element=None)
#模拟鼠标右击：
context_click(on_element=None)
#   说明：对于点击鼠标右键，如果弹出的是浏览器默认的菜单，Selenium没有提供操作菜单选项的方法；
#      如果是自定义的右键菜单，则可以通过元素定位来操作菜单中的选项。
#模拟鼠标拖拽：
drag_and_drop(source,target)
#   说明：模拟鼠标拖动动作，选定拖动源元素释放到目标元素后鼠标松开。
#        源元素：
source = driver.find_element_by_id(xxx)
#       目标元素 ：
target = driver.find_element_by_id(xxx)
#       调用方法 ：
action.drag_and_drop(source, target).perform()
#模拟将鼠标拖拽到目标位置：
drag_and_drop(source,xoffset,yoffset)
#按住某个键，实现快捷键操作：
key_down(value,on_element=None)
#松开某个键：
key_up(value,on_element=None)
#模拟鼠标移到指定元素：
move_to_element(to_element)
#移动鼠标到某个坐标：
move_to_element_with_offset(to_element,xoffset,yoffset)
#执行鼠标操作：
perform()
#释放按下的鼠标：
release(on_element=None)
```

### 二、键盘操作

 模拟用户在键盘上的操作：输入文本、使用热键（快捷键）、操作滚动条

#### 导包方法

```
from selenium.webdriver.common.keys import Keys
```

#### 使用语法

通过定位页面元素，调用send_keys()方法
```
driver.find_element(By.ID,"id1").send_keys('第一条测试数据')
driver.find_element(By.ID,'taskId').send_keys(10,Keys.TAB,888888,Keys.TAB,888888,Keys.TAB,Keys.TAB,Keys.ENTER)
```

通过 把浏览器的驱动作为一个对象，实例化`ActionChains` 类，调用send_keys()方法

需要导入`Keys`包和`ActionChains`包

```
ActionChains(driver).send_keys(Keys.ARROW_DOWN,Keys.ARROW_DOWN).perform()
```

#### 键盘常用操作

send_keys() 方法用来模拟键盘输入；keys() 类提供了键盘上几乎所有按键的方法，组合键也是可以的

```
Keys.BACK_SPACE：回退键（BackSpace）
Keys.TAB：制表键（Tab）
Keys.ENTER：回车键（Enter）
Keys.SHIFT：大小写转换键（Shift）
Keys.CONTROL：Control键（Ctrl）
Keys.ALT：ALT键（Alt）
Keys.ESCAPE：返回键（Esc）
Keys.SPACE：空格键（Space）
Keys.PAGE_UP：翻页键上（Page Up）
Keys.PAGE_DOWN：翻页键下（Page Down）
Keys.END：行尾键（End）
Keys.HOME：行首键（Home）
Keys.ARROW_LEFT：方向键左（Left）
Keys.ARROW_UP：方向键上（Up）
Keys.ARROW_RIGHT：方向键右（Right）
Keys.ARROW_DOWN：方向键下（Down）
Keys.INSERT：插入键（Insert）
DELETE：删除键（Delete）
NUMPAD0 ~ NUMPAD9：数字键1-9
F1 ~ F12：F1 - F12键
(Keys.CONTROL, ‘a’)：组合键Control+a，全选
(Keys.CONTROL, ‘c’)：组合键Control+c，复制
(Keys.CONTROL, ‘x’)：组合键Control+x，剪切
(Keys.CONTROL, ‘v’)：组合键Control+v，粘贴
```

