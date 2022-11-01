✍web前端剑法之HTML
===============================================================================

| 🔥web前端剑法之HTML | 地址 |
| --- | --- |
| 🔥HTML冲浪笔记(一) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115419453](https://blog.csdn.net/Augenstern_QXL/article/details/115419453) |
| 🔥HTML5冲浪笔记(二) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115599059](https://blog.csdn.net/Augenstern_QXL/article/details/115599059) |

✍目录总览
=======================================================================

![在这里插入图片描述](https://img-blog.csdnimg.cn/a9ad9c8238d54fbfada7a8ffdbcc1a68.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70)

1.HTML5提高
===========================================================================

* HTML5的新增特性主要是针对于以前的不足，增加了一些新的标签，新的表单和新的表单属性等。
* 这些新特性都有兼容性问题，基本都是IE9+以上版本的浏览器才支持，如果不考虑兼容性问题，可以大量使用这些新特性
*

HTML5有更大的技术集，允许更多样化和强大的网站和应用程序。增加了新特性：语义特性，本地存储特性，设备兼容特性，连接特性，网页多媒体特性，三维、图形及特效特性，性能与集成特性，CSS3特性。这个集合有时称为HTML5和朋友，通常缩写为HTML5

1.新增语义化标签🔥
-----------------------------------------------------------------------------

以前布局，我们基本用div 来做。 div 对于搜索引擎来说，是没有语义的。

新增语义化标签如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/07df0702684841339d1b4884b4bdc677.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

* < header > :头部标签
* < nav >: 导航标签
* < article >： 内容标签
* < section >:定义文档某个区域
* < aside >:侧边栏标签
* < footer >: 尾部标签

**–注意：**

* 这种语义化标准主要是针对**搜索引擎**的
* 这些新标签页面中可以使用**多次**
* 在IE9中，需要把这些元素转换为**块级元素**
* 其实，移动端更喜欢使用这些标签

```
 <style>
        header, nav {
            height: 120px;
            background-color: pink;
            border-radius: 15px;
            width: 800px;
            margin: 15px auto;
        }
        section {
            width: 500px;
            height: 300px;
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <header>头部标签</header>
    <nav>导航栏标签</nav>
    <section>某个区域</section>
</body>

```

2.新增视频标签🔥
----------------------------------------------------------------------------

### 2.1 video视频🔥

![在这里插入图片描述](https://img-blog.csdnimg.cn/fdfab228a4164a33a69d417ae5a688bb.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

语法：

```
<video src="文件地址"   controls="controls"></video>

<style>
        video {
            width: 100%;
        }
    </style>
</head>
<body>
    <video src="media/mi.mp4" autoplay="autoplay" muted="muted"  loop="loop" poster="media/mi9.jpg"></video>
</body>

```

| 属性 | 值 | 描述 |
| --- | --- | --- |
| autoplay | autoplay | 视频就绪自动播放(**谷歌浏览器需要添加muted来解决自动播放问题**) |
| controls | controls | 向用户显示播放控件 |
| width | pixels(像素) | 设置播放器宽度 |
| height | pixels(像素) | 设置播放器高度 |
| loop | loop | 播放完是否继续播放该视频,循环播放 |
| preload | auto(预先加载视频)none(不应加载视频) | 规定是否预加载视频(如果有了autoplay 就忽略该属性) |
| src | url | 视频url的地址 |
| poster | lmgurl | 加载等待的画面图片 |
| muted | muted | 静音播放 |

* 一般不显示controls，让视频循环播放

### 2.2 audio音频

![在这里插入图片描述](https://img-blog.csdnimg.cn/f26b894dc30e4d24a193e9c18caa0c58.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

```
<audio src="文件地址" controls="controls"></audio>

<audio src="media/music.mp3" autoplay="autoplay" controls="controls"></audio>

```

| 属性 | 值 | 描述 |
| --- | --- | --- |
| autoplay | autoplay | 如果出现该属性，则音频在就绪后马上播放 |
| controls | controls | 如果出现该属性，则向用户显示控件，比如播放按钮 |
| loop | loop | 如果出现该属性，则每当音频结束时重新开始播放 |
| src | url | 要播放的音频的url |

### 2.3总结

1. 音频标签和视频标签使用方式基本一致
2. 浏览器支持情况不同
3. **谷歌浏览器把音频和视频自动播放禁止了**
4. 我们可以给视频标签添加muted属性来静音播放视频，音频不可以(可以通过JavaScript解决)
5. 视频标签是重点，我们经常设置自动播放，不适用controls控件，循环和设置大小属性

3.新增input类型🔥
-------------------------------------------------------------------------------

| 属性值 | 说明 |
| --- | --- |
| type=“email” | 限制用户输入必须为Email类型 |
| type=“url” | 限制用户输入必须为URL类型 |
| type=“data” | 限制用户输入必须为日期类型 |
| type=“time” | 限制用户输入必须为时间类型 |
| type=“month” | 限制用户输入必须为月类型 |
| type=“week” | 限制用户输入必须为周类型 |
| **type="number"** | **限制用户输入必须为数字类型** |
| **type="tel"** | **手机号码** |
| **type="search"** | **搜索框** |
| type=“color” | 生成一个颜色选择表单 |

* 重点记住： **number tel search** 这三个

```
<body>
    <!-- 我们验证的时候必须添加form表单域 -->
    <form action="">
        <ul>
            <li>邮箱: <input type="email" /></li>
            <li>网址: <input type="url" /></li>
            <li>日期: <input type="date" /></li>
            <li>时间: <input type="time" /></li>
            <li>数量: <input type="number" /></li>
            <li>手机号码: <input type="tel" /></li>
            <li>搜索: <input type="search" /></li>
            <li>颜色: <input type="color" /></li>
            <!-- 当我们点击提交按钮就可以验证表单了 -->
            <li> <input type="submit" value="提交"></li>
        </ul>
    </form>
</body>

```

4.新增表单属性🔥
----------------------------------------------------------------------------

| 属性 | 值 | 说明 |
| --- | --- | --- |
| required | required | 表单拥有该属性表示其内容不能为空，必填 |
| **placeholder** | **提示文本** | **表单的提示信息，存在默认值将不显示** |
| autofocus | autofocus | 自动聚焦属性，页面加载完成自动聚焦到指定表单 |
| autocomplete | off/on | 当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项，默认已经打开。如autocomplete=“on” ,关闭autocomplete=“off”，需要放在表单内，同时加上name属性，同时成功提交 |
| **multiple** | **multiple** | **可以多选文件提示** |

```
 <form action="">
        <input type="search" name="sear" id="" required="required" placeholder="pink老师" autofocus="autofocus" autocommplete="off">
        <input type="submit" value="提交">
    </form>

```

* 可以通过以下设置方式修改placeholder里面的字体颜色

```
input::placeholder {
	color: pink;
}

```

本文转自 [https://blog.csdn.net/Augenstern\_QXL/article/details/115599059](https://blog.csdn.net/Augenstern_QXL/article/details/115599059)
，如有侵权，请联系删除。