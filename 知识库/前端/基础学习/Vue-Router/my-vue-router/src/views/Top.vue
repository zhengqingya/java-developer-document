<template>
  <h2>头部</h2>
</template>
<script>
// 选项式API
export default {
  props: ["id"],
  mounted() {
    console.log("top: ", this.id);
  },
};
</script>
