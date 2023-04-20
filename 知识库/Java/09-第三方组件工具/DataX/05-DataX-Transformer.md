# Transformer

https://github.com/alibaba/DataX/blob/master/transformer/doc/transformer.md

数据转换

### `dx_replace`

参数：

- 第一个参数：字段编号，对应record中第几个字段。
- 第二个参数：字段值的开始位置。
- 第三个参数：需要替换的字段长度。
- 第四个参数：需要替换的字符串。

返回： 从字符串的指定位置（包含）替换指定长度的字符串。如果开始位置非法抛出异常。如果字段为空值，直接返回（即不参与本transformer）

举例：

```
dx_replace(1,"2","4","****")  column 1的value为“dataxTest”=>"da****est"
dx_replace(1,"5","10","****")  column 1的value为“dataxTest”=>"data****"
```

### 案例

#### `test.json`

```json
{
  "job": {
    "setting": {
      "speed": {
        "channel": 1
      },
      "errorLimit": {
        "record": 0
      }
    },
    "content": [
      {
        "reader": {
          "name": "streamreader",
          "parameter": {
            "column": [
              {
                "value": "DataX",
                "type": "string"
              }
            ],
            "sliceRecordCount": 10
          }
        },
        "writer": {
          "name": "streamwriter",
          "parameter": {
            "print": true,
            "encoding": "UTF-8"
          }
        },
        "transformer": [
          {
            "name": "dx_replace",
            "parameter": {
              "columnIndex": 0,
              "paras": [
                "1",
                "3",
                "***"
              ]
            }
          }
        ]
      }
    ]
  }
}
```

运行测试

```shell
python datax.py test.json
```

#### [`mysql-transformer.json`](json/mysql-transformer.json)

替换`t_test`表中的第2个字段，替换长度为1。 ex：`你好世界` => `你***世界`

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
        },
        "transformer": [
          {
            "name": "dx_replace",
            "parameter": {
              "columnIndex": 1,
              "paras": [
                "1",
                "1",
                "***"
              ]
            }
          }
        ]
      }
    ],
    "setting": {
      "speed": {
        "channel": "1"
      },
      "errorLimit": {
        "record": 0
      }
    }
  }
}
```

运行

```shell
python datax.py mysql-transformer.json
```

---

主要配置示例

```json
{
  "transformer": [
    {
      "name": "dx_replace",
      "parameter": {
        "columnIndex": 1,
        "paras": [
          "1",
          "1",
          "***"
        ]
      }
    }
  ]
}
```


