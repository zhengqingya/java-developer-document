<template>
  <!-- <button>孙子组件：{{ msg }}</button> -->
  <!-- <button>孙子组件：{{ msgObj.msg }}</button> -->
  <!-- <button>孙子组件：{{ msg() }}</button> -->
  <button>孙子组件：{{ newMsg }}</button>
</template>
<script>
export default {
  computed: {
    newMsg() {
      return this.msg();
    },
  },
  // inject: ["msg"],
  inject: ["msg", "msgObj"],
};
</script>
