后台返回数据格式

```json
{
  "data": "666",
  "code": "200"
}
```

```vue
<template>
  <p>{{ msg }}</p>
  <button @click="getData">请求API数据</button>
</template>
<script>
export default {
  data() {
    return {
      msg: "hi",
    };
  },
  methods: {
    getData() {
      // fetch 原生js，http数据请求  --  默认执行GET请求
      fetch("http://localhost/web/api/demo/test/time")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          this.msg = res.data;
        });
    },
  },
};
</script>
```