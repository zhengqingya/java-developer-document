✍、目录总览
========================================================================

![在这里插入图片描述](https://img-blog.csdnimg.cn/8e8b3eac2911466bab74be296971a145.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

* 💂‍♂️拖了好久的移动端web开发，今天补上了💂‍♂️

🔥web前端剑法之css
===============================================================================

| 🔥web前端剑法之css | 地址 |
| --- | --- |
| 🔥CSS基础班笔记(一) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115560532](https://blog.csdn.net/Augenstern_QXL/article/details/115560532) |
| 🔥CSS基础班笔记(二) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115560502](https://blog.csdn.net/Augenstern_QXL/article/details/115560502) |
| 🔥CSS基础班笔记(三) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115726577](https://blog.csdn.net/Augenstern_QXL/article/details/115726577) |
| 🔥CSS进阶班笔记(四) | [https://blog.csdn.net/Augenstern\_QXL/article/details/119172527](https://blog.csdn.net/Augenstern_QXL/article/details/119172527) |
| 🔥CSS进阶班笔记(五) | [https://blog.csdn.net/Augenstern\_QXL/article/details/120374974](https://blog.csdn.net/Augenstern_QXL/article/details/120374974) |

1、移动Web开发
===========================================================================

1.1、浏览器现状
---------------------------------------------------------------------------

![在这里插入图片描述](https://img-blog.csdnimg.cn/57eefafc787749a7a510deb973930338.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

* 国内的 UC 和 QQ，百度等手机浏览器都是根据 Webkit 修改过来的内核，国内尚无自主研发的内核。

> 总结：兼容移动端主流浏览器，处理 Webkit 内核浏览器即可。

1.2、手机屏幕现状
----------------------------------------------------------------------------

* 移动端设备屏幕尺寸非常多，碎片化严重。
* Android设备有多种分辨率：480x800, 480x854, 540x960, 720x1280，1080x1920等，还有传说中的2K，4k屏。
* 近年来iPhone的碎片化也加剧了，其设备的主要分辨率有：640x960, 640x1136, 750x1334, 1242x2208等。
* `作为开发者无需关注这些分辨率，因为我们常用的尺寸单位是 px 。`

### 1.3、视口viewport

* 视口（viewport）就是浏览器显示页面内容的屏幕区域。 视口可以分为`布局视口、视觉视口和理想视口`
* 我们只需要关注理想视口

### 1.3.1、布局视口layout viewport

* 一般移动设备的浏览器都默认设置了一个布局视口，用于解决早期的PC端页面在手机上显示的问题。
* iOS, Android基本都将这个视口分辨率设置为 980px，所以PC上的网页大多都能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。

![在这里插入图片描述](https://img-blog.csdnimg.cn/a6b00357d121434a8915238dc232ea0d.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 1.3.2、视觉视口 visual viewport

* 字面意思，它是用户正在看到的网站的区域。`注意：是网站的区域。`
* 我们可以通过缩放去操作视觉视口，但不会影响布局视口，布局视口仍保持原来的宽度。

![在这里插入图片描述](https://img-blog.csdnimg.cn/f12230ebf9d3415fbda4e33a1188554f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_19,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 1.3.3、理想视口 ideal viewport🔥

* 为了使网站在移动端有最理想的浏览和阅读宽度而设定
* 理想视口，对设备来讲，是最理想的视口尺寸
* 需要手动添写meta视口标签通知浏览器操作
* meta视口标签的主要目的：布局视口的宽度应该与理想视口的宽度一致，简单理解就是设备有多宽，我们布局的视口就多宽(乔布斯提出的哟)

### 1.3.4、总结

* 视口就是浏览器显示页面内容的屏幕区域
* 视口分为布局视口、视觉视口和理想视口
* 我们移动端布局想要的是理想视口就是手机屏幕有多宽，我们的布局视口就有多宽
* 想要理想视口，我们需要给我们的移动端页面添加 meta视口标签

### 1.3.5、meta视口标签

```
<meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

```

| 属性 | 解释说明 |
| --- | --- |
| width | 宽度设置的是viewport宽度，可以设置device-width特殊值(宽度是设备宽度) |
| initial-scale | 初始缩放比，大于0的数字 |
| maximum-scale | 最大缩放比，大于0的数字 |
| minimum-scale | 最小缩放比，大于0的数字 |
| user-scalable | 用户是否可以缩放，yes或no（1或0） |

### 1.3.6、标准的viewport设置

* 视口宽度和设备保持一致
* 视口的默认缩放比例1.0
* 不允许用户自行缩放
* 最大允许的缩放比例1.0
* 最小允许的缩放比例1.0

1.4、二倍图
-------------------------------------------------------------------------

### 1.4.1、物理像素和物理像素比

* 物理像素点指的是屏幕显示的最小颗粒，是物理真实存在的。这是厂商在出厂时就设置好了,比如苹果6\\7\\8 是 750\* 1334

* 我们开发时候的1px 不是一定等于1个物理像素的

* PC端页面，1个px 等于1个物理像素的，但是移动端就不尽相同

* 一个px的能显示的物理像素点的个数，称为物理像素比或屏幕像素比

* PC端 和 早前的手机屏幕 / 普通手机屏幕: 1CSS像素 = 1 物理像素的

Retina（视网膜屏幕）是一种显示技术，可以将把更多的物理像素点压缩至一块屏幕里，从而达到更高的分辨率，并提高屏幕显示的细腻程度。由于 Retina 的出现，对于一张 50px \* 50px 的图片,在手机 Retina
屏中打开，按照刚才的物理像素比会放大倍数，这样会造成图片模糊。

`例如：我们需要一个 50\*50 像素(css像素)的图片，直接放到我们的手机里面会放大2倍变成 100 \* 100，这样就会模糊。`

`解决办法：我们直接放一个 100 \* 100 图片，然后手动的把这个图片缩小为 50 \* 50。这样将图放到手机里面，手机自动放大2倍变成 100 \* 100，这样就不会造成图片模糊`

我们准备的图片，比我们实际需要的大小大2倍，这种方式就是二倍图

### 1.4.2、背景缩放 background-size

我们的图片需要进行放大处理，那么我们的背景图片也是需要进行缩放处理。

```
background-size: 背景图片宽度 背景图片高度;

```

* 单位： 长度|百分比|cover|contain
* cover把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
* contain把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域

### 1.4.3、多倍图切图cutterman

![在这里插入图片描述](https://img-blog.csdnimg.cn/81a160b2e6664fafbe10c0694784a4d2.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

1.5、移动端开发选择
-----------------------------------------------------------------------------

1. 单独制作移动端页面(主流)，通常情况下，网址域名前面加 m(mobile) 可以打开移动端。
    * m.taobao.com
    * m.jd.com
    * m.suning.com
    * 通过判断设备，如果是移动设备打开，则跳到移动端页面。
2. 响应式页面兼容移动端(其次)

1.6、移动端浏览器
----------------------------------------------------------------------------

* 移动端浏览器基本以 webkit 内核为主，因此我们就考虑webkit兼容性问题。

* 我们可以放心使用 H5 标签和 CSS3 样式。

* 同时我们浏览器的私有前缀我们只需要考虑添加 webkit 即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/e934a7c1ac8b45f4b48d9bdae62e1a01.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

1.7、CSS初始化 normalize.css
------------------------------------------------------------------------------------------

移动端 CSS 初始化推荐使用 normalize.css

官网地址：[http://necolas.github.io/normalize.css/](http://necolas.github.io/normalize.css/)

1.8、CSS3盒子模型 box-sizing
-----------------------------------------------------------------------------------------

* 传统模式宽度计算：盒子的宽度 = CSS中设置的width + border + padding
* CSS3盒子模型： 盒子的宽度 = CSS中设置的宽度width，里面包含了 border 和 padding

也就是说，我们的CSS3中的盒子模型， padding 和 border 不会撑大盒子了

```
/*CSS3盒子模型*/
box-sizing: border-box;
/*传统盒子模型*/
box-sizing: content-box;

```

* 移动端可以全部CSS3 盒子模型
* PC端如果完全需要兼容，我们就用传统模式，如果不考虑兼容性，我们就选择 CSS3 盒子模型

1.9、特殊样式
--------------------------------------------------------------------------

```
/*CSS3盒子模型*/
box-sizing: border-box;
-webkit-box-sizing: border-box;

/*点击高亮我们需要清除 设置为transparent 完成透明*/
-webkit-tap-highlight-color: transparent;

/*在移动端浏览器默认的外观在iOS上加上这个属性才能给按钮和输入框自定义样式*/
-webkit-appearance: none;

/*禁用长按页面时的弹出菜单*/
img,a { 
    -webkit-touch-callout: none;
}

```

2、移动端常见布局
===========================================================================

![在这里插入图片描述](https://img-blog.csdnimg.cn/31944f6dcdbe424b95efb6209f9fc7d0.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

2.1、流式布局(百分比布局)
---------------------------------------------------------------------------------

* 流式布局，就是百分比布局，也称非固定像素布局。
* 通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充。

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        section {
            width: 100%;
            max-width: 980px;
            min-width: 320px;
            margin: 0 auto;
        }
        
        section div {
            float: left;
            width: 50%;
            height: 400px;
        }
        
        section div:nth-child(1) {
            background-color: pink;
        }
        
        section div:nth-child(2) {
            background-color: purple;
        }
    </style>
</head>

<body>
    <section>
        <div></div>
        <div></div>
    </section>
</body>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4898866c139346498a48354784a80789.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

2.4、背景颜色渐变
----------------------------------------------------------------------------

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 600px;
            height: 200px;
            /* 背景渐变必须添加浏览器私有前缀 */
            /* background: -webkit-linear-gradient(left, red, blue); */
            /* background: -webkit-linear-gradient(red, blue); */
            background: -webkit-linear-gradient(top left, red, blue);
        }
    </style>
</head>

<body>
    <div></div>
</body>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/974fa15e13cb47f0bc7a265d59f2b33c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

2.5、rem适配布局
-----------------------------------------------------------------------------

我们来看几个问题：

1. 页面布局文字能否随着屏幕大小变化而变化？
2. 流式布局和flex布局主要针对于宽度布局，那高度如何设置？
3. 怎么样让屏幕发生变化的时候元素高度和宽度等比例缩放？

### 2.5.1、rem基础

* rem (root em)是一个相对单位，类似于em，em是父元素字体大小。
* 不同的是rem的基准是相对于html元素的字体大小。
    * 比如，根元素（html）设置font-size=12px; 非根元素设置width:2rem; 则换成px表示就是24px
    * rem的优势：父元素文字大小可能不一致， 但是整个页面只有一个html，可以很好来控制整个页面的元素大小

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        html {
            font-size: 12px;
        }
        
        div {
            font-size: 12px;
            width: 15rem;
            height: 15rem;
            background-color: purple;
        }
        
        p {
            /* 1. em相对于父元素 的字体大小来说的 */
            /* width: 10em;
            height: 10em; */
            /* 2. rem 相对于 html元素 字体大小来说的 */
            width: 10rem;
            height: 10rem;
            background-color: pink;
            /* 3.rem的优点就是可以通过修改html里面的文字大小来改变页面中元素的大小可以整体控制 */
        }
    </style>
</head>

<body>
    <div>
        <p></p>
    </div>

</body>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/f6708feda7904832b76d87995ad02bd3.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_18,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 2.5.2、媒体查询

媒体查询（Media Query）是CSS3新语法。

* 使用 @media 查询，可以针对不同的媒体类型定义不同的样式
* `@media 可以针对不同的屏幕尺寸设置不同的样式`
* 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面
* 目前针对很多苹果手机、Android手机，平板等设备都用得到多媒体查询

语法如下：

```
@media mediatype and|not|only(media feature){
    CSS-code
}

```

* 用 @media 开头 注意@符号
* mediatype 媒体类型
* 关键字 and not only
* media feature 媒体特性 必须有小括号包含

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        /* 这句话的意思就是： 在我们屏幕上 并且 最大的宽度是 800像素 设置我们想要的样式 */
        /* max-width 小于等于800 */
        /* 媒体查询可以根据不同的屏幕尺寸在改变不同的样式 */
        
        @media screen and (max-width: 800px) {
            body {
                background-color: pink;
            }
        }
        
        @media screen and (max-width: 500px) {
            body {
                background-color: purple;
            }
        }
    </style>
</head>

```

上面代码的意思是在我们屏幕上页面处于 500px-800px 之间，页面背景颜色显示为 pink 色。页面小于 500px，背景颜色显示为 purple 色

#### 2.5.2.1、mediatype查询类型

将不同的终端设备划分成不同的类型，称为媒体类型

| 值 | 解释说明 |
| --- | --- |
| all | 用于所有设备 |
| print | 用于打印机和打印预览 |
| `scree` | `用于电脑屏幕、平板电脑、智能手机等` |

#### 2.5.2.2、关键字

关键字将媒体类型或多个媒体特性连接到一起做为媒体查询的条件。

* and：可以将多个媒体特性连接到一起，相当于“且”的意思。
* not：排除某个媒体类型，相当于“非”的意思，可以省略。
* only：指定某个特定的媒体类型，可以省略。

#### 2.5.2.3、媒体特性

每种媒体类型都具体各自不同的特性，根据不同媒体类型的媒体特性设置不同的展示风格。我们暂且了解三个。`注意他们要加小括号包含`。

| 值 | 解释 |
| --- | --- |
| width | 定义输出设备中页面可见区域的宽度 |
| min-width | 定义输出设备中页面最小可见区域宽度 |
| max-width | 定义输出设备中页面最大可见区域宽度 |

注意： 为了防止混乱，媒体查询我们要按照从小到大或者从大到小的顺序来写,但是我们最喜欢的还是从小到大来写，这样代码更简洁

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        /* 1. 媒体查询一般按照从大到小或者 从小到大的顺序来 */
        /* 2. 小于540px 页面的背景颜色变为蓝色 */
        
        @media screen and (max-width: 539px) {
            body {
                background-color: blue;
            }
        }
        /* 3. 540 ~ 970 我们的页面颜色改为 绿色 */
        /* @media screen and (min-width: 540px) and (max-width: 969px) {
            body {
                background-color: green;
            }
        } */
        
        @media screen and (min-width: 540px) {
            body {
                background-color: green;
            }
        }
        /* 4. 大于等于970 我们页面的颜色改为 红色 */
        
        @media screen and (min-width: 970px) {
            body {
                background-color: red;
            }
        }
        /* 5. screen 还有 and 必须带上不能省略的 */
        /* 6. 我们的数字后面必须跟单位  970px   这个 px 不能省略的 */
    </style>
</head>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9ebceb16c2f04d2da6d4425202bf1b86.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 2.5.3、媒体查询+rem实现元素动态大小变化

* rem单位是跟着html来走的，有了rem页面元素可以设置不同大小尺寸
* 媒体查询可以根据不同设备宽度来修改样式
* 媒体查询+rem 就可以实现不同设备宽度，实现页面元素大小的动态变化

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        /* html {
            font-size: 100px;
        } */
        /* 从小到大的顺序 */
        
        @media screen and (min-width: 320px) {
            html {
                font-size: 50px;
            }
        }
        
        @media screen and (min-width: 640px) {
            html {
                font-size: 100px;
            }
        }
        
        .top {
            height: 1rem;
            font-size: .5rem;
            background-color: green;
            color: #fff;
            text-align: center;
            line-height: 1rem;
        }
    </style>
</head>
<body>
    <div class="top">购物车</div>
</body>

```

上述代码的意思是：屏幕尺寸小于320px， div 大小为 0.5\*50 = 25px，屏幕尺寸大于 320px 小于 640px， div 大小为 0.5 \* 100 = 50px

### 2.5.4、引入资源

* 当样式比较繁多的时候，我们可以针对不同的媒体使用不同 stylesheets（样式表）。
* 原理，就是直接在link中判断设备的尺寸，然后引用不同的css文件。

语法：

```
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">

```

示例：

```
<link rel="stylesheet" href="styleA.css" media="screen and (min-width: 400px)">

```

### 2.5.5、Less

CSS 是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念。

* CSS 需要书写大量看似没有逻辑的代码，CSS 冗余度是比较高的。
* 不方便维护及扩展，不利于复用。
* CSS 没有很好的计算能力
* 非前端开发工程师来讲，往往会因为缺少 CSS 编写经验而很难写出组织良好且易于维护的 CSS 代码项目。

Less （Leaner Style Sheets 的缩写） 是一门 CSS 扩展语言，也成为CSS预处理器。

* 做为 CSS 的一种形式的扩展，它并没有减少 CSS 的功能，而是在现有的 CSS 语法上，为CSS加入程序式语言的特性。

* 它在 CSS 的语法基础之上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了 CSS 的编写，并且降低了 CSS 的维护成本，就像它的名称所说的那样，Less 可以让我们用更少的代码做更多的事情。

* Less中文网址： http://lesscss.cn/

* Less 是一门 CSS 预处理语言，它扩展了CSS的动态特性。

#### 2.5.5.1、Less安装

安装：(如果使用vscode无需安装less)

```
npm install -g less

```

查看版本：

```
lessc -v 

```

我们首先新建一个后缀名为less的文件， 在这个less文件里面书写less语句。

#### 2.5.5.2、Less变量

```
@变量名: 值;

```

变量命名规范

* 必须有@为前缀
* 不能包含特殊字符
* 不能以数字开头
* 大小写敏感

```
@color: pink;
```

变量是指没有固定的值，可以改变的。因为我们CSS中的一些颜色和数值等经常使用。

```
//直接使用
body{
	color: @color;
}
a:hover{
	color: @color;
}
```

#### 2.5.5.3、Less编译

我们需要把我们的 less文件，编译生成为css文件，这样我们的html页面才能使用。

我们可以在 vscode 安装 `Easy LESS` 插件来把 less 文件编译为 css。安装完毕插件，重新加载下 vscode。只要保存一下Less文件，会自动生成CSS文件。

#### 2.5.5.4、Less嵌套

我们经常用到选择器的嵌套

```
#header .logo {
	width: 300px;
}

#header {
    .logo{
        width: 300px;
    }
}

```

如果遇见 （交集|伪类|伪元素选择器）

* 内层选择器的前面没有 & 符号，则它被解析为父选择器的后代
* 如果有 & 符号，它就被解析为父元素自身或父元素的伪类

```
a:hover{
    color: red;
}

```

```
a{
    &:hover{
        color: red;
    }
}

```

#### 2.5.5.5、Less运算

任何数字、颜色或者变量都可以参与运算。就是Less提供了加（+）、减（-）、乘（\*）、除（/）算术运算。

```
@width: 10px + 5;
div {
    border: @width solid red;
}

/* 生成的css */
div {
    border: 15px solid red;
}

/* Less甚至还可以这样 */
width: (@width + 5) * 2;

```

注意：

* 乘号（\*）和除号（/）的写法
* 运算符中间左右有个空格隔开 1px + 5
* 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位
* 如果两个值之间只有一个值有单位，则运算结果就取该单位

### 2.5.6、rem适配方案

1. 让一些不能等比自适应的元素，达到当设备尺寸发生改变的时候，等比例适配当前设备。
2. 使用媒体查询根据不同设备按比例设置html的字体大小，然后页面元素使用rem做尺寸单位，当html字体大小变化元素尺寸也会发生变化，从而达到等比缩放的适配。

实际开发中适配方案：

1. 按照设计稿与设备宽度的比例，动态计算并设置 html 根标签的 font-size 大小；（媒体查询）
2. CSS 中，设计稿元素的宽、高、相对位置等取值，按照同等比例换算为 rem 为单位的值；

rem 适配方案技术使用

![在这里插入图片描述](https://img-blog.csdnimg.cn/a0b6ea5dab89442096a4d3595c121dc7.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

#### 2.5.6.1、rem实际开发适配方案一

rem + 媒体查询 + less 技术

![在这里插入图片描述](https://img-blog.csdnimg.cn/2f0494ce7c554a6985ac4f0d0db421e4.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

一般情况下，我们以一套或两套效果图适应大部分的屏幕，放弃极端屏或对其优雅降级，牺牲一些效果。现在基本以750为准。

> 动态设置 html 标签 font-size 大小

1. 假设设计稿是750px
2. 假设我们把整个屏幕划分为15等份（划分标准不一可以是20份也可以是10等份）
3. 每一份作为html字体大小，这里就是50px
4. 那么在320px设备的时候，字体大小为320/15 就是 21.33px
5. 用我们页面元素的大小 除以不同的 html 字体大小会发现他们比例还是相同的
6. 比如我们以 750为标准设计稿
7. 一个100\*100像素的页面元素 在 750屏幕下， 就是 100 / 50 转换为rem 是 2rem \* 2 rem 比例是 1比1
8. 320屏幕下， html 字体大小为 21.33 则 2rem = 42.66px 此时宽和高都是 42.66 但是 宽和高的比例还是 1比1
9. 但是已经能实现不同屏幕下 页面元素盒子等比例缩放的效果

> 元素大小取值方法

1. 最后的公式： 页面元素的rem值 = 页面元素值（px） / （屏幕宽度 / 划分的份数）
2. 屏幕宽度/划分的份数 就是 html font-size 的大小
3. 或者： 页面元素的rem值 = 页面元素值（px） / html font-size 字体大小

本文转自 [https://blog.csdn.net/Augenstern\_QXL/article/details/120374974](https://blog.csdn.net/Augenstern_QXL/article/details/120374974)
，如有侵权，请联系删除。