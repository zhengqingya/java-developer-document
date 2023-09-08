# Sass

> tips: 可使用原子化CSS减轻代码量 eg: [UnoCSS](./23-UnoCSS.md)

### 一、安装

```shell
cnpm install sass --save-dev
```

### 二、scss使用循环实现动态样式

见 [src/styles](../src/styles)

eg:

#### [custom.scss](../src/styles/custom.scss)

```
// 图片大小
@each $key, $val in sm 50, base 100, lg 160 {
  // img-base
  .img-#{$key} {
    width: #{$val}px !important;
    height: #{$val}px !important;
    border-radius: $val * 0.1px;
  }
}

// 文字超出？行溢出隐藏...  text-overflow-1
@for $i from 1 through 2 {
  .text-overflow-#{$i} {
    display: -webkit-box; /* 使用旧版WebKit内核布局盒模型 */
    -webkit-line-clamp: #{$i}; /* 限制文本显示的行数为2行 */
    -webkit-box-orient: vertical; /* 设置盒模型布局方向为垂直 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 使用省略号表示被截断的部分 */
    // &:hover {
    //   white-space: normal; /* 显示全部 */
    //   overflow: visible; /* 取消超出隐藏 */
    // }
  }
}

@each $key, $val in ('sm': 12px, 'base': 16px, 'lg': 20px) {
  // font-size-base
  .font-size-#{$key} {
    font-size: $val !important;
  }
}
```

#### [flex.scss](../src/styles/flex.scss)

```scss
// flex布局 ********************************************
.flex {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap; // 子元素换行
}
// .flex-1{flex:1}
@for $i from 1 through 6 {
  .flex-#{$i} {
    flex: #{$i};
  }
}
// 设置主轴方向 x y
$direction: (
  // 从左到右（默认值）
  'r': row,
  // 从右到左
  'rr': row-reverse,
  // 从上到下
  'c': column,
  // 从下到上
  'cr': column-reverse
);
// 主轴上子元素排列方式
$justify: (
  // 从头部开始，如果主轴是x轴，则从左到右（默认值）
  'start': flex-start,
  // 在主轴居中对齐(如果主轴是 x 轴则水平居中)
  'center': center,
  // 从尾部开始排列
  'end': flex-end,
  // 先两边贴边，再平分剩余空间☆☆☆
  'between': space-between,
  // 平分剩余空间
  'around': space-around
);
// 侧轴上子元素排列方式
$align: (
  // 从上到下
  'start': flex-start,
  // 挤在一起居中(垂直居中)
  'center': center,
  // 从下到上
  'end': flex-end,
  // 拉伸(默认值)
  'stretch': stretch
);

@each $alignKey, $alignVal in $align {
  @each $justifyKey, $justifyVal in $justify {
    @each $directionKey, $directionVal in $direction {
      // flex-start-center
      .flex-#{$justifyKey}-#{$alignKey} {
        display: flex;
        justify-content: #{$justifyVal};
        align-items: #{$alignVal};
      }
      // flex-r-start-center
      .flex-#{$directionKey}-#{$justifyKey}-#{$alignKey} {
        display: flex;
        flex-direction: #{$directionVal};
        justify-content: #{$justifyVal};
        align-items: #{$alignVal};
      }
    }
  }
}
```

#### [color.scss](../src/styles/color.scss)

```
// 循环实现动态样式
// #{xxx}：字符串  $xx：数值
// 颜色 ********************************************
$color-primary: #00aaff;
$colors: (
  'white': #fff,
  'black': #000,
  'primary': #00aaff,
  'success': #4cd964,
  'warning': #f0ad4e,
  'error': #999,
  'disable': #c0c0c0,
  // 辅助灰色，如加载更多的提示信息
  'grey': #999,
  // 浅灰色
  'lightgrey': #f6f6f6,
  'placeholder': #808080,
  'red': #ff0000,
  // 点击状态颜色
  'hover': #f1f1f1,
  // 遮罩颜色
  'mask': rgba(0, 0, 0, 0.4),
);
@each $key, $value in $colors {
  .text-color-#{$key} {
    color: $value;
  }
  .bg-color-#{$key} {
    background-color: $value;
  }
}
```

