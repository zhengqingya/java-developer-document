# sed -i 命令详解

```shell
# 对每行匹配到的第一个字符串进行替换
sed -i 's/原字符串/新字符串/' test.txt
 
# 对全局匹配上的所有字符串进行替换
sed -i 's/原字符串/新字符串/g' test.txt
 
# 删除所有匹配到字符串的行
sed -i '/匹配字符串/d'  test.txt 
 
# 特定字符串的行后插入新行
sed -i '/特定字符串/a 新行字符串' test.txt
 
# 特定字符串的行前插入新行
sed -i '/特定字符串/i 新行字符串' test.txt
 
# 把匹配行中的某个字符串替换为目标字符串
sed -i '/匹配字符串/s/源字符串/目标字符串/g' test.txt
 
# 在文件test.txt中的末行之后，添加bye
sed -i '$a bye' test.txt  
 
# 对于文件第3行，把匹配上的所有字符串进行替换
sed -i '3s/原字符串/新字符串/g' test.txt

# 在第3行插入指定字符串 -- 如果第3行原文有内容，就会将原本的内容顶下去...
sed -i '3i 字符串' test.txt

# 多行内容 用 \ 
content="字符串1 \
 字符串2 \
 字符串3"
sed -i "3i $content" test.txt
```
