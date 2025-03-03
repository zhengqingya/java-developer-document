# Pycharm中使用Conda环境

![](./images/06-Pycharm中使用Conda环境_1727888755130.png)
![](./images/06-Pycharm中使用Conda环境_1727891133313.png)

---

> 用上面的方式即可，下面的不用看了...

### 配置

![](images/pycharm-conda-config-01.png)

或

![](images/pycharm-conda-config-02.png)

可以选择conda创建的虚拟环境
eg: `D:\zhengqingya\soft\soft-dev\Python\anaconda3\envs\my_csdn_exe\python.exe`
![](images/pycharm-conda-config-03.png)

选择conda环境后，如果没有自动刷新包依赖，可以手动刷新下
![](./images/06-Pycharm中使用Conda环境-1736818583423.png)

### 测试

```
import sys

print(sys.version)
```

![](images/pycharm-conda-config-04.png)
