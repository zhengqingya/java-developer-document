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
  // 反向代理解决跨域问题
  server: {
    proxy: {
      '/dev-api': {
        target: 'http://127.0.0.1:888', // 目标接口
        changeOrigin: true, // 是否换源
        secure: true, // 设置支持https协议的代理
        rewrite: (path) => path.replace(new RegExp('^/dev-api'), ''), // 匹配接口进行转发
      },
    },
  },
});