#### [margin-padding.scss](../src/styles/margin-padding.scss)

```
// 内外边距 ********************************************
// 类型
$spacing-types: (
  m: margin,
  p: padding,
);
// 位置
$spacing-directions: (
  t: top,
  b: bottom,
  l: left,
  r: right,
);
$spacing-base-size: 1px; // 基数
// 循环出 margin 与 padding 的各类值
@each $typeKey, $type in $spacing-types {
  @for $i from 1 through 30 {
    // 如果能够被 2 整除，将应用以下样式
    @if ($i % 2 == 0) {
      // m-10{margin:10px} || p-30{padding:30px}
      .#{$typeKey}-#{$i} {
        #{$type}: $i * $spacing-base-size !important;
      }
      // m-x-10{marfin-left:10px;marfin-right:10px} || p-x-30{padding-left:30px;padding-right:30px;}
      .#{$typeKey}-x-#{$i} {
        #{$type}-left: $i * $spacing-base-size;
        #{$type}-right: $i * $spacing-base-size;
      }
      // m-y-10{marfin-top:10px;marfin-bottom:10px} || p-y-30{padding-top:30px;padding-bottom:30px;}
      .#{$typeKey}-y-#{$i} {
        #{$type}-top: $i * $spacing-base-size;
        #{$type}-bottom: $i * $spacing-base-size;
      }
      // m-t-10{margin-top: 10px} || m-l-10{margin-left:10px} || p-r-10{padding-right:10px} || p-b-10{paddding-bottom:10px}
      @each $directionsKey, $directions in $spacing-directions {
        .#{$typeKey}-#{$directionsKey}-#{$i} {
          #{$type}-#{$directions}: $i * $spacing-base-size !important;
        }
      }
    }
  }
}
```

#### [other.scss](../src/styles/other.scss)

```
// 文字水平对齐方式 ********************************************
@each $var in (left, center, right) {
  .text-#{$var} {
    text-align: $var;
  }
}

// ********************************************
.overflow-x-scroll {
  overflow-x: scroll; // 水平方向超出滚动
}
.overflow-y-scroll {
  overflow-y: scroll; // 垂直方向超出滚动
}
.overflow-y-auto {
  overflow-y: auto; // 垂直方向高度超出后才显示滚动条
}
.overflow-x-hidden {
  overflow-x: hidden;
}

// 字体 ********************************************
.font-bold {
  font-weight: bold;
}

// 边框颜色 ********************************************
// 类名  .border-b
// $orientation: (
//   t: top,
//   b: bottom,
//   l: left,
//   r: right,
// );
// @each $orientationKey, $orientationVal in $orientation {
//   .border-#{$orientationKey} {
//     border-#{$orientationVal}: 1px solid #e4e4ee;
//   }
// }

// *******************************************************
// 外边框圆角
@for $i from 1 through 10 {
  // 如果能够被 2 整除，将应用以下样式
  @if ($i % 2 == 0) {
    // b-rd-6
    .b-rd-#{$i} {
      border-radius: #{$i}px;
    }
  }
}

.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}

// 宽高
@for $i from 0 through 500 {
  @each $key, $val in w width, h height, lh line-height {
    // 如果能够被 10 整除，将应用以下样式
    @if ($i % 10 == 0) {
      // w-20 || lh-100
      .#{$key}-#{$i} {
        #{$val}: 1px * $i;
      }
    }
  }
}

.position-relative {
  position: relative; // 父：相
}
.position-absolute {
  position: absolute; // 子：绝
}

// 元素显示模式 eg: display-inline-block
@each $val in block, inline, inline-block {
  .display-#{$val} {
    display: #{$val};
  }
}
```
