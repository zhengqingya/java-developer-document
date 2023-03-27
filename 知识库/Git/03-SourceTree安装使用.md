@[TOC](文章目录)

### 一、前言

SourceTree安装和简单使用说明。

### 二、SourceTree安装

> 下载地址 [https://www.sourcetreeapp.com](https://www.sourcetreeapp.com)
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/268b0f7730b749629b19d07c2bbc8ffc.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/c389b870c4f648fab127570ce8a5c333.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c407cbfd3c424ff8b81425dce583f847.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/4f8f05cac81b4b6fbedb0cb9fa1db4d7.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/486cc0dd5764408a86b7a46f1f08b67f.png)

### 三、SourceTree使用

#### 1、`克隆仓库`&`拉取代码`&`推送代码`

这里先新建一个仓库`git-project`
![在这里插入图片描述](https://img-blog.csdnimg.cn/5c5649e640754e89bec5e2988982a614.png)
克隆
![在这里插入图片描述](https://img-blog.csdnimg.cn/276b2b192c5b4cabb430101f48c742bf.png)
随便写点内容，然后暂存到本地
![在这里插入图片描述](https://img-blog.csdnimg.cn/c9213494d46c416bb9f7ee4d7ca55486.png)
然后写点提交信息，推送到远程仓库
![在这里插入图片描述](https://img-blog.csdnimg.cn/1abd06cf6b50435fba82841a0bdb87c0.png)
对于不想要的文件，可以进行移除，或者丢弃本次修改的内容。
![在这里插入图片描述](https://img-blog.csdnimg.cn/dee7a66d6c2444a7b4350b0c47834938.png)
如果远程仓库有代码更新，可点击拉取最新代码。
![在这里插入图片描述](https://img-blog.csdnimg.cn/52e0d3d9e5b84594bb498af0c3b8178d.png)

#### 2、`创建分支`&`合并分支代码`

创建`dev`分支
![在这里插入图片描述](https://img-blog.csdnimg.cn/33c2a5a18f314848966a164db9d82602.png)
写点内容提交
![在这里插入图片描述](https://img-blog.csdnimg.cn/51cb7525bc1442858a1e827e762b0b20.png)
合并dev分支代码到master分支
![在这里插入图片描述](https://img-blog.csdnimg.cn/8e9581288db74e189a8ef6a5ff8ed8c9.png)
合并完了记得推送到远程仓库
![在这里插入图片描述](https://img-blog.csdnimg.cn/c7159eff6b2d433fa9e3da9ba0cdc3d3.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/3540d323a76745029885b518899c0025.png)

如果遇到冲突(即2个人在同一文件同一位置修改了内容)

![在这里插入图片描述](https://img-blog.csdnimg.cn/0493972965c64c03b628dd4109b39efe.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/93e9d3f6ea9440efac89883681940949.png)
打开此冲突文件进行合并修改再提交即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/c817900b664248dca8bba8c69f117092.png)

#### 3、标签

用于对项目重要里程碑节点标识记录  ex:线上发版1.0.0
![在这里插入图片描述](https://img-blog.csdnimg.cn/8df4be115aa04cdebcb0ee32bfd07256.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c73cc75a7fd743b0965dbcb5b7ee9429.png)

#### 4、子模块

将另外一个git仓库作为子模块存储。

> ex: maven多模块项目开发中可引入一个公共的子模块

![在这里插入图片描述](https://img-blog.csdnimg.cn/92bbdbd1a20a449fa979deaa2f68f1ac.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/562fbe5a2b6e4cd189ee18f8ac023a6d.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/921c1c8217df4049abbef5766babd145.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/a222c8caa11744bba0b07221f8f9844a.png)
如果对子模块下的内容作修改，需要在双击在子模块中提交修改
![在这里插入图片描述](https://img-blog.csdnimg.cn/ae0d908e54da4bfc8dcb56300d851576.png)

#### 5、子树

和子模块有点类似，但子树包含其历史提交版本记录。
![在这里插入图片描述](https://img-blog.csdnimg.cn/b20ec40c595d40da99b6193f21be1183.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/6e153d5e54c74a02b362a82327506222.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/310518ac982146e3b7a233bb7e92cdfb.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/ce893008e6d846dab15c4d53ae3e0791.png)

对子树下的内容修改之后，可进行单独的推送/拉取
![在这里插入图片描述](https://img-blog.csdnimg.cn/065d9679d2e940a3ac5d27baf7ea7754.png)
也可查看子树修改的内容
![在这里插入图片描述](https://img-blog.csdnimg.cn/13dee8ca8820429f920d4557fb53a6af.png)

#### 6、贮藏

1.部分个人配置，不方便提交，比如数据库配置文件`jdbc.properties`。每次pull都会覆盖掉自己的配置。
2.代码功能未写完，但又要临时写新功能代码。之前功能的代码由于未写完，不能提交。

这时候就可以使用`贮藏`功能。
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc85f688c0f041dfb8c412e449f317ae.png)
下次写新功能时，应用贮藏区数据，之前的配置就乖乖回来了。
![在这里插入图片描述](https://img-blog.csdnimg.cn/40e71a246e754589b46880f7716010bc.png)

#### 7、重置提交

1. `版本3`：add 3.txt
2. `版本4`：add 4.txt
3. `版本5`：add 5.txt

ex：由于新需求提交的`版本4`和`版本5`做错了，想要回归至`版本3`，但又可能在有些场景需要保留`版本4`和`版本5`的内容或彻底不要，这时候就可以使用`重置提交`。
![在这里插入图片描述](https://img-blog.csdnimg.cn/3b5495f2e00e46c1969c961bc8350580.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/67fd104818b44f8395ca595018ed5191.png)

##### a、`软合并`：保持所有本地改动

3之后提交的文件不会丢失，且加入git版本管理
![在这里插入图片描述](https://img-blog.csdnimg.cn/df02de96e3ae42a3afd7a4722ad2bb40.png)

##### b、`混合合并`：保持工作副本并重置索引

3之后提交的文件不会丢失，且移出git版本管理
![在这里插入图片描述](https://img-blog.csdnimg.cn/b747051f837e4c9a841d3f5162600d1e.png)

##### c、`强行合并`：丢弃所有改动过的工作副本

3之后提交的文件丢失
![在这里插入图片描述](https://img-blog.csdnimg.cn/4ce3956ecce747d08275ef465f82c873.png)

---

以`强行合并`为例，操作之后需要`强制推送`，因为本地仓库的HEAD指向的版本比远程仓库的旧。
![在这里插入图片描述](https://img-blog.csdnimg.cn/a1da04e1a1384b8ea380884c7da58537.png)
这里无法勾选强制推送，那就使用如下命令完成此操作即可。

```shell
git push -f
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/576625c76faf4c4c9b243b03c4ef5f4e.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e637302dd7a844449b75bb678ac9ca92.png)
查看远程仓库
![在这里插入图片描述](https://img-blog.csdnimg.cn/1d7b900f420d405098ba617e1dc69aca.png)

#### 8、回滚提交

1. `版本6`：add 6.txt
2. `版本7`：add 7.txt
3. `版本8`：add 8.txt

ex：发现之前提交的`版本6`有bug，想要撤销`版本6`的提交，但又想保留`版本7`和`版本8`的提交，这时候就可以使用`回滚提交`。
![在这里插入图片描述](https://img-blog.csdnimg.cn/17aaf2ac7a2b497ba4568eaf6b519d1c.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c407114f6979420994fba8deecfe7982.png)
推送
![在这里插入图片描述](https://img-blog.csdnimg.cn/8ba8ab451d0c48e0b3875d055fff9816.png)

### 四、Git工作流

1. `master`：主分支，用于最终发布版本，整个项目中有且只有一个。
2. `develop`：开发分支，原则上项目中有且只有一个。
3. `feature`：功能分支，用于开发一个新的功能。
4. `release`：预发布版本，介于develop和master之间的一个版本，主要用于测试。
5. `hotfix`：修复补丁，用于修复master上的bug。


初始化

> tips: 需要先创建一个`develop`分支

![在这里插入图片描述](https://img-blog.csdnimg.cn/59707d01b2a743de97a84372917a41c2.png)
在`develop`分支`建立新的功能`
![在这里插入图片描述](https://img-blog.csdnimg.cn/9ffe59d520e14d4aa0c230521fe7e9d7.png)
开发商品功能
![在这里插入图片描述](https://img-blog.csdnimg.cn/01233d5e85784265a3b60437ebcf5d2e.png)
随便写点内容提交
![在这里插入图片描述](https://img-blog.csdnimg.cn/b442c9bd16b94894afafb52d34acac5d.png)
`完成新功能开发`
![在这里插入图片描述](https://img-blog.csdnimg.cn/9a8031052bf54accba49c2eba291933d.png)

> tips: `变基`和`merge`类似。
> 变基可将分支历史并入主线。
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/54a7356d8fe8449286d1fd552019c958.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/1ae5a370e183488a8d8beed3fa8eb76e.png)
开发完新功能之后，`建立新的发布版本`
![在这里插入图片描述](https://img-blog.csdnimg.cn/8351e433899444b1b2141d06e45f6961.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/8d948b8deedb4964baa66961009b9e70.png)
`完成发布版本`，即合并到master分支进行上线部署准备
![在这里插入图片描述](https://img-blog.csdnimg.cn/033e1f5274ec4611bbd1689a12aa54c3.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/4edc4f4d141844ae83f00f784a028a29.png)
在远程仓库查看此次发版信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/2044f118eeb14d3c898288e24c7480f4.png)
如果线上出现bug，需要修复，则`建立新的修复补丁`
![在这里插入图片描述](https://img-blog.csdnimg.cn/b863b3be74bc4755b17c368e1d0d0487.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/fbd1aea23c8a4935a5e6fcd5b5dcdb68.png)
将bug修复之后提交代码
![在这里插入图片描述](https://img-blog.csdnimg.cn/a35e654ced47480dbbfe4454a68455e6.png)
`完成修复补丁`
![在这里插入图片描述](https://img-blog.csdnimg.cn/2bb4afc6cd0644c79afba13395b48b50.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/7b56264a6ca3453fba838426345b224c.png)
整条流水线如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/a401a40ae7074837bb5902a023925cfc.png)

关于SourceTree的使用，自己多点点应用下，很简单的`^_^`

--- 

> 今日分享语句：
> 要从容地着手去做一件事，一旦开始，就要坚持到底。

