# sql注入问题


```
# 1. 能用 #{参数} 则不用 ${参数}

# 不要因为不能直接使用#{} 就改为${} !!!    【 主要体现在三个方面`like，in和order by` 】

# 2. LIKE '%#{参数}%'  ->  CONCAT( '%', #{参数} , '%' ) 

# 3. IN( #{ids} )   ->   id IN <foreach collection="ids" item="item" open="("separatosr="," close=")"> #{ids} </foreach>

# 4. ORDER BY ${} -> X

# 5. java层面应该做好参数检查，假定用户输入均为恶意输入，防范潜在的攻击
```
