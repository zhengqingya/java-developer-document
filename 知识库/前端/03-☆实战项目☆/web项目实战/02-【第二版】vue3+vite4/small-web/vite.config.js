import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import ReactivityTransform from '@vue-macros/reactivity-transform/vite';
// 引入UnoCSS
import UnoCSS from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取`.env`环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      ReactivityTransform(), // 启用响应式语法糖 $ref ...
      // 解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题
      AutoImport({
        imports: ['vue', 'vue-router'],
      }),
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons(),
          presetRemToPx({
            // 1单位 = 4px -- 如果CSS中没有设置HTML的font-size，那么浏览器默认的字号是16px。 16px / 4px => 1rem = 4px
            baseFontSize: 4,
          }),
        ],
        // 自定义规则 https://unocss.dev/config/rules
        // rules: [['m-1', { margin: '1px' }]],
      }),
    ],
    // 反向代理解决跨域问题
    server: {
      // host: 'localhost', // 只能本地访问
      host: '0.0.0.0', // 局域网别人也可访问
      port: Number(env.VITE_APP_PORT),
      // 运行时自动打开浏览器
      // open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVICE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    resolve: {
      // 配置路径别名
      alias: [
        // @代替src
        {
          find: '@',
          replacement: path.resolve('./src'),
        },
      ],
    },
    // 引入scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          // tips: index.scss在main.js中加载过的无需再次配置 &  下面配置开启后在启动项目第一次访问时会有点慢...
          // additionalData: `@import "@/styles/color.scss";@import "@/styles/theme.scss";`,
        },
      },
    },
  };
});
