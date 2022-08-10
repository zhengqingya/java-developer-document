### 下载安装JMeter

下载 [https://jmeter.apache.org/download_jmeter.cgi](https://jmeter.apache.org/download_jmeter.cgi)
![jmeter-download](images/jmeter-download.png)

运行

```shell
cd apache-jmeter-5.4.3/bin
sh jmeter
```

![jmeter-sh](images/jmeter-sh.png)

### jmeter - 配置环境变量 => 快捷启动

```shell
# 配置环境变量
open ~/.bash_profile


############################## ↓↓↓↓↓↓ set jmeter environment ↓↓↓↓↓↓ #############################
JMETER_HOME=/zhengqingya/soft/soft-dev/apache-jmeter-5.4.3
CLASSPATH=.:$JMETER_HOME/lib/ext/ApacheJMeter_core.jar:$JMETER_HOME/lib/jorphan.jar
PATH=$PATH:$JMETER_HOME/bin
export JMETER_HOME CLASSPATH PATH
###############################################################################################


# 使配置生效
source ~/.bash_profile

# 验证 => 在任意地方执行jmeter即可运行程序
jmeter
```

![jmeter-sh-2](images/jmeter-sh-2.png)

