# MySQL数据同步

```shell
# 查看mysql同步模板
python datax.py -r mysqlreader -w mysqlwriter
# https://github.com/alibaba/DataX/blob/master/mysqlreader/doc/mysqlreader.md
# https://github.com/alibaba/DataX/blob/master/mysqlwriter/doc/mysqlwriter.md
```

```shell
{
    "job": {
        "content": [
            {
                "reader": {
                    "name": "mysqlreader",							# 读取端
                    "parameter": {
                        "column": [], 								# 需要同步的列 (* 表示所有的列)
                        "connection": [
                            {
                                "jdbcUrl": [], 						# 连接信息
                                "table": []							# 连接表
                            }
                        ], 
                        "password": "", 							# 连接用户
                        "username": "", 							# 连接密码
                        "where": ""									# 描述筛选条件
                    }
                }, 
                "writer": {
                    "name": "mysqlwriter",							# 写入端
                    "parameter": {
                        "column": [], 								# 需要同步的列
                        "connection": [
                            {
                                "jdbcUrl": "", 						# 连接信息
                                "table": []							# 连接表
                            }
                        ], 
                        "password": "", 							# 连接密码
                        "preSql": [], 								# 同步前. 要做的事
                        "session": [], 
                        "username": "",								# 连接用户 
                        "writeMode": ""								# 操作类型
                    }
                }
            }
        ], 
        "setting": {
            "speed": {
                "channel": ""										# 指定并发数
            }
        }
    }
}
```

### 一、全量同步

> 当数据量较大时，同步的时候被中断会是一件很痛苦的事情...

[`mysql-full.json`](json/mysql-full.json)

```json
{
  "job": {
    "content": [
      {
        "reader": {
          "name": "mysqlreader",
          "parameter": {
            "username": "root",
            "password": "root",
            "column": [
              "*"
            ],
            "splitPk": "id",
            "connection": [
              {
                "jdbcUrl": [
                  "jdbc:mysql://127.0.0.1:3306/demo?allowMultiQueries=true&useUnicode=true&characterEncoding=UTF8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true"
                ],
                "table": [
                  "t_test"
                ]
              }
            ]
          }
        },
        "writer": {
          "name": "mysqlwriter",
          "parameter": {
            "column": [
              "*"
            ],
            "connection": [
              {
                "jdbcUrl": "jdbc:mysql://127.0.0.1:3306/demo-bak?allowMultiQueries=true&useUnicode=true&characterEncoding=UTF8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true",
                "table": [
                  "t_test"
                ]
              }
            ],
            "username": "root",
            "password": "root",
            "session": [],
            "preSql": [
              "truncate t_test"
            ],
            "writeMode": "insert"
          }
        }
      }
    ],
    "setting": {
      "speed": {
        "channel": "5"
      }
    }
  }
}
```

运行测试

```shell
python datax.py mysql.json
```

这时候可以去看看`demo-bak`库中的表数据是否同步成功。

### 二、增量同步

使用 DataX 进行全量同步和增量同步的区别：增量同步需要使用 where 进行条件筛选。

> ex: `"where": "id >= 5",`  ->  增量同步id>=5的数据
> 写入的时候`preSql`前置执行sql为空，不进行任何处理

[`mysql-incre.json`](json/mysql-incre.json)

```json
{
  "job": {
    "content": [
      {
        "reader": {
          "name": "mysqlreader",
          "parameter": {
            "username": "root",
            "password": "root",
            "column": [
              "*"
            ],
            "splitPk": "id",
            "where": "id >= 5",
            "connection": [
              {
                "jdbcUrl": [
                  "jdbc:mysql://127.0.0.1:3306/demo?allowMultiQueries=true&useUnicode=true&characterEncoding=UTF8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true"
                ],
                "table": [
                  "t_test"
                ]
              }
            ]
          }
        },
        "writer": {
          "name": "mysqlwriter",
          "parameter": {
            "column": [
              "*"
            ],
            "connection": [
              {
                "jdbcUrl": "jdbc:mysql://127.0.0.1:3306/demo-bak?allowMultiQueries=true&useUnicode=true&characterEncoding=UTF8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true",
                "table": [
                  "t_test"
                ]
              }
            ],
            "username": "root",
            "password": "root",
            "session": [],
            "preSql": [],
            "writeMode": "insert"
          }
        }
      }
    ],
    "setting": {
      "speed": {
        "channel": "5"
      }
    }
  }
}
```