### 一、前言

本文将通过jenkins配置GitLab连接

### 二、安装插件`GitLab`

`Dashboard` -> `Manage Jenkins` -> `Manage Plugins` -> 搜索`GitLab`，安装重启jenkins
![在这里插入图片描述](https://img-blog.csdnimg.cn/cbb38a78bfc3437b91324854d76cdc0b.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 三、创建GitLab个人访问令牌

> 温馨小提示：创建后，请保存好，后面会用到！

![在这里插入图片描述](https://img-blog.csdnimg.cn/e341a92af22d4e03857e9f0274654665.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 四、添加全局凭据

![在这里插入图片描述](https://img-blog.csdnimg.cn/69613882e2ff44b9a9c133927fdac9d6.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/5c324cbb7ada4eccb5c337bbb11d5436.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
`API token`：即上面我们创建的GitLab个人访问令牌
![在这里插入图片描述](https://img-blog.csdnimg.cn/e491d2aca7604216a03a48a576a74d5f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 五、GitLab配置

![在这里插入图片描述](https://img-blog.csdnimg.cn/ed552eb1a605412795663b5b13f6d254.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/8cdd00da4dbb4968bda11b4a13e416d3.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 六、测试

> 新建一个任务即可选择连接我们的GitLab

![在这里插入图片描述](https://img-blog.csdnimg.cn/92cc1de32fd24d4f874939b9dadcf08a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

--- 

> 今日分享语句：
> 虽然我走得很慢,但我从不后退!


