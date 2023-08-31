<template>
  <div class="title-card" :class="{ 'title-dark-theme': true }">
    <h2>
      <span>{{ title }}</span>
      <div class="prefix">
        <slot name="prefix" />
      </div>
      <div class="append">
        <slot name="append" />
      </div>
    </h2>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题',
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.title-card {
  h2 {
    position: relative;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 13px;
    margin-bottom: 15px;

    span {
      font-size: 14px;
      font-weight: bold;
      color: #303133;
    }

    .prefix {
      display: inline-block;
      margin-left: 20px;
    }

    .append {
      position: absolute;
      right: 0;
      top: -10px;
    }
  }

  .content {
    // margin-left: -40px;
    padding-bottom: 10px;
    position: relative;
  }
}

.title-dark-theme {
  h2 {
    border-bottom: 1px solid #1d2f5e;

    span {
      // color: #fff;
    }
  }
}
</style>
