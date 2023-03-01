# pip指定默认下载源

默认的pip下载包的时候会很慢，因此需要配置下国内的源进行下载，提高下载速度。

### 法一、命令行

#### 临时

```shell
# 通过`-i`使用清华源进行下载
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple 包名称
```

#### 永久

```shell
# 清华源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
# Writing to C:\Users\zhengqingya\AppData\Roaming\pip\pip.ini
# 会生成一个默认的配置文件
```

![img.png](images/pip-ini.png)

---

### 法二、配置文件

#### Windows环境

修改配置文件 `C:\Users\zhengqingya\AppData\Roaming\pip\pip.ini`

```shell
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = mirrors.aliyun.com
```
