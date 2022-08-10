登录：sqlplus system/root  或  sqlplus sys/root as sysdba    --> 注：root是安装时设置的口令
【
管理员用户:
   用户名sys(最大的权限)密码在安装时设置的密码；还具有创建新的数据库的权限。
   用户名system(次之)密码在安装时设置的密码
普通用户:
   用户名zhengqing 密码zhengqing
】

显示当前登录用户：show user
查看当前用户的所有表：select * from user_tables;
切换当前用户：conn scott/tiger
以DBA的身份登录另一个用户：sqlplus system@orcl as sysdba
为scott解锁：alter user scott account unlock;
退出：Ctrl+C  或  exit  或  quit
查看所有表总数：select count(*) from user_tables;
设置缓存区：set linesize 缓冲区大小;   (注意要先设置cmd的缓冲区-属性里面设置！)
清屏：host cls
删除用户：drop  user 用户名 cascade;  【加cascade(级联)表示删除该用户下的所有数据对象】   --> ex:drop user C##ZHENGQING cascade

忘记密码处理：
①登录sys 用户：conn/as sysdba   ( 这里没有输入用户名与密码  --> why? ->如果数据库服务器在本地，可以不输人sys/root )
②使用超级管理员来修改其它用户的密码：alter user 用户名 identified by 密码   -->  ex:alter user zq identified by zq;


------------------------------------------------------------------------------------------------------

# oracle查看编码格式及修改

> https://blog.csdn.net/angus_17/article/details/7762472

### 查看oracle数据库编码
```oracle
select * from nls_database_parameters where parameter ='NLS_CHARACTERSET';
```

### 查看oracle客户端编码
```oracle
select * from nls_instance_parameters where parameter='NLS_LANGUAGE';
```

### 修改编码
```oracle
-- 将数据库环境字符集的AL32UTF8，换为ZHS16GBK
-- 首先以sysdba的身份登录上去 
conn /as sysdba
-- 关闭数据库
shutdown immediate;
-- 以mount打来数据库
startup mount
-- 设置session
SQL>ALTER SYSTEM ENABLE RESTRICTED SESSION;
SQL> ALTER SYSTEM SET JOB_QUEUE_PROCESSES=0;
SQL> ALTER SYSTEM SET AQ_TM_PROCESSES=0;
-- 启动数据库
alter database open;
-- 修改字符集
ALTER DATABASE character set INTERNAL_USE ZHS16GBK;
-- 关闭，重新启动
SQL>shutdown immediate;
SQL> startup
```

------------------------------------------------------------------------------------------------------

# Oracle创建用户、表空间和删除用户命令
```oracle
-- 创建用户和表空间，创建完后直接可以登录连接
CREATE TABLESPACE "TABLESPACE01" 
DATAFILE 'TABLESPACE01_DATA.DBF' SIZE 268435456 
AUTOEXTEND ON NEXT 2097152 
MAXSIZE 34359721984 BLOCKSIZE 8192 
NOLOGGING 
DEFAULT NOCOMPRESS 
EXTENT MANAGEMENT LOCAL AUTOALLOCATE FLASHBACK ON;
 
create user USER01 identified by USER01 
default tablespace TABLESPACE01 
quota unlimited on TABLESPACE01 
temporary tablespace TEMP;
 
grant resource, connect, DBA to USER01;

-- 1、创建用户
create user user01           -- 用户名：user01
identified by 123456         -- 登陆验证密码：123456 （密码大小写敏感）
default tablespace users     -- 用户的默认表空间：users
quota 10m on users           -- 默认表空间中可以使用的空间配额：10MB。默认情况下，
                             -- 都会对用户赋不限制表空间(unlimited tablespace) 的权限
temporary tablespace temp    -- 用户使用的临时表空间：temp
password expire              -- 密码状态，过期。登陆的时候要求用户修改

-- 2、查看用户
-- 【 注意：dba_users中的password列已经在oracle11gR2中弃用了，取而代之的是authentication_type列。 】
select username,user_id,account_status,default_tablespace,temporary_tablespace from dba_users where username='USER01';

-- 3、授权
grant connect,resource,dba to user01; -- 授权之后就可以连接访问

-- 4、删除用户
DROP USER user01 CASCADE;   -- cascade 在用户下有对象时使用 【 注意：cascade 级联删除，用户以及所有关联的数据库对象（表空间等）都会删除 】

-- 5、删除表空间
DROP TABLESPACE tablespacename INCLUDING CONTENTS AND DATAFILES CASCADE CONSTRAINT;
-- 注 ：
--     在删除用户时可能会碰到无法删除当前连接的用户，这是由于还有数据库连接到该用户，有会话存在，需要先删除会话。
--     最暴力的做法是直接shutdown数据库，然后重启即可。。。
--     一般的操作是通过查询SessionID，手动杀掉会话再删除用户：
--     1）查询连接情况：select username,sid,serial# from v$session;
--     2）找到要删除用户的sid和serial并删除：alter system kill session 'sid,serial';
--     再执行删除用户的操作，如果还是无法删除说明还有连接的会话，继续执行删除会话的操作。

-- 6、修改密码 【 注意：oracle中给用户修改密码的时候是不需要输入旧密码的，这是一个安全隐患。 任何用户可以给自己修改密码，但是要修改别人的密码需要取得相应的权限。 】
alter user user01 identified by 111111;

-- 7、解决表空间很大，总显示空间不足的问题：ORA-01536:space quota exceeded for table space 'users'
-- 解决方法：
1. alter user USERNAME quota 100M on TABLESPACENAME; 
2. alter user USERNAME quota unlimited on TABLESPACENAME; 
3. grant unlimited tablespace to USERNAME;
```

