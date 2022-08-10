### axios是什么？

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

http://axios-js.com/zh-cn/docs/index.html

### 安装 axios

```shell
cnpm install axios
```

### 使用

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
      axios.get("http://localhost/web/api/demo/test/time").then((res) => {
        console.log(res.data);
        this.msg = res.data.data;
      });
    },
  },
};
</script>
```