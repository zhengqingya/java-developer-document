# Oracle 创建 FIND_IN_SET 函数

```oracle
CREATE OR REPLACE FUNCTION FIND_IN_SET(piv_str1 varchar2, piv_str2 varchar2, p_sep varchar2 := ',')

RETURN NUMBER IS      

  l_idx    number:=0; -- 用于计算piv_str2中分隔符的位置  

  str      varchar2(500);  -- 根据分隔符截取的子字符串  

  piv_str  varchar2(500) := piv_str2; -- 将piv_str2赋值给piv_str  

  res      number:=0; -- 返回结果  

  loopIndex number:=0;

BEGIN  

-- 如果piv_str中没有分割符，直接判断piv_str1和piv_str是否相等，相等 res=1  

IF instr(piv_str, p_sep, 1) = 0 THEN  

   IF piv_str = piv_str1 THEN   

      res:= 1;  

   END IF;  

ELSE  

-- 循环按分隔符截取piv_str  

LOOP  

    l_idx := instr(piv_str,p_sep);  

     loopIndex:=loopIndex+1;

-- 当piv_str中还有分隔符时  

      IF l_idx > 0 THEN  



   -- 截取第一个分隔符前的字段str  

         str:= substr(piv_str,1,l_idx-1);  

   -- 判断 str 和piv_str1 是否相等，相等 res=1 并结束循环判断  

         IF str = piv_str1 THEN   

           res:= loopIndex;  

           EXIT;  

         END IF;  

        piv_str := substr(piv_str,l_idx+length(p_sep));  

      ELSE  

   -- 当截取后的piv_str 中不存在分割符时，判断piv_str和piv_str1是否相等，相等 res=1  

        IF piv_str = piv_str1 THEN   

           res:= loopIndex;  

        END IF;  

        -- 无论最后是否相等，都跳出循环  

        EXIT;  

      END IF;  

END LOOP;  

-- 结束循环  

END IF;  

-- 返回res  

RETURN res;  

END FIND_IN_SET; 
```

# Oracle时间与Unix时间戳的转换

>  Unix时间戳记是从'1970-01-01 00:00:00'GMT开始的秒数，表现为整数型。
   to_char函数支持date和timestamp,但是trunc却不支持TIMESTAMP数据类型。
   Oracle中的时间是Date型，以下函数提供了两种时间转换的Oracle函数

### 1.`UNIX_TO_ORACLE` : 从Unix时间戳记转换为Oracle时间
```oracle
create or replace function UNIX_TO_ORACLE(in_number NUMBER) return date is
begin
  return(TO_DATE('19700101','yyyymmdd') + in_number/86400 +TO_NUMBER(SUBSTR(TZ_OFFSET(sessiontimezone),1,3))/24);
end UNIX_TO_ORACLE;
```

### 2.`ORACLE_TO_UNIX` : 由Oracle时间Date型转换为Unix时间戳记(注：这里由于转换出来带了小数，因此四舍五入了！！！)
```oracle
create or replace function ORACLE_TO_UNIX(in_date IN DATE) return number is  
begin
  return( ROUND( (in_date -TO_DATE('19700101','yyyymmdd'))*86400 - TO_NUMBER(SUBSTR(TZ_OFFSET(sessiontimezone),1,3))*3600, 0) );
end ORACLE_TO_UNIX;
```

### 3.Date转换为Timestamp要使用CAST函数，例如：
```oracle
select CAST(sysdate as Timestamp) from dual;  
```

#
```oracle

```

#
```oracle

```

#
```oracle

```

#
```oracle

```

#
```oracle

```