# 连接 - sqlplus username/password@addressname
sqlplus SYSTEM/123456@ORCLPDB1

# JDBC 连接串
jdbc:oracle:thin:@//localhost:1521/ORCLPDB1
```

### 导入 导出 Oracle表数据 dmp文件
```shell script
# 拷贝数据文件到容器中
docker cp /home/oracle18c/hb20191128.dmp oracle18c:/tmp   # oracle18c：容器名  前：宿主机文件路径 后：容器保存目录

# 导入
imp 用户名/密码@网络服务名 file=文件名.dmp full=y;    # ex: imp SYSTEM/123456@ORCLPDB1 file=hb20191128.dmp full=y;

# 导出多个表时，表名使用逗号隔开如： tables=(table1,table2,table3)
exp 用户名/密码@网络服务名 file=文件名.dmp tables=(表名);

# 导出整个数据库
exp 用户名/密码@网络服务名 file=文件名.dmp full=y;
```

```
1、imp 用户名/密码@网络服务名 file=XXX.dmp fromuser=XXX touser=XXX;//导入dmp文件

2、imp 用户名/密码@网络服务名 file=xxx.dmp full=y;//导入dmp文件

3、imp aichannel/aichannel@HUST full=y file= d:\data\newsmgnt.dmp ignore=y;//跳过建表语句

4、exp system/manager@TEST file=d:\daochu.dmp full=y;//导出整个数据库

5、exp system/manager@TEST file=d:\daochu.dmp owner=(system,sys)//导出指定用户的数据

6、exp system/manager@myoracle file=d:\daochu.dmp tables=(table1) igonre = y;//导出指定表（igonre可有可无）

7、exp aichannel/aichannel@TESTDB2 file= d:\data\newsmgnt.dmp tables=(inner_notify,notify_staff_relat);//将数据库中的表inner_notify、notify_staff_relat导出

8、exp 用户名/密码@网络服务名 file=xxx.dmp tables=(表名);//导出 dmp文件

9、exp 用户名/密码@网络服务名 file=xxx.dmp tables=(table1,table2,table3)。//导出多个 dmp文件
```

### Navicat连接Oracle 建库参考：https://blog.csdn.net/Eazon_chan/article/details/88979012
```
服务名：ORCLPDB1
```

### Oracle导入DMP文件后，注释和CLOB字段乱码
在Linux端执行如下命令，然后进行imp重新导入，发现注释正常
```shell script
export NLS_LANG=AMERICAN_AMERICA.ZHS16GBK
```


### oralce 只导入表数据，不导入表结构
```oracle
imp 用户名/密码@网络服务名 file=xxx.dmp full=y data_only=y;  -- 导入dmp文件 【oracle11g 版本之后才支持`data_only=y` 只导入数据 命令】
```

### oracle 将指定用户下的表数据导出
```oracle
# 例子：导出mydb数据库system和sys用户的所有表数据到D:\example.dmp文件中
exp system/123456@213.234.12.32/mydb file=D:\example.dmp owner=(system,sys)

