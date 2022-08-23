<template>
  <div>order</div>
</template>
<script>
// 选项式API
export default {
  props: ["id"],
  mounted() {
    console.log("order: ", this.id);
  },
};
</script>
