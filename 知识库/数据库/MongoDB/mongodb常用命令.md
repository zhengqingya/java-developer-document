

```
# 查询数据总数
db.getCollection("库名").count()
# ex: db.getCollection("order").count()

# 删除指定时间之前的数据（createTime为字符串时间）
db.库名.remove({"createTime":{$lte:"2021-09-28 00:00:00"}})
# ex: db.order.remove({"createTime":{$lte:"2021-09-28 00:00:00"}})
# 响应结果： WriteResult({ "nRemoved" : 130834, "writeConcernError" : [ ] })
```


```shell
# 导出数据    mongoexport --help
# -h 数据库地址，MongoDB 服务器所在的 IP 与 端口，如 127.0.0.1:27017
# -d 指明使用的数据库实例，如 test-db
# -c 指明要导出的集合，如 order_20211104
# -o 指明要导出的文件名，如 ./order.json  注意是文件而不是目录，目录不存在时会一同新建
mongoexport -h 127.0.0.1:27017 -d test-db -c order_20211104 -u admin -p=123456 -o ./order.json --authenticationDatabase admin

# 导入数据
mongoimport -h 127.0.0.1:27017 -d test-db -c order_20211104 -u admin -p=123456 ./order.json --authenticationDatabase admin
```
