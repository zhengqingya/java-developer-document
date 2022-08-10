import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 中转服务器
  server: {
    // 通过代理实现跨域
    proxy: {
      // /zqapi/web/api/demo/test/time -> http://localhost/web/api/demo/test/time
      "/zqapi": {
        // 服务端地址
        target: "http://localhost",
        // 开启代理，允许跨域
        changeOrigin: true,
        // 重写url
        rewrite: (path) => path.replace(/^\/zqapi/, ""),
      },
    },
  },
});
