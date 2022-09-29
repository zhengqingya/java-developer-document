> 温馨小提示：本文基于jdk8环境

### 错误日志如下：

> 网上说：这是由于jdk安全性机制而导致访问https会报错

```java
javax.net.ssl.SSLHandshakeException: Received fatal alert: handshake_failure
	at sun.security.ssl.Alerts.getSSLException(Alerts.java:192)
	at sun.security.ssl.Alerts.getSSLException(Alerts.java:154)
	at sun.security.ssl.SSLSocketImpl.recvAlert(SSLSocketImpl.java:2023)
	at sun.security.ssl.SSLSocketImpl.readRecord(SSLSocketImpl.java:1125)
	at sun.security.ssl.SSLSocketImpl.performInitialHandshake(SSLSocketImpl.java:1375)
	at sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1403)
	at sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1387)
	at org.apache.http.conn.ssl.SSLConnectionSocketFactory.createLayeredSocket(SSLConnectionSocketFactory.java:436)
	at org.apache.http.conn.ssl.SSLConnectionSocketFactory.connectSocket(SSLConnectionSocketFactory.java:384)
	at org.apache.http.impl.conn.DefaultHttpClientConnectionOperator.connect(DefaultHttpClientConnectionOperator.java:142)
	at org.apache.http.impl.conn.PoolingHttpClientConnectionManager.connect(PoolingHttpClientConnectionManager.java:376)
	at org.apache.http.impl.execchain.MainClientExec.establishRoute(MainClientExec.java:393)
	at org.apache.http.impl.execchain.MainClientExec.execute(MainClientExec.java:236)
	at org.apache.http.impl.execchain.ProtocolExec.execute(ProtocolExec.java:186)
	at org.apache.http.impl.execchain.RetryExec.execute(RetryExec.java:89)
	at org.apache.http.impl.execchain.RedirectExec.execute(RedirectExec.java:110)
	at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:185)
	at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:83)
	at us.codecraft.webmagic.downloader.HttpClientDownloader.download(HttpClientDownloader.java:85)
	at us.codecraft.webmagic.Spider.processRequest(Spider.java:404)
	at us.codecraft.webmagic.Spider.access$000(Spider.java:61)
	at us.codecraft.webmagic.Spider$1.run(Spider.java:320)
	at us.codecraft.webmagic.thread.CountableThreadPool$1.run(CountableThreadPool.java:74)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
	at java.lang.Thread.run(Thread.java:745)
```

### 解决

1. 下载jar包：[https://www.oracle.com/java/technologies/javase-jce8-downloads.html](https://www.oracle.com/java/technologies/javase-jce8-downloads.html)
    > 温馨小提示：也可以到 [https://gitee.com/zhengqingya/java-developer-document](https://gitee.com/zhengqingya/java-developer-document) 中下载
    
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020110114353982.png#pic_center)


2. 替换jdk里默认的jar包即可，位置在`jdk1.8.0_111\jre\lib\security`目录下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201101143501811.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70#pic_center)

