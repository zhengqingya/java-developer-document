### 安装

下载解压 https://groovy.apache.org/download.html

![groovy-download.png](images/groovy-download.png)

![groovy-download-2.png](images/groovy-download-2.png)

### 配置环境变量

> `此电脑` -> `属性` -> `高级系统设置` -> `环境变量`

```
# 新建系统环境变量
GROOVY_HOME -> D:\zhengqingya\soft\soft-dev\Groovy\groovy-4.0.4

# 编辑PATH环境变量，新增
%GROOVY_HOME%\bin
```

验证

```
# win+r 输入 cmd 进入命令行
groovy -v
```

![groovy-v.png](images/groovy-v.png)