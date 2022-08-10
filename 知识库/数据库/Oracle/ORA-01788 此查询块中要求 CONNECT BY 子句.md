# ORA-01788 此查询块中要求 CONNECT BY 子句

报错如下：

```
org.springframework.jdbc.BadSqlGrammarException: 
### Error querying database.  Cause: java.sql.SQLSyntaxErrorException: ORA-01788: 此查询块中要求 CONNECT BY 子句
### The error may exist in com/xxx/mapper/AlarmManageMapper.java (best guess)
### The error may involve defaultParameterMap
### The error occurred while setting parameters
### SQL: SELECT id AS id,waterlongging_id AS waterlonggingId,level,water_value AS waterValue,status,date_start AS dateStart,date_End AS dateEnd,date_add AS dateAdd,date_modify AS dateModify FROM uw_alarm_manage WHERE id=?
### Cause: java.sql.SQLSyntaxErrorException: ORA-01788: 此查询块中要求 CONNECT BY 子句
; bad SQL grammar []; nested exception is java.sql.SQLSyntaxErrorException: ORA-01788: 此查询块中要求 CONNECT BY 子句
	at org.springframework.jdbc.support.SQLExceptionSubclassTranslator.doTranslate(SQLExceptionSubclassTranslator.java:91)
```

由于`level`为oracle关键字，因此sql需转换成如下: level -> “LEVEL”
