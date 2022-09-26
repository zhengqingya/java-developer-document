<template>
  <h2>{{ getNum }}</h2>
  <h2>{{ count }}</h2>
  <h2>{{ msg }}</h2>
  <h2>{{ reverMsg }}</h2>

  <button @click="addNum">{{ count }}</button>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      num: 2,
    };
  },
  //   computed: mapState({
  //     // count: (state) => state.count
  //     count: "count",
  //   }),
  //   computed: mapState(["count", "msg"]),
  // 与局部计算属性混合使用
  computed: {
    getNum() {
      return this.num * 2;
    },
    addNum() {
      this.increment(10);
    },
    ...mapState(["count", "msg"]),
    ...mapGetters(["reverMsg"]),
  },
  methods: {
    ...mapMutations(["increment"]),
    ...mapActions(["getData"]),
  },
  mounted() {
    this.getData();
    console.log(this.count);
    console.log(this.msg);
  },
};
</script>
