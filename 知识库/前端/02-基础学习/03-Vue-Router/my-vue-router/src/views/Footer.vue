<template>
  <h2>尾部</h2>
</template>
<script>
// 选项式API
export default {
  props: ["id"],
  mounted() {
    console.log("footer: ", this.id);
  },
};
</script>
