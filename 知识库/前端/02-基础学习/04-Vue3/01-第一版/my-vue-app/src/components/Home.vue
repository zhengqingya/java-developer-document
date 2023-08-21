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
