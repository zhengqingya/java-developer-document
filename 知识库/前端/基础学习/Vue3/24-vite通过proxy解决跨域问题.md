`my-vue-app/vite.config.js`

```js
import {defineConfig} from "知识库/前端/基础学习/Vue3/Vite";
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
```

```vue
<template>
  <p>{{ msg }}</p>
  <button @click="getData">请求API数据</button>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: "hi",
    };
  },
  methods: {
    getData() {
      axios.get("/zqapi/web/api/demo/test/time").then((res) => {
        console.log(res.data);
        this.msg = res.data.data;
      });
    },
  },
};
</script>
```
