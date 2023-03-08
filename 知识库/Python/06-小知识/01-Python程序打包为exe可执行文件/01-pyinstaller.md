# Python程序打包为exe可执行文件 - `pyinstaller`

### 一、测试程序

`app.py`

```
import time

print("HelloWorld")
question = input("请输入你的问题：")
print("\n结果：", question)
time.sleep(5)
```

### 二、安装

```shell
pip install pyinstaller
```

### 三、打包

```shell
# 编译可执行文件 -- 多文件（生成的dist文件夹下，有一个文件夹里面有很多文件）
pyinstaller -D app.py

# 编译可执行文件 -- 单文件（生成的dist文件夹下，只有一个可执行的exe文件）
pyinstaller -F app.py

# -F：指定打包后只生成一个exe格式的文件
# -w：隐藏控制台窗口 （GUI程序的话可以加上这个参数）
# -i：指定应用程序图标
# -n：程序名
# pyinstaller -F -w -i favicon.ico -n 第一个应用程序 app.py
pyinstaller -F -i favicon.ico -n 第一个应用程序 app.py
```

---

报错：

```shell
The 'pathlib' package is an obsolete backport of a standard library package and is incompatible with PyInstaller. Please remove this package (located in D:\zhengqingya\soft\soft-dev\Python\anaconda3\lib\site-packages) using
    conda remove
then try again.
```

解决：

```shell
pip uninstall pathlib
```

再次打包后生成的文件目录
![img.png](images/pyinstaller-exe.png)

- `xx.spec`：打包配置文件，可使用 `pyinstaller xx.spec` 命令重复执行打包任务
- `dist`：结果
- `build`：编译，工作空间，可直接删除

