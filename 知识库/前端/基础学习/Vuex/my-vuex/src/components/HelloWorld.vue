<template>
  <h1>{{ $store.state.count }}</h1>
  <button @click="increment">click</button>
  <button @click="increment2(5)">add 5</button>

  <h1>{{ $store.getters.reverMsg }}</h1>
  <h1>{{ $store.getters.reverMsgLength }}</h1>

  <button @click="getData">getData</button>

  <hr />

  <h1>{{ $store.getters["a/getName"] }}</h1>
  <h1>{{ $store.state.a.name }}</h1>

  <hr />

  <h2>{{ count }}</h2>
</template>
<script>
import { mapState } from "vuex";

export default {
  methods: {
    increment() {
      // 提交一个变更
      this.$store.commit("increment");
    },
    increment2(num) {
      // 传值
      this.$store.commit("increment", num);
    },
    getData() {
      this.$store.dispatch("getData", "666");
    },
  },
  computed: mapState({
    // count: (state) => state.count
    count: "count",
  }),
  mounted() {
    console.log("11", this.$store);
  },
};
</script>
