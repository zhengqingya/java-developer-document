### 生成ssh密钥 - SSH认证方式拉取Git代码

> 可参考：
> 1. [https://code.aliyun.com/help/ssh/README](https://code.aliyun.com/help/ssh/README)
> 2. [https://gitee.com/help/articles/4181#article-header0](https://gitee.com/help/articles/4181#article-header0)

```shell script
# 1. 生成ssh key 【 注：回车默认配置 】
ssh-keygen -t rsa -C "960869719@qq.com"
# 2. 查看生成的公钥
cat ~/.ssh/id_rsa.pub
# ex:   
# ssh-rsa xxxxxx= 960869719@qq.com

# 3. 将上面公钥拷贝到git页面ssh公钥中保存

# 4. 查看已生成的私钥（本地拉取使用）
cat ~/.ssh/id_rsa

# 5. 拉取代码测试
git clone git@gitee.com:zhengqingya/test.git
```

> win => C:\Users\Administrator\.ssh 目录下 拷贝id_rsa.pub文件中的ssh开头到 用户名结尾
