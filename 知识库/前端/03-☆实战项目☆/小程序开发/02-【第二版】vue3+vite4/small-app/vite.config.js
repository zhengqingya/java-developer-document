import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 跨域请求（无效配置）
  // server: {
  //     port: 3000,
  //     proxy: {
  //         '/mini': {
  //             target: 'http://127.0.0.1:888/', // 目标服务
  //             changeOrigin: true,
  //             // rewrite: (path) => path.replace(/^\/mini/, ''),
  //             rewrite: (path) => path.replace(new RegExp('^' + '/mini'), ''),
  //         },
  //     },
  // },
});
