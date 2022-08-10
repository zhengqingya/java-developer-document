# couchbase文档

### 一、前言

1. [Couchbase官网](https://www.couchbase.com/)
2. [Couchbase中文教程](https://xiaoxiami.gitbook.io/couchbase/chapter1)
3. [Couchbase-java-sdk](https://docs.couchbase.com/server/6.5/sdk/overview.html)

### 安装

> https://docs.couchbase.com/server/6.5/getting-started/do-a-quick-install.html

```shell script
git clone https://gitee.com/zhengqingya/docker-compose.git
cd docker-compose
docker-compose -f docker-compose-couchbase.yml -p couchbase up -d
```

运行成功日志信息如下：

```shell script
Starting Couchbase Server -- Web UI available at http://<ip>:8091
and logs available in /opt/couchbase/var/lib/couchbase/logs
Configuring Couchbase Server.  Please wait (~60 sec)...
Configuration completed!
Couchbase Admin UI: http://localhost:8091 
Login credentials: Administrator / password
```

管理平台地址：[`ip地址:8091`](http://127.0.0.1:8091/)
默认登录账号密码：`Administrator/password`

### api

#### CREATE PRIMARY INDEX

> https://docs.couchbase.com/server/6.5/n1ql/n1ql-language-reference/createprimaryindex.html

```
-- 新建Bucket -> zq
-- 添加Document ID ->  【   hello  :  {"click":"to edit","with JSON":"there are no reserved field names"}   】

-- 创建主键索引  【  CREATE PRIMARY INDEX 索引名 ON 桶;  】
CREATE PRIMARY INDEX test_index ON `zq`;

-- 查询桶
SELECT * FROM `zq`;

-- 查询document id
SELECT META(桶) AS meta FROM 桶;
ex :  SELECT META(zq_app) AS meta FROM zq_app;

-- 更新数据
UPDATE zq_app SET liveUrl = "//liveshare.huya.com/iframe/18524919"
WHERE tableName='MatchBaseInfo' AND lotNumber='01' AND status=1 AND source='zq_app' AND thirdId = "61224"
```

---

### test

CREATE PRIMARY INDEX `test-index` ON test;