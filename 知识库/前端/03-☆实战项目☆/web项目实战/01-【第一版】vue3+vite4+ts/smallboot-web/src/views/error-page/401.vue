<template>
  <base-wraper class="container">
    <div>
      <h1 class="text-jumbo text-ginormous">401错误!</h1>
      <h1>对不起，您没有访问权限，请不要进行非法操作！</h1>
      <h1>您可以返回 <router-link to="/" class="index"> 首页 </router-link></h1>
    </div>
  </base-wraper>
</template>

<script>
export default {
  name: 'Page401',
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  .index {
    color: blue;
  }
}
</style>
