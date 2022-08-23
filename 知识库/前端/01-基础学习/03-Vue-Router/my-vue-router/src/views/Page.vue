<template>
  <div>Page</div>
  <button @click="goPage">click</button>
  <button @click="$router.forward()">前进一步</button>
</template>
<script>
export default {
  methods: {
    goPage() {
      console.log(this.$router);
      // this.$router.push("/parent");
      this.$router.push({
        path: "/user/123",
        query: { name: "小郑" },
      });
    },
  },
};
</script>