# 实战 （正版oracle使用命令）
exp db_bzhb/passw0rd file=bzhb_20191230.dmp owner=db_bzhb;
```

### oracle创建表空间和用户 以及彻底删除用户和表空间以及关联数据
```oracle
-- 创建表空间和用户  
CREATE TABLESPACE TBS_PERM  
LOGGING   
DATAFILE 'D:/app/Administrator/oradata/fpglqyb/TBS_PERM.DBF' SIZE 50M   
AUTOEXTEND  ON NEXT  1024K MAXSIZE UNLIMITED EXTENT MANAGEMENT LOCAL   
SEGMENT SPACE MANAGEMENT MANUAL;  

-- prompt 建临时表空间  
CREATE   
TEMPORARY TABLESPACE TBS_PERM_TMP TEMPFILE 'D:/app/Administrator/oradata/fpglqyb/TBS_PERM_TMP.DBF' SIZE 10M   
AUTOEXTEND ON NEXT  640K MAXSIZE UNLIMITED EXTENT MANAGEMENT LOCAL   
UNIFORM SIZE 1M;  


-- prompt 创建用户  
CREATE USER perm  PROFILE DEFAULT   
IDENTIFIED BY perm DEFAULT TABLESPACE TBS_PERM  
TEMPORARY TABLESPACE TBS_PERM_TMP   
ACCOUNT UNLOCK;  

GRANT CONNECT TO perm;  
GRANT DBA TO perm;  
GRANT CREATE TABLESPACE to perm;  
GRANT ALTER TABLESPACE to perm;  
GRANT DROP TABLESPACE to perm;  
GRANT ALTER ANY INDEX TO perm;  

-- 删除表控件和用户（把关联的都删除掉） 【注意 当表空间正在被使用是 是无法删除对应的物理文件..xxx.dbf的，要手动去目录删除】
drop user PERM cascade ;  
drop tablespace TBS_PERM2 including contents and datafiles cascade constraints ;  
```


### oracle 自增主键方式区别
```oracle
Oracle 自增列是利用序列做到的。自增列会自动加上非空约束；

表删除的时候，序列不会马上删除，这是因为删除的表会进入回收站，要关联删除需要加 purge ；

GENERATED ALWAYS AS IDENTITY 可以 delete ，不能显示 insert ，不能 update ；

GENERATED BY DEFAULT ON NULL AS IDENTITY 会自动将 null 值插入序列中的值，增删改都可以，相比 GENERATED ALWAYS AS IDENTITY 更加灵活，但是列的唯一性不能保证。

受自增列启发，可以自己创建序列，指定为表列的默认值。

系统自建序列的属性不能更改，可以在创建自增列的时候手动修改，否则较小 cache 默认值，会造成性能问题。 Like this:

CREATE TABLE test4 (id NUMBER GENERATED BY DEFAULT AS IDENTITY (START WITH 100 INCREMENT BY 10 cache 100 ));

其他用户如果要向带有自增列表中插入数据的话，那么需要序列权限 
```

### Oracle 设置自增主键ID从表数据ID最大值开始增值
```oracle
SELECT
	'SELECT ''ALTER TABLE 数据库名.' || t1.table_name || ' MODIFY(' || t1.Column_Name || ' Generated as Identity (START WITH '' || NVL(MAX( ' || t1.Column_Name || '+1 ),1) || ''));'' FROM ' || t1.table_name || ' UNION ALL' AS FINAL_SQL
FROM cols t1
LEFT JOIN user_col_comments t2 ON t1.Table_name = t2.Table_name AND t1.Column_Name = t2.Column_Name
LEFT JOIN user_tab_comments t3 ON t1.Table_name = t3.Table_name
WHERE
	NOT EXISTS (
        SELECT t4.Object_Name
        FROM User_objects t4
        WHERE
            t4.Object_Type = 'TABLE'
            AND t4.TEMPORARY = 'Y'
            AND t4.Object_Name = t1.Table_Name
	)
	AND t1.IDENTITY_COLUMN = 'YES'
ORDER BY t1.Table_Name, t1.Column_ID
```

### Oracle `sysdate` 获取系统当前时间相差8小时  【修改数据库时区获取系统服务器时区解决】
```oracle
-- 查数据库的时区
select dbtimezone from dual;
-- 修改数据库的时区 （改为北京时区）  【若需改回去 '+0:00'】
alter database set time_zone='+8:00'; 
-- 重启数据库服务端之后，再查看当前系统时间是否修改成功
select sysdate from dual;

-- 因上未成功 使用`sysdate + 8/24`
select sysdate,sysdate +1,sysdate + 8/24,sysdate + 1/24/60 from dual; 
```
