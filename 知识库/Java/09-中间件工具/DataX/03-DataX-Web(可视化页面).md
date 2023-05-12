# DataX-Web

https://github.com/WeiYe-Jing/datax-web

DataX 可视化页面

### 启动项目

#### 1、导入数据库

bin/db/datax_web.sql

#### 2、修改配置

> tips: github提供的文档不是那么友好，看着配置文件自行将改修改的地方修改下就可以跑了...

1. datax-admin/src/main/resources/application.yml
2. datax-executor/src/main/resources/application.yml

#### 3、启动

1. datax-admin
2. datax-executor

#### 4、访问

http://127.0.0.1:8080/index.html
默认管理员用户名：admin 密码：123456

---

tips: 2023-02-16 经过测试已无法正常同步数据

会报错

```shell
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 经DataX智能分析,该任务最可能的错误原因是:
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] com.alibaba.datax.common.exception.DataXException: Code:[Framework-03], Description:[DataX引擎配置错误，该问题通常是由于DataX安装错误引起，请联系您的运维解决 .].  - 在有总bps限速条件下，单个channel的bps值不能为空，也不能为非正数
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 	at com.alibaba.datax.common.exception.DataXException.asDataXException(DataXException.java:30)
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 	at com.alibaba.datax.core.job.JobContainer.adjustChannelNumber(JobContainer.java:430)
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 	at com.alibaba.datax.core.job.JobContainer.split(JobContainer.java:387)
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 	at com.alibaba.datax.core.job.JobContainer.start(JobContainer.java:117)
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 	at com.alibaba.datax.core.Engine.start(Engine.java:93)
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 	at com.alibaba.datax.core.Engine.entry(Engine.java:175)
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 	at com.alibaba.datax.core.Engine.main(Engine.java:208)
2023-02-16 16:26:28 [AnalysisStatistics.analysisStatisticsLog-53] 
2023-02-16 16:26:29 [JobThread.run-165] <br>----------- datax-web job execute end(finish) -----------<br>----------- ReturnT:ReturnT [code=500, msg=command exit value(1) is failed, content=null]
2023-02-16 16:26:29 [TriggerCallbackThread.callbackLog-186] <br>----------- datax-web job callback finish.
```

就算能成功，感觉这个也不是那么强

总结下：

1. 通过页面配置点点点的方式构建出`DataX`需要执行同步的`xx.json`配置
2. 通过定时任务或手动执行的方式调用指定位置的`datax.py`来执行数据同步

自己有时间也可以搞一个，很简单，没啥难度...
