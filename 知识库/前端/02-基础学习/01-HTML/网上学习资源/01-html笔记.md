✍web前端剑法之HTML
===============================================================================

| 🔥web前端剑法之HTML | 地址 |
| --- | --- |
| 🔥HTML冲浪笔记(一) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115419453](https://blog.csdn.net/Augenstern_QXL/article/details/115419453) |
| 🔥HTML5冲浪笔记(二) | [https://blog.csdn.net/Augenstern\_QXL/article/details/115599059](https://blog.csdn.net/Augenstern_QXL/article/details/115599059) |

✍目录总览
=======================================================================

![在这里插入图片描述](https://img-blog.csdnimg.cn/6131a71c675842b7ab5397a46e8ec9ec.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

1、VS插件推荐🔥
============================================================================

| 插件 | 说明 |
| --- | --- |
| Chinese | 中文语言包 |
| Open in Browser | 右击选择浏览器打开html文件 |
| JS-CSS-HTML Formatter | 每次保存，都会格式化代码 |
| Auto Rename Tag | 自动重命名配对的HTML/XML标签 |
| CSS Peek | 追踪至样式 |
| escook-theme | 黑马刘龙彬老师主题 |
| Community Material Theme | 设置颜色主题 |
| Live Server | 自动监测代码修改并在浏览器响应 |
| vscode-icons | 设置文件图标作主题 |

2、 基本结构标签🔥
=============================================================================

| 标签名 | 定义 | 说明 |
| --- | --- | --- |
| `<html></html>` | HTML标签 | 页面中的最大的标签，我们称为根标签 |
| `<head><head>` | 文档的头部 | 注意在head标签中我们必须要设置的标签是title |
| `<title></title>` | 文档的标题 | 让页面拥有一个属于自己的网页标题 |
| `<body></body>` | 文档的主体 | 元素包含文档的所有内容，页面内容基本都是放到body里面的 |

1. HTML 标签是由尖括号包围的关键词，例如 `<html>`
2. HTML 标签通常是成对出现的，例如 `<html>`和`</html>` ，我们称为双标签。标签对中的第一个标签是开始标签，第二个标签是结束标签。
3. 有些特殊的标签必须是单个标签（极少情况），例如`<br />`，我们称为单标签。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>

```

2.1、文档类型声明标签
------------------------------------------------------------------------------

* `<!DOCTYPE>`文档类型声明，作用就是告诉浏览器使用哪种HTML版本来显示网页。

```
<!DOCTYPE html>

```

* 这句代码的意思是: 当前页面采取的是 HTML5 版本来显示网页.
* 注意：
* `<!DOCTYPE>` 声明位于文档中的最前面的位置，处于 `<html>` 标签之前。
* `<!DOCTYPE>` 不是一个 HTML 标签，它就是文档类型声明标签。

2.2、lang语言种类
------------------------------------------------------------------------------

用来定义当前文档显示的语言

* en 定义语言为英语
* zh-CN 定义语言为中文

```
<html lang="en">

```

2.3、字符集
-------------------------------------------------------------------------

在`<head>`标签内，可以通过`<meta>` 标签的 charset 属性来规定 HTML 文档应该使用哪种字符编码。

```
<meta charset = "UTF-8" />

```

* charset 常用的值有：：GB2312 、BIG5 、GBK 和 UTF-8，其中 UTF-8 也被称为万国码，基本包含了全世界所有国家需要用到的字符

3、标签🔥
========================================================================

3.1、标题标签🔥
----------------------------------------------------------------------------

```
<body>
    <h1> 一级标题</h1>
    <h2> 二级标题</h2>
    <h3> 三级标题</h3>
    <h4> 四级标题</h4>
    <h5> 五级标题</h5>
    <h6> 六级标题</h6>
    ------秦晓
</body>

```

* 加了标题的文字会变的加粗，字号也会依次变大
* 一个标题独占一行

3.2、段落标签🔥
----------------------------------------------------------------------------

```
<p>段落标签</p>

```

* paragraph 的缩写
* 文本在一个段落这种会根据浏览器窗口的大小进行自动换行
* 段落和段落之间保有空隙

3.3、换行标签🔥
----------------------------------------------------------------------------

```
<br />

```

* `<br />` 是个单标签
* `<br />` 标签只是简单的开始新的一行，跟段落不一样，段落之间会插入一些垂直的间距。

3.4、文本格式化标签
-----------------------------------------------------------------------------

* 为文字设置**粗体、斜体、下划线**等效果

| 语义 | 标签 |
| --- | --- |
| 加粗 | `<strong></strong>` |
| 倾斜 | `<em><em>` |
| 删除线 | `<del></del>` |
| 下划线 | `<ins></ins>` |

* 重点记忆 加粗 和 倾斜

3.5、盒子标签🔥
----------------------------------------------------------------------------

* `<div></div>` :一行只能放一个大盒子
* `<span></span>` : 一行可以放多个小盒子

```
<div>这是头部</div>
<span>今日价格</span>

```

3.6、图像标签🔥
----------------------------------------------------------------------------

```
<img src="pink1.jpg" alt="我是林晓"  title="我是林晓" />

```

* `src`是`<img>`标签的必须属性，它用于指定图像文件的路径和文件

| 属性 | 属性值 | 说明 |
| --- | --- | --- |
| src | 图片路径 | 必须属性 |
| alt | 文本 | 替换文本（当图片不能显示时候显示的文字） |
| title | 文本 | 提示文本（鼠标放到图像上，显示的文字） |

3.7、路径🔥
--------------------------------------------------------------------------

### 3.7.1、相对路径🔥

| 相对路径分类 | 符号 | 说明 |
| --- | --- | --- |
| 同一级路径 |  | 图形文件位于 HTML 文件同一级 如`<img src="1.png">` |
| 下一级路径 | / | 图形文件位于 HTML 文件下一级 如 `<img src="images/1.png">` |
| 上一级路径 | …/ | 图形文件位于 HTML 文件上一级 如 `<img src="../1.png">` |

### 3.7.2、绝对路径🔥

* 绝对路径：是指目录下的绝对位置，直接到达目标位置，通常是从盘符开始的路径。

3.8、超链接标签🔥
-----------------------------------------------------------------------------

```
<a href="跳转目标" target="目标窗口的弹出方式">文本或图像</a>

```

| 属性 | 作用 |
| --- | --- |
| href | 用于指定链接目标的url地址。必须属性 |
| target | 用于指定连接页面的打开方式。`_self`为默认值，`_blank`为在新窗口中打开 |

* 如果 href 里面地址是一个文件或者压缩包，会下载这个文件

```
<a href="img.zip"></a>

```

3.9、锚点链接
--------------------------------------------------------------------------

作用：点击链接，可以快速定位到页面中的某个位置

* 在链接文本的`href`属性中，设置属性值为 **#名字**
* 找到目标位置标签，里面添加一个 **id属性=刚才的名字**

```
<a href = "#two">第二季</a>
<h3 id = "two">第二季介绍</h3>

```

3.10、注释🔥
---------------------------------------------------------------------------

* 注释快捷键为 `ctrl + /`
* 注释以 `<!--` 开始，以`-->` 结束

```
<!--  注释语句	-->

```

3.11、特殊字符
---------------------------------------------------------------------------

![在这里插入图片描述](https://img-blog.csdnimg.cn/d387d9bdf9ba47acbc0a9173fc7bfb5d.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

重点记住：空格、大于号、小于号 这三个，其余的使用的很少，如果需要使用回头查阅即可

3.12、表格标签🔥
-----------------------------------------------------------------------------

* `table` 用来定义表格的标签
* `tr` 用来定义表格中的行，必须嵌套在`<table></table>` 标签中
* `td` 用来定义表格中的单元格，必须嵌套在`<tr></tr>` 标签中
* `th` 用来定义表格中的表头，表头单元格里面的内容加粗居中显示

```
<body>
    <table>
        <tr>  <th>姓名</th>     <th>性别</th>    <th>年龄</th>        </tr>
        <tr>  <td>林晓</td>     <td>男</td>     <td>18</td>          </tr>  
        <tr>  <td>林晓</td>     <td>男</td>     <td>18</td>          </tr>        
        <tr>  <td>林晓</td>     <td>男</td>     <td>18</td>          </tr>                        
    </table>
</body>

```

3.12、表格属性
---------------------------------------------------------------------------

表格标签的属性实际开发并不常用，因为基本都是通过后面的CSS来设置的

| 属性名 | 属性值 | 描述 |
| --- | --- | --- |
| align | left,center,right | 规定表格相对周围元素的对齐方式 |
| border | 1或者’’ ‘’ | 规定表格单元是否拥有边框，默认为" "，表示没有边框 |
| cellpadding | 像素值 | 规定单元边沿与其内容之间的空白，默认1像素 |
| cellspacing | 像素值 | 规定单元格之间的空白，默认2像素 |
| width | 像素值或百分比 | 规定表格的宽度 |

```
<table align=center border="1" cellpadding="20" cellspacing="0" width="500">

```

### 3.12.1、表格结构标签

为了更好的表示表格的语义，可以将表格分割成 表格头部 和表格主体两大部分

* 用 `<thead></thead>` 标签表示表格的头部区域，`<thead>`内部必须拥有`<tr>`标签，一般是位于第一行
* 用`<tbody></tbody>` 标签表示表格的主体区域，主要是用于放数据本体
* 以上标签都是放在`<table></table>`标签中

![在这里插入图片描述](https://img-blog.csdnimg.cn/b20e2df070ce41b8ba0d5ea101efd153.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

### 3.12.2、合并单元格

* 跨行合并：`rowspan=“合并单元格的个数”`
* 跨列合并：`colspan="合并单元格的个数"`

```
<td colspan = "2"></td>

```

3.13、列表标签🔥
-----------------------------------------------------------------------------

* 无序列表：`<ul>`
* 有序列表：`<ol>`
* 自定义列表：`<dl>`

| 标签名 | 定义 | 说明 |
| --- | --- | --- |
| `<ul></ul>` | 无序列表 | 里面只能包含li，没有顺序。li里面可以包含任何标签 |
| `<ol></ol>` | 有序列表 | 里面只能包含li，有顺序 |
| `<dl></dl>` | 自定义列表 | 里面只能包含dt和dd，dt和dd里面可以放任何标签 |

```
<dl>
     <dt>关注我们</dt>
     <dd>新浪微博</dd>
     <dd>联系我们</dd>
</dl>

```

3.14、表单标签🔥
-----------------------------------------------------------------------------

一个完整的表单通常由**表单域，表单控件（表单元素）和提示信息**3部分组成

![在这里插入图片描述](https://img-blog.csdnimg.cn/ccddea3e9d4b42b0b4ac8713741bde00.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)

### 3.14.1、表单域🔥

* 表单域是一个包含表单元素的区域

* `<form></from>`标签用于定义表单域，会把它范围内的表单元素信息提交给服务器

| 属性 | 属性值 | 作用 |
| --- | --- | --- |
| action | url地址 | 用于指定接收并处理表单数据的服务器程序的url地址 |
| method | get/post | 用于设置表单数据的提交方式，其取值为get或post |
| name | 名称 | 用于指定表单的名称，以区分同一个页面中的多个表单域 |

```
<form action="url地址" method="提交方式" name="表单域的名称">
    
</form>

```

### 3.14.2、表单控件(表单元素)🔥

#### ①input输入表单元素🔥

* `input`输入表单元素
* `input`是个单标签，`type` 属性设置不同的属性用来指定不同的控件类型(文本字段、复选框、单选按钮、按钮等)

type 属性的属性值及描述如下：

| 属性值 | 描述 |
| --- | --- |
| button | 定义可点击按钮(多数情况下，用于通过JavaScript启动脚本) |
| checkbox | 定义复选框 |
| file | 定义输入字段和"浏览"按钮，供文件上传。 |
| hidden | 定义隐藏的输入字段 |
| image | 定义图像形式的提交按钮 |
| password | 定义密码字段。该字段中的字符被掩码 |
| radio | 定义单选按钮 |
| reset | 定义重置按钮。重置按钮会清楚表单中的所有数据。 |
| submit | 定义提交按钮。提交按钮会把表单数据发送到服务器。 |
| text | 定义单行的输入字段，用户可在其中输入文本。默认宽度为 20 个字符。 |

除 type 属性外，`<input>` 标签还有很多其他很多属性，其常用属性如下：

| 属性 | 属性值 | 描述 |
| --- | --- | --- |
| name | 由用户自定义 | 定义 input 元素的名称 |
| value | 由用户自定义 | 规定 input 元素的值 |
| checked | checked | 规定此 input 元素首次加载时应当被选中 |
| maxlength | 正整数 | 规定输入字段中字符的最大长度 |

* name 和 value 是每个表单元素都有的属性值，主要给后端人员使用。
* name 是表单元素的名字，要求 单选框和复选框要有相同的name值
* checked 属性主要针对于单选框和复选框，主要作用是一打开页面，就可以默认选中某个表单元素

#### ②文本框与密码框🔥

* `type` 属性设置为 text 是文本框
* `type` 属性设置为 password 是密码框

```
<body>
    <form>
        用户名：<input type="text"> <br/> 
        密码：<input type="password">
    </form>
</body>

```

#### ③单选框和复选框🔥

* `type` 属性设置为 radio 是单选框
* `type` 属性设置为 checkbox 是复选框
* name 是表单元素的名字，要求 单选框和复选框要有相同的name值

```
<form>
        用户名：<input type="text"> <br> 
        密码：<input type="password"> <br> 
        <!-- radio是单选框，可以多选一 -->
        性别：男<input type="radio"> 女 <input type="radio">
        <!-- checkbox是多选框，可以多选 -->
        爱好：吃饭<input type="checkbox">  睡觉<input type="checkbox">   打游戏<input type="checkbox"> 
</form>

```

#### ④name和value属性🔥

* name属性：当前input表单的名字，后台可以通过这个name属性找到这个表单，name的主要作用就是用于区别不同的表单

```
<form>
        用户名：<input type="text" value="请输入用户名"> <br> 
        密码：<input type="password"> <br> 
        <!-- radio是单选框，可以多选一 -->
        <!-- name是表单元素的名字，这里的性别单选按钮必须有相同的名字name，才能实现多选一 -->
        性别：男<input type="radio" name="sex" value="男"> 女 <input type="radio" name="sex" value="女">
        <!-- checkbox是多选框，可以多选 -->
        爱好：吃饭<input type="checkbox" name="habby" value="吃饭">  睡觉<input type="checkbox" name="habby" value="睡觉">   打游戏<input type="checkbox" name="habby" value="打游戏"> 
</form>

```

* 注意：单选框和复选框name必须一致，value可以不一样

#### ⑤checked和maxlength🔥

* 单选按钮和复选框可以设置**checked** 属性
* 当页面打开时候就可以默认选中这个按钮
* 单选框只能给其中一个加checked，复选框可以多加

```
性别:男<input type="radio" name="sex" value="男" checked="checked"> 女 <input type="radio" name="sex" value="女">

```

* `maxlength`:规定最多输入多少个字符

#### ⑥submit和reset🔥

* `type` 属性设置为submit：提交按钮会把表单数据发送到服务器
* \`\`type\` 属性设置为reset：重置按钮会清除表单中的所有数据

#### ⑦button和文件域🔥

* `type` 属性设置为button：是一个按钮
* `type` 属性设置为file：是一个文件域，可以上传文件

```
<input type="button" value="获取短信验证码"> <br>
    <!-- 文件域：上传文件使用的 -->
    上传头像：<input type="file">

```

#### ⑧label🔥

* `label`标签用于绑定一个表单元素，当点击`<lable>`标签内的文本时，浏览器就会自动将焦点(光标)转到表单元素上，用来增加用户体验
* `label`标签的 for属性 应当与相关元素的id 属性相同

```
<label for="sex"> 男 </lable>
<input type="radio" name="sex" id="sex" />

```

### 3.14.3、select下拉表单元素🔥

* 下拉表单元素
* `<select>`中至少包含一对`<option>`
* 在`<option>`中定义 `selected="selected"` 时，当前项即为默认选中项。

```
<select>
       <option selected="selected">选项1</option>
       <option>选项2</option>
       <option>选项3</option>
       ...
</select>

```

### 3.14.4、textarea文本域元素🔥

* 用于定义多行文本输入的控件

```
<textarea>
    文本内容
</textarea>

```

* cols = “每行中的字符数” ， rows = “显示的函数”，我们在实际开发中不会使用，都是用CSS来改变大小

3.15、表单元素总结
-----------------------------------------------------------------------------

表单元素我们学了三大组

* input 输入表单元素

* select 下拉表单元素

* textarea 文本域表单元素

这三组表单元素都应该包含在 form 表单域里面，并且有 name 属性

本文转自 [https://blog.csdn.net/Augenstern\_QXL/article/details/115419453](https://blog.csdn.net/Augenstern_QXL/article/details/115419453)
，如有侵权，请联系删除。