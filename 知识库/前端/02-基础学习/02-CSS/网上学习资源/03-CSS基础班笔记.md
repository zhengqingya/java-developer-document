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

![在这里插入图片描述](https://img-blog.csdnimg.cn/9ad8d0ce9563431ebda6267b0f22bb09.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

1、新增选择器🔥
===========================================================================

CSS3 给我们新增了选择器，可以更加便捷，更加自由的选择目标元素。

* 属性选择器
* 结构伪类选择器
* 伪元素选择器

1.1、属性选择器🔥
-----------------------------------------------------------------------------

* 属性选择器可以根据元素特定的属性来选择元素，**这样就可以不用借助于类或者id选择器**

| 选择符 | 简介 |
| --- | --- |
| E\[att\] | 选择具有att属性的E元素 |
| E\[att=“val”\] | 选择具有att属性且属性值等于val的E元素 |
| E\[att^=“val”\] | 匹配具有att属性且值以val开头的E元素 |
| E\[att$=“val”\] | 匹配具有att属性且值以val结尾的E元素 |
| E\[att\*=“val”\] | 匹配具有att属性且值中含有val的E元素 |

1. **利用属性选择器就可以不借助于类或者id选择器**

```
<head>
<style>
        input[value] {
            color: pink;
        }
    </style>
</head>

<body>
    <!-- 1.利用属性选择器可以不借助类或者id选择器 -->
    <input type="text" value="请输入用户名">
    <input type="text">
</body>

```

2. **属性选择器还可以选择 属性 = 值的某些元素**

```
<head>
<style>
        input[type=text] {
            color: pink;
        }
    </style>
</head>

<body>
    <!-- 2.属性选择器还可以选择 属性=值的某些元素 -->
    <input type="text" name="" id="">
    <input type="password" name="" id="">

</body>

```

3. **属性选择器可以选择属性值开头的某些元素**

```
<head>        /* 选择首先是div，然后具有class属性，并且是icon开头的值 */
    <style>    
        div[class^=icon] {
            color: pink;
        }
    </style>
</head>

<body>
    <!-- 3.属性选择器可以选择属性值开头的某些元素 -->
    <div class="icon1">小图标1</div>
    <div class="icon2">小图标2</div>
    <div class="icon3">小图标3</div>
    <div class="icon4">小图标4</div>

</body>

```

4. **属性选择器可以选择属性值结尾的某些元素**

```
<head>
   <style>
        section[class$=data] {
            color: pink;
        }
    </style>
</head>

<body>
    <!-- 4.属性选择器可以选择属性值结尾的某些元素 -->
    <section class="icon1-data">1</section>
    <section class="icon2-data">2</section>
    <section class="icon3-data">3</section>
</body>

```

注意：**类选择器，属性选择器，伪类选择器**，权重为10

1.2、结构伪类选择器🔥
-------------------------------------------------------------------------------

* 结构伪类选择器主要根据**文档结构**来选择元素
* 常用于根据父级选择器选择里面的子元素

| 选择符 | 简介 |
| --- | --- |
| E:first-child | 匹配父元素中的第一个子元素E |
| E:last-child | 匹配父元素中最后一个E元素 |
| E:nth-child(n) | 匹配父元素中的第n个子元素E |
| E:first-of-type | 指定类型E的第一个 |
| E:last-of-type | 指定类型E的最后一个 |
| E:nth-of-type（n） | 指定类型E的第n个 |

### ①、E:first-child 和E:last-child

```
<head>
    <style>
        /* 1.选择ul里面的第一个孩子 小li */
        
        ul li:first-child {
            background-color: pink;
        }
        /* 2.选择ul里面的最后一个孩子 小li */
        
        ul li:last-child {
            background-color: pink;
        }
    </style>
</head>

<body>
    <ul>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ul>

```

### ②、nth-child(n)

* `nth-child(n)`选择某个父级元素的一个或多个特定的子元素（重点）

1. n可以是**数字，关键字和公式**
2. n如果是数字，就是选择第n个子元素，里面数字从1开始
3. n可以是关键字：**even** 偶数，**odd**奇数
4. n可以是公式：常见的公式如下（如果n是公式，则从0开始计算，但是第0个元素或者超出了元素的个数会被忽略）

| 公式 | 取值 |
| --- | --- |
| 2n | 偶数（等价于even） |
| 2n+1 | 奇数（等价于odd） |
| 5n | 5 10 15 …（5的倍数） |
| n+5 | 从第5个开始（包含第五个）到最后 |
| \-n+5 | 前5个（包含第5个） |

```
<head>
	<style>
		/* 选择ul里面的第2个孩子 小li */
        ul li:nth-child(2) {
            background-color: pink;
        }
    </style>
</head>

<body>
    <ul>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ul>
</body>

```

```
<style>
        /* 1.把所有的偶数 even的孩子选出来 */
        ul li:nth-child(even) {
            background-color: #ccc;
        }

        /* 2.把所有的奇数 odd的孩子选出来 */
        ul li:nth-child(odd) {
            background-color: gray;
        }
        /* 3.nth-child(n) 从0开始 每次加1 往后面计算  这里面必须是n 不能是其他的字母 选择了所有的孩子*/
        /* ol li:nth-child(n) {
            background-color: pink;
        } */
        /* 4.nth-child(2n)母选择了所有的偶数孩子 等价于 even*/
        /* ol li:nth-child(2n) {
            background-color: pink;
        }
        ol li:nth-child(2n+1) {
            background-color: skyblue;
        } */
        /* ol li:nth-child(n+3) {
            background-color: pink;
        } */
        ol li:nth-child(-n+3) {
            background-color: pink;
        }
    </style>
</head>

<body>
    <ul>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ul>
    <ol>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ol>
</body>

```

### ③、E:first-of-type和E:last-of-type

| E:first-of-type | 指定类型E的第一个 |
| --- | --- |
| E:last-of-type | 指定类型E的最后一个 |

```
<head>
	<style>
        ul li:first-of-type {
            background-color: pink;
        }
        
        ul li:last-of-type {
            background-color: pink;
        }
        
        ul li:nth-last-child(2) {
            background-color: pink;
        }
	</style>
</head>

<body>
    <ul>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ul>
</body>

```

### ④、区别

* `nth-child(n)`和`nth-of-type(n)`区别?
    1. **nth-child 对父元素里面所有孩子排序选择(序号是固定的)，先找到第n个孩子，然后看看是否和E匹配**
    2. **nth-of-type 对父元素里面指定子元素进行排序选择，先去匹配E,然后再根据E 找第n个孩子**

### ⑤、小结

1. 结构伪类选择器一般用于选择父级里面的第几个孩子
2. nth-child 对父元素里面所有孩子排序选择（序号是固定的），先找到第n个孩子，然后看看是否和E匹配
3. nth-of-type 对父元素里面指定子元素进行排序选择，先去匹配E，然后再根据E找第n个孩子
4. 关于nth-child(n)， 我们要知道n是从0开始计算的，要记住常用的公式
5. 如果是无序列表，我们肯定用 nth-child 更多
6. 类选择器，属性选择器，伪类选择器，权重为10

1.3、伪元素选择器🔥
------------------------------------------------------------------------------

* 伪元素选择器可以帮我们利用CSS**创建新标签元素**，而不需要HTML标签，从而简化HTML结构

| 选择符 | 简介 |
| --- | --- |
| ::before | 在元素内部的前面插入内容 |
| ::after | 在元素内部的后面插入内容 |

**注意：**

1. before 和 after 创建一个元素，但是是属于**行内元素**

    * before和after 都是一个盒子，都作为父元素的孩子
2. 新创建的这个元素在文档树中是找不到的，所以我们称为**伪元素**

3. 语法：

```
element::before {
    
}

```

4. before是放在内容的前面，after是放在了内容的后面

```
<head>
	<style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
        }
        /* div::before 权重是2 */
        div::before {
            /* 这个content是必须要写的 */
            content: '我';
        }
        
        div::after {
            content: '小猪佩奇';
        }
    </style>
</head>

<body>
    <div>
        是
    </div>

```

* before 和 after 必须有 **content** 属性
* before 在父元素内容的前面创建元素 ，after 在父元素内容的后面插入元素
* **伪元素选择器** 和 **标签选择器** 一样，权重为1

2、CSS3盒子模型🔥
==============================================================================

* CSS3 中可以通过`box-sizing` 来指定盒模型

* 有2个值：这样我们计算盒子大小的方式就发生了改变

    * `content-box`
    * `border-box`

2.1、content-box
---------------------------------------------------------------------------------

```
box-sizing: content-box;

```

* 第一种情况是 CSS 的盒子模型，盒子大小为 width + padding + border

* 此种情况盒子大小为 宽度 + 内边距 + 边框，这也是我们之前写盒子所默认的

2.2、border-box🔥
----------------------------------------------------------------------------------

```
box-sizing: border-box;

```

* 第二种情况是 CSS3 的盒子模型，盒子大小为 width
* 此种情况盒子大小为 宽度，不包括内边距和边框，这样 padding 和 border 就不会撑大盒子了(前提是 padding 和 border 不会超过 width 宽度)
* 我们可以在以后的 css 通配符中添加 CSS3 盒子模型

```
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   /*  这样的话padding和border就不会撑大盒子了 */
}

```

3、C3其他特性
==========================================================================

3.1、滤镜filter
------------------------------------------------------------------------------

* `filter`: CSS属性将模糊或颜色偏移等图形效果应用于元素(图片变模糊)

* 语法：

  ```
  filter: 函数();
  
  ```

* 模糊处理：`blur`,数值越大越模糊

![在这里插入图片描述](https://img-blog.csdnimg.cn/36abbf8cd27c45278bbb1abaa318154b.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

```
<head>
   <style>
        img {
            /* blur 是一个函数，小括号里面的数值越大，图片越模糊，注意数值要加px单位 */
            filter: blur(5px);
        }
    </style>
</head>

<body>
    <img src="images/pink.jpg" alt="">
</body>

```

3.2、calc函数
----------------------------------------------------------------------------

* `calc()` 此CSS函数让你在声明CSS属性值时执行一些计算（计算盒子宽度 width: calc 函数）

*   ```
    width:calc(100% - 80px);
    
    ```

* 括号里面可以使用 + - \* / 来进行计算

```
<head> 
   <style>
        .father {
            width: 300px;
            height: 200px;
            background-color: pink;
        }
        
        .son {
            /* width: 150px; */
            /* son盒子和父亲一样宽，都是100%，son盒子-30px */
            width: calc(100%-30px);
            height: 30px;
            background-color: skyblue;
        }
    </style>
</head>

<body>
    <!-- 需求：我们的子盒子宽度永远比父盒子小30像素 -->
    <div class="father">
        <div class="son"></div>
    </div>
</body>

```

3.3、transition过渡🔥
------------------------------------------------------------------------------------

* `过渡（transition)` 是CSS3中具有颠覆性的特征之一，我们可以在不使用 Flash 动画或JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果

* 过渡动画：是从一个状态渐渐的过渡到另外一个状态

* **过渡经常和：hover一起搭配使用**

```
transition: 要过渡的属性 花费时间 运动曲线 何时开始

```

1. **要过渡的属性**：想要变化的 CSS 属性，宽度高度，背景颜色，内外边距都可以，如果想要所有的属性都变化过渡，写一个all就可以。
2. **花费时间**：单位是秒(必须写单位) 比如0.5s
3. **运动曲线**：默认是ease(可以省略)
4. **何时开始**：单位是秒(必须写单位)，可以设置延迟触发事件，默认是0s(可以省略)

![在这里插入图片描述](https://img-blog.csdnimg.cn/d43d923b09644f668bbedad8b05c10b0.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

过渡的口诀：谁做过渡给谁加

```
<head>
   <style>
        div {
            width: 200px;
            height: 100px;
            background-color: pink;
            /* transition: 变化的属性 花费时间 运动曲线 何时开始; */
            /* 如果想要写多个属性，利用逗号进行分割 */
            transition: width 0.5s, height 0.5s;
            /* 如果想要多个属性都变化，属性写all就可以了 */
            transition: all 0.5s;
        }
        
        div:hover {
            width: 400px;
            height: 200px;
            background-color: red;
        }
    </style>
</head>

<body>
    <div></div>
</body>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/39577c89a4ed4f03968fe0927142901d.gif#pic_center)

3.4、2D转换🔥
----------------------------------------------------------------------------

`转换(transform)`是CSS3中具有颠覆性的特征之一，可以实现元素的位移，旋转，缩放等效果

* 移动：translate
* 旋转：rotate
* 缩放：scale

二维坐标系：

2D转换是改变标签在二维平面上的位置和形状的一种技术，先来学习二维坐标系

![在这里插入图片描述](https://img-blog.csdnimg.cn/b00b7fe0cb594342ad86ea06bf2b0123.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

### ①移动translate🔥

2D移动是2D转换里面的一种功能，可以改变元素在页面中的位置，**类似**定位。

语法：

```
transform:translate(x,y); 
/* 或者分开写 */
transform:translateX(n);
transform:translateY(n);

transform:translate(100px,100px);
/* 如果只移动X轴           */
transform:translate(100px,0);
translateX(100px);

```

1. 定义2D转换中的移动，沿着X和Y轴移动元素
2. translate 最大的优点：**不会影响到其他元素的位置**
3. translate 中的百分比单位是**相对于自身元素**的
    * `translate:(50%,50%);`
4. 对行内标签没有效果

### ②旋转rotate🔥

2D旋转指的是让元素在2维平面内顺时针旋转或者逆时针旋转。

```
transform: rotate(度数)

```

1. rotate 里面跟度数，单位是 deg 比如 rotate(45deg)
2. **角度为正时，顺时针，负时，为逆时针**
3. 默认旋转的中心点是元素的中心点

```
<head>
   <style>
        img {
            width: 150px;
            border-radius: 50%;
            border: 5px solid pink;
            /* 过渡写到本身，谁做动画给谁加 */
            transition: all 0.3s;
        }
        
        img:hover {
            transform: rotate(360deg);
        }
    </style>
</head>

<body>
    <img src="#" alt="">
</body>

```

### ③旋转中心点transform-origin🔥

2D转换中心点：我们可以设置元素转换的中心点 transform-origin

```
transform-origin: x y;

```

1. 注意后面的参数x 和 y 用空格隔开
2. x y **默认**转换的中心点是元素的中心点(50% 50%)
3. 还可以给x y 设置 像素或者方位名词(top bottom left right center)

```
<head>
   <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            margin: 100px auto;
            transition: all 1s;
            /* 1.可以跟方位名词 ,以左下角为轴进行旋转*/
            transform-origin: left bottom;
        }
        
        div:hover {
            transform: rotate(360deg);
        }
    </style>
</head>

<body>
    <div></div>
</body>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/878efeeac08f4722b5d0e99abffe72b1.gif#pic_center)

3.5、缩放scale🔥
-------------------------------------------------------------------------------

缩放：`scale`,只要给元素添加上了这个属性就能控制它放大还是缩小

```
transform: scale(x,y);

```

1. 注意其中的x和y用逗号分割
2. `transform:scale(1,1)`: 宽和高都放大一倍，相当于没有放大
3. `transform:scale(2,2)`：宽和高都放大了2倍
4. `transform:scale(2)`：只写一个参数，第二个参数则和第一个参数一样，相当于 `scale(2,2)`
5. `transform:scale(0.5,0.5)`：缩小
6. sacle缩放最大的优势：可以设置转换中心点缩放，默认以中心点缩放的，而且不影响其他盒子

```
<head>
   <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            margin: 100px auto;
        }
        
        div:hover {
            /* 1.里面写的数字不跟单位 就是倍数的意思 1就是1倍，2就是2倍 */
            transform: scale(2, 2);
        }
    </style>
</head>

<body>
    <div></div>
</body>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/8ed7936823c1439a83c0a4e3eb729e8c.gif#pic_center)

3.6、2D转换综合写法🔥
--------------------------------------------------------------------------------

1. 同时使用多个转换，其格式为: transform:translate() rotate() scale() 移动-旋转-缩放
2. 其顺序会影响转换的效果(先旋转会改变坐标轴方向)
3. **当我们同时有位移和其他属性时候，记得要将位移放到最前面**

```
<head>   
   <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            transition: all .5s;
        }
        
        div:hover {
            /* 我们同时有位移和其他属性，我们需要把位移放到最前面 位移，旋转，缩放*/
            transform: translate(150px, 50px) rotate(180deg) scale(1.2);
        }
    </style>
</head>

<body>
    <div></div>
</body>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/852dd70d190649ac99b84d307c5fdec0.gif#pic_center)

3.7、2D转换总结🔥
------------------------------------------------------------------------------

* 转换transform 我们简单理解就是变形 有2D 和 3D 之分
* 我们暂且学了三个 分别是 位移 旋转 和 缩放
* 2D 移动 translate(x, y) 最大的优势是不影响其他盒子， 里面参数用%，是相对于自身宽度和高度来计算的
* 可以分开写比如 translateX(x) 和 translateY(y)
* 2D 旋转 rotate(度数) 可以实现旋转元素 度数的单位是deg
* 2D 缩放 sacle(x,y) 里面参数是数字 不跟单位 可以是小数 最大的优势 不影响其他盒子
* 设置转换中心点 transform-origin : x y; 参数可以百分比、像素或者是方位名词
* l**当我们进行综合写法，同时有位移和其他属性的时候，记得要将位移放到最前**

4、C3动画🔥
==========================================================================

动画 animation是CSS3中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。

相比较过渡，动画可以实现更多变化，更多控制，连续自动播放等效果。

制作动画分为两步：

* 先定义动画
* 再使用（调用）动画

4.1、用keyframs定义动画🔥
-------------------------------------------------------------------------------------

用 keyframes 定义动画（类似定义类选择器）

```
@keyframes 动画名称 {
   0%{
        width:100px;
   }  
   100%{
        width:200px;
   }
}

```

* 0% 是动画的开始，100% 是动画的完成。这样的规则就是动画序列。
* 在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果
* 动画是使元素从一种样式逐渐变化为另一种样式的效果。您可以改变任意多的样式任意多的次数。
* 请用百分比来规定变化发生的时间，或用关键词 “from” 和 “to”，等同于 0% 和 100%。

4.2、使用动画🔥
----------------------------------------------------------------------------

```
div {
       width: 200px;
       height: 200px;
       background-color: aqua;
       margin: 100px auto;
       /* 调用动画 */
       animation-name: 动画名称;
       /* 持续时间 */
       animation-duration: 持续时间;
    }

```

4.3、示例
------------------------------------------------------------------------

需求：我们想页面一打开，一个盒子就从左边走到右边

```
<head> 
   <style>
        /* 需求：我们想页面一打开，一个盒子就从左边走到右边 */
        /* 1.定义动画 */
        
        @keyframes move {
            /* 开始状态 */
            0% {
                transform: translateX(0px);
            }
            /* 结束状态 */
            100% {
                transform: translateX(1000px);
            }
        }
        
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            /* 使用动画 */
            animation-name: move;
            /* 持续时间 */
            animation-duration: 2s;
        }
    </style>
</head>

<body>
    <div></div>
</body>

```

> from to 语法

```
<head>  
   <style>
        /* 需求：我们想页面一打开，一个盒子就从左边走到右边 */
        /* 1.定义动画 */
        
        @keyframes move {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(1000px, 0);
            }
        }
        
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            /* 使用动画 */
            animation-name: move;
            /* 持续时间 */
            animation-duration: 2s;
        }
    </style>
</head>

<body>
    <div></div>
</body>

```

4.4、动画常用属性🔥
------------------------------------------------------------------------------

| **属性** | **描述** |
| --- | --- |
| @keyframes | 规定动画。 |
| animation | 所有动画属性的简写属性，除了animation-play-state属性。 |
| animation-name | 规定@keyframes动画的名称。（**必须的**） |
| animation-duration | 规定动画完成一个周期所花费的秒或毫秒，默认是0。（**必须的**） |
| animation-timing-function | 规定动画的速度曲线，默认是“ease”。 |
| animation-delay | 规定动画何时开始，默认是0。 |
| animation-iteration-count | 规定动画被播放的次数，默认是1，还有infinite |
| animation-direction | 规定动画是否在下一周期逆向播放，默认是“normal“,alternate逆播放 |
| animation-play-state | 规定动画是否正在运行或暂停。默认是"running",还有"paused"。 |
| animation-fill-mode | 规定动画结束后状态，保持forwards回到起始backwards |

动画的简写属性

```
/* animation：动画名称 持续时间 运动曲线  何时开始  播放次数  是否反方向  动画起始或者结束的状态 */

animation: myfirst 5s linear 2s infinite alternate;

```

4.5、动画简写属性🔥
------------------------------------------------------------------------------

animation：动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画起始或者结束的状态;

```
animation: myfirst 5s linear 2s infinite alternate;

```

* 简写属性里面不包含 animation-play-state
* 暂停动画：animation-play-state: puased; 经常和鼠标经过等其他配合使用
* l想要动画走回来 ，而不是直接跳回来：animation-direction: alternate
* 盒子动画结束后，停在结束位置： animation-fill-mode : forwards

4.6、速度曲线细节
----------------------------------------------------------------------------

* `animation-timing-function`：规定动画的速度曲线，默认是“ease”

| **值** | **描述** |
| --- | --- |
| linear | 动画从头到尾的速度是相同的。匀速 |
| ease | 默认。动画以低速开始，然后加快，在结束前变慢。 |
| ease-in | 动画以低速开始。 |
| ease-out | 动画以低速结束。 |
| ease-in-out | 动画以低速开始和结束。 |
| steps() | 指定了时间函数中的间隔数量（步长） |

5、3D转换🔥
==========================================================================

我们生活的环境是3D的，照片就是3D物体在2D平面呈现的例子.

3D转换的特点：

* 近大远小。
* 物体后面遮挡不可见

当我们在网页上构建3D效果的时候参考这些特点就能产出3D效果。

5.1、三维坐标系🔥
-----------------------------------------------------------------------------

三维坐标系其实就是指立体空间，立体空间是由3个轴共同组成的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/8b3f76c171604b64975e75c1e3d7367b.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

* x轴：水平向右 **注意： x 右边是正值，左边是负值**
* y轴：垂直向下 **注意： y 下面是正值，上面是负值**
* z轴：垂直屏幕 **注意： 往外面是正值，往里面是负值**

3D 转换我们主要学习工作中最常用的 3D 位移 和 3D 旋转

5.2、3D位移translate3d🔥
---------------------------------------------------------------------------------------

3D移动在2D移动的基础上多加了一个可以移动的方向，就是z轴方向

* `translform:translateX(100px)`：仅仅是在x轴上移动
* `translform:translateY(100px)`：仅仅是在Y轴上移动
* `translform:translateZ(100px)`：仅仅是在Z轴上移动（注意：translateZ一般用px单位）
* `transform:translate3d(x,y,z)`：其中 x、y、z 分别指要移动的轴的方向的距离

因为z轴是垂直屏幕，由里指向外面，所以默认是看不到元素在z轴的方向上移动

5.3、透视perspective🔥
-------------------------------------------------------------------------------------

**透视**：在2D平面产生近大远小视觉立体，但是只是效果二维的

* 如果想要在网页产生3D效果需要透视（理解成3D物体投影在2D平面内）
* 模拟人类的视觉位置，可认为安排一只眼睛去看
* 透视我们也称为视距：视距就是人的眼睛到屏幕的距离
* 距离视觉点越近的在电脑平面成像越大，越远成像越小
* 透视的单位是像素

**透视写在被观察元素的父盒子上面的**

![在这里插入图片描述](https://img-blog.csdnimg.cn/07b834ed67b14d038613fdb993b161e3.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

d：就是视距，视距就是一个距离人的眼睛到屏幕的距离。

z：就是 z轴，物体距离屏幕的距离，z轴越大（正值） 我们看到的物体就越大

### ①translateZ🔥

* translform:translateZ(100px)：仅仅是在Z轴上移动。
* 有了透视，就能看到translateZ 引起的变化了
    * translateZ：近大远小
    * translateZ：往外是正值
    * translateZ：往里是负值

![在这里插入图片描述](https://img-blog.csdnimg.cn/fc804561fd5d4f6f892404c3df05dde6.gif#pic_center)

5.4、3D旋转rotate3d🔥
------------------------------------------------------------------------------------

3D旋转：3D旋转指可以让元素在三维平面内沿着 x轴，y轴，z轴或者自定义轴进行旋转。

* transform: rotateX(45deg) ：沿着X轴正方向旋转45度
* transform: rotateY(45deg) ：沿着Y轴正方向旋转45度
* transform: rotateZ(45deg) ：沿着Z轴正方向旋转45度
* transform: rotate3d(x,y,z,deg) ：沿着自定义轴旋转 deg为角度(了解即可)

xyz是表示旋转轴的矢量，是标示你是否希望沿着该轴旋转，最后一个标示旋转的角度。

```
/*沿着X轴旋转45deg*/
transform: rotate3d(1,0,0,45deg) 
/*沿着对角线旋转45deg*/
transform: rotate3d(1,1,0,45deg) 

```

### 👉左手准则①

* 左手的手拇指指向 x轴的正方向
* 其余手指的弯曲方向就是该元素沿着x轴旋转的方向

![在这里插入图片描述](https://img-blog.csdnimg.cn/6eccd83b5b2e48adbeadb673c96ed0fc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

### 👉左手准则②

* 左手的手拇指指向 y轴的正方向
* 其余手指的弯曲方向就是该元素沿着y轴旋转的方向（正值）  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/70b7feb515b24793a832060719ed33d6.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Sf5ZG95piv5pyJ5YWJ55qE,size_16,color_FFFFFF,t_70,g_se,x_16)

5.5、3D呈现transform-style🔥
-------------------------------------------------------------------------------------------

3D呈现：transform-style

1. 控制子元素是否开启三维立体环境
2. `transform-style: flat` 子元素不开启3d立体空间 默认的
3. `transform-style: preserve-3d` 子元素开启立体空间
4. **代码写给父级**，但是影响的是子盒子
5. 这个属性很重要

![在这里插入图片描述](https://img-blog.csdnimg.cn/8d5527a9b56c430e924853c5669c4d2c.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

本文转自 [https://blog.csdn.net/Augenstern\_QXL/article/details/115726577](https://blog.csdn.net/Augenstern_QXL/article/details/115726577)
，如有侵权，请联系删除。