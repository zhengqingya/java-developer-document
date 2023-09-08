# UnoCSS

> tips: 对微信小程序支持不友好，放弃了...

- https://github.com/unocss/unocss
- https://unocss.dev
- [了解UnoCss - 重新构想原子化 CSS](https://antfu.me/posts/reimagine-atomic-css-zh)
- [unocss小程序预设，在 taro uniapp 原生小程序 中使用unocss](https://github.com/MellowCo/unocss-preset-weapp)

- 样式查询 https://unocss.dev/interactive/?s=red

### 使用

```shell
cnpm i -D unocss @unocss/preset-uno @unocss/preset-attributify @unocss/preset-icons @unocss/preset-rem-to-px
```

[vite.config.js](../../vite.config.js)

```
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
// 引入UnoCSS
import UnoCSS from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';

export default defineConfig({
  plugins: [
    uni(),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetRemToPx({
          // iPhone6 1rpx = 0.5px  =>  1px = 2rpx  =>  1rem = 2px = 4rpx
          baseFontSize: 2,
        }),
      ],
      // 自定义规则 https://unocss.dev/config/rules
      // rules: [['m-1', { margin: '1px' }]],
    }),
  ],
})
```

[main.js](../../src/main.js)

```
// UnoCSS
import 'uno.css';
```

使用

```
<view
  class="text-center m-a w-200 h-200 text-100px lh-100px color-red"
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="lg white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200">
  hello world
</view>
```
