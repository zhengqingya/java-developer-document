✍web前端剑法之css
==============================================================================

| 🔥web前端剑法之css | 地址 |
| --- | --- |
| 🔥CSS基础班笔记(一) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115560532](https://blog.csdn.net/Augenstern_QXL/article/details/115560532) |
| 🔥CSS基础班笔记(二) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115560502](https://blog.csdn.net/Augenstern_QXL/article/details/115560502) |
| 🔥CSS基础班笔记(三) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115726577](https://blog.csdn.net/Augenstern_QXL/article/details/115726577) |
| 🔥CSS进阶班笔记(四) | [https://blog.csdn.net/Augenstern\_QXL/article/details/119172527](https://blog.csdn.net/Augenstern_QXL/article/details/119172527) |
| 🔥CSS进阶班笔记(五) | [https://blog.csdn.net/Augenstern\_QXL/article/details/120374974](https://blog.csdn.net/Augenstern_QXL/article/details/120374974) |

✍目录总览
=======================================================================

![在这里插入图片描述](https://img-blog.csdnimg.cn/7cd9a35cc5c6481e8e91aa91b473db5b.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70)

1、精灵图Sprites🔥
================================================================================

* 为了有效地减少服务器接收和发送请求的次数，提高页面的加载速度，出现了CSS精灵技术

* 核心原理：**将网页中的一些小背景图像整合到一张大图中，这样服务器只需要一次请求就可以了**

1.1、精灵图的使用🔥
------------------------------------------------------------------------------

**使用精灵图的核心**：

1. 精灵技术主要针对于背景图片的使用，就是把多个小背景图片整合到一张大图片中
2. 这个大图片也称为 sprites 精灵图 或者 雪碧图
3. 移动背景图片的位置，此时可以使用 background-position
4. 移动的距离就是这个目标图片的x和y坐标，注意网页中的坐标有所不同（x轴右边走是正值，左边走是负值，y轴下边走是正值，上边走是负值）
5. 一般情况下都是往上往左移动，所以数值是负值
6. 使用精灵图的时候需要精确测量，每个小背景图片的大小和位置。

**精灵图的优点很多，但是缺点也很明显**

1. 图片文件还是比较大的
2. 图片本身放大和缩小会失真
3. 一旦图片制作完毕想要更换非常复杂

此时，有一种技术的出现很好的解决了以上问题，就是字体图标 iconfont

2、字体图标iconfont🔥
==================================================================================

字体图标使用场景： 主要用于显示网页中通用、常用的一些小图标。**展示的是图标，本质属于字体**

优点：

1. 轻量级：一个图标字体比一系列的图像要小，一旦字体加载了，图标就会马上渲染出来，减少了服务器的请求
2. 灵活性：本质其实是文字，可以很随意的改变颜色，产生阴影，透明效果，旋转等
3. 兼容性：几乎支持所有的浏览器

步骤：

1. 字体图标的下载
2. 字体图标的引入(引入到我们html页面中)
3. 字体图标的追加(以后添加新的小图标)

2.1、字体图标的下载🔥
-------------------------------------------------------------------------------

1. icomoon字库

   外网，不需要登录即可下载 [http://icomoon.io](http://icomoon.io/)

    * 点击 IcoMoon App
    * 选择需要的图标
    * 点击`Generate Font`
    * 点击 下载
2. 阿里iconfont字库

   免费，但是需要登录 [http://www.iconfont.cn/](http://www.iconfont.cn/)

2.2、字体图标的引入🔥
-------------------------------------------------------------------------------

我们以 icomoon 字库网为例，将下载包解压，解压之后的文件如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/de6636aa2791418ea0b7687610ca311f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

1. 把下载包里面的 fonts 文件夹放入页面根目录下

![在这里插入图片描述](https://img-blog.csdnimg.cn/d02f2b4a81ff4e2ba3badc003fc0bea9.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

2. 在CSS样式中**全局声明**字体：简单理解把这些字体通过css引入到我们页面中

   右键打开 style.css，这里我演示用notepad++打开，复制如图代码引入我们自己的CSS文件中

![在这里插入图片描述](https://img-blog.csdnimg.cn/7a25356ff5d543679fc846c54b1566b5.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

```
<style>
@font-face {
     font-family: 'icomoon';
     src: url('fonts/icomoon.eot?7kkyc2');
     src: url('fonts/icomoon.eot?7kkyc2#iefix') format('embedded-opentype'),
     url('fonts/icomoon.ttf?7kkyc2') format('truetype'),
     url('fonts/icomoon.woff?7kkyc2') format('woff'),
     url('fonts/icomoon.svg?7kkyc2#icomoon') format('svg');
     font-weight: normal;
     font-style: normal;
}

</style>

```

3. html标签内添加小图标

   我们打开解压文件中的 demo.html ，复制想要的图标，粘贴进我们的 `<span></span>`标签中

![在这里插入图片描述](https://img-blog.csdnimg.cn/b54ee91dd0b74854a8afcce8b1bf37fb.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

4. 给标签定义字体

```
/*span使用字体图标*/
span {
 font-family: "icomoon";
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d03f4bec9701491ea0ecc0bd69d89f5a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

注意：标签中的 `font-family` 的值和我们之前引入字体图标的`font-family` 必须一样，这里均为 icomoon

5. 完成，所以我们的整体代码为：

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @font-face {
            font-family: 'icomoon';
            src: url('fonts/icomoon.eot?7kkyc2');
            src: url('fonts/icomoon.eot?7kkyc2#iefix') format('embedded-opentype'), url('fonts/icomoon.ttf?7kkyc2') format('truetype'), url('fonts/icomoon.woff?7kkyc2') format('woff'), url('fonts/icomoon.svg?7kkyc2#icomoon') format('svg');
            font-weight: normal;
            font-style: normal;
        }
        
        span {
            font-family: "icomoon";
        }
    </style>
</head>

<body>
    <div>
        <span> </span>
    </div>
</body>

</html>

```

测试效果为：

![在这里插入图片描述](https://img-blog.csdnimg.cn/fac058a088f2454ba22fcb0c99ee679d.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

2.3、字体图标的追加🔥
-------------------------------------------------------------------------------

* 如果工作中，原来的字体图标不够用了，我们需要添加新的字体图标到原来的字体文件中。
* 以 icomoon字库 网为例，点击网站内`import icons`
* 把压缩包里面的 selection.json 重新上传，然后选中自己想要新的图标，重新下载压缩包，并替换原来的文件即可。

![在这里插入图片描述](https://img-blog.csdnimg.cn/136b1488a4cb4233ad7ff77f5f9deb44.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

2.4、字体文件格式
----------------------------------------------------------------------------

不同浏览器所支持的字体格式是不一样的，字体图标之所以兼容，就是因为包含了主流浏览器支持的字体文件。

.ttf 格式、.woff 格式、.eot 格式、.svg 格式，不同浏览器支持不同的格式

![在这里插入图片描述](https://img-blog.csdnimg.cn/ec0439450c03456483a147d5b0eafef5.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

2.4、字体图标总结
----------------------------------------------------------------------------

1. 如果遇到一些结构和样式比较简单的小图标，就用字体图标
2. 如果遇到一些结构和样式复杂一点的小图片，就用精灵图

3、界面样式🔥
==========================================================================

所谓的界面样式，就是更改一些用户操作样式，以便提高更好的用户体验。

* 更改用户的鼠标样式
* 表单轮廓
* 防止表单域拖拽

3.1、鼠标样式cursor🔥
----------------------------------------------------------------------------------

鼠标样式`cursor`

* 设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状

```
li {
    cursor: pointer; 
}

```

| 属性值 | 描述 |
| --- | --- |
| default | 小白，默认 |
| pointer | 小手 |
| move | 移动 |
| text | 文本 |
| not-allowed | 禁止 |

3.2、轮廓线outline🔥
----------------------------------------------------------------------------------

轮廓线`outline`：

* 给表单添加 `outline:0`; 或者`outline: none`;样式后，就可以去掉默认的蓝色边框

```
input {
    outline: none;
}

```

3.3、防止拖拽文本域
-----------------------------------------------------------------------------

防止拖拽文本域`resize`

```
textarea {
    resize: none;
}

```

4、vertical-align🔥
====================================================================================

`vertical-align`:

* 使用场景：经常用于设置**图片**或者**表单（行内块元素）**和**文字垂直对齐**。
* 官方解释：用于设置一个元素的垂直对齐方式，但是它只针对于**行内元素**或者**行内块元素**有效

```
vertical-align: baseline | top | middle | bottom

```

| 值 | 描述 |
| --- | --- |
| baseline | 默认，元素放置在父元素的基线上 |
| top | 把元素的顶端与行中最高元素的顶端对齐（顶线对齐） |
| middle | 把此元素放置在父元素的中部（中线对齐） |
| bottom | 把元素的顶端与行中最低的元素的顶端对齐（底线对齐） |

![在这里插入图片描述](https://img-blog.csdnimg.cn/2f7832a64527405181bd3edbcd3a736a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

4.1、图片、表单和文字对齐🔥
----------------------------------------------------------------------------------

图片、表单都属于行内块元素，默认的 vertical-align 是基线对齐。

![在这里插入图片描述](https://img-blog.csdnimg.cn/159dbd0d98f941f5b17eb713341d3c64.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

此时可以给图片、表单这些行内块元素的 vertical-align 属性设置为 `middle` 就可以让文字和图片垂直居中对齐了。

4.2、 图片底侧空白缝隙解决🔥
-----------------------------------------------------------------------------------

* bug：图片底侧会有一个空白缝隙，原因是行内块元素会和文字的基线对齐（给图片加边框就可以看见）

![在这里插入图片描述](https://img-blog.csdnimg.cn/6ab28389075f4478a70a11cae3e5a58e.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

主要解决办法有两种：

1. 给图片添加 `vertical-align : middle | top |bottom` 等

2. 把图片转换为块级元素 `display:block;`，因为块级元素不会有`vertical-align` 属性

5、溢出文字省略显示🔥
==============================================================================

5.1、单行文本溢出省略号显示🔥
-----------------------------------------------------------------------------------

必须满足三个条件：

```
/* 1.先强制一行内显示文本 */
white-space: nowrap; 		/*默认 normal 是自动换行，nowrap是强制一行显示文本*/

/* 2.超出的部分隐藏 */
overflow: hidden;

/* 3.文字用省略号替代超出的部分*/
text-overflow: ellipsis;
/*ellipsis:省略号*/

```

5.2、多行文本溢出显示省略号显示
-----------------------------------------------------------------------------------

多行文本溢出显示省略号，有较大的兼容性问题，适合于webKit浏览器或移动端(移动端大部分是webKit内核)

```
overflow: hidden;
text-overflow: ellipsis;
/* 弹性伸缩盒子模型显示 */
display: -webkit-box;
/* 限制在一个块元素显示的文本的行数 */
-webkit-line-clamp: 2;
/* 设置或检索伸缩盒对象的子元素的排列方式 */
-webkit-box-orient : vertical;

```

更推荐让后台人员来做这个效果，因为后台人员可以设置显示多少个字，操作更简单。

6、常见布局技巧🔥
============================================================================

6.1、margin负值的运用🔥
-----------------------------------------------------------------------------------

* 两个盒子加边框1px，浮动，贴紧会出现 1 + 1 = 2px
* 给右边盒子添加`margin-left: -1px`
* 正数向右边走，负数向左边走

![在这里插入图片描述](https://img-blog.csdnimg.cn/49161c07333346c990eab8dca70b4425.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

当我们有多个盒子时的解决办法：

![在这里插入图片描述](https://img-blog.csdnimg.cn/8bf8e78f78bf4dfa89950aa8dd76bfd6.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

1. 让每个盒子 margin 往左侧移动 \-1px 正好压住相邻盒子边框
2. 鼠标经过某个盒子的时候，提高当前盒子的层级即可
    * 如果没有定位，则加相对定位(保留位置)
    * 如果有定位，则加 z-index

```
<head>
<style>
    ul li {
        float: left;
        list-style: none;
        width: 150px;
        height: 200px;
        border: 1px solid red;
        margin-left: -11px
    }
    
    ul li:hover {
        position: relative;
        border: 1px solid blue;
    }
 
</style>
</head>
<body>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</body>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/3359f694ecc94214a1a4530afdbefe2e.gif#pic_center)

6.2、文字围绕浮动元素🔥
--------------------------------------------------------------------------------

巧妙运用浮动元素不会压住文字的特性

![在这里插入图片描述](https://img-blog.csdnimg.cn/71377b1f43f34ff1aaf153cf1dceb0b6.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

6.3、行内块巧妙运用🔥
-------------------------------------------------------------------------------

![在这里插入图片描述](https://img-blog.csdnimg.cn/7d1aaaf6a6d549e7b1a90c25447fb370.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

页码在页面中间显示：

1. 把这些链接盒子转换为行内块，之后给父级指定 `text-align: center`

2. 利用行内块元素中间有缝隙，并且给父级添加 `text-align: center` ，行内块元素会水平居中

本文转自 [https://blog.csdn.net/Augenstern\_QXL/article/details/119172527](https://blog.csdn.net/Augenstern_QXL/article/details/119172527)
，如有侵权，请联系删除。