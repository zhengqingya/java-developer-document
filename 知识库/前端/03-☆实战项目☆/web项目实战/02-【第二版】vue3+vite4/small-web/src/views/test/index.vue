<template>
  <div class="app bg-color-primary h100 w100 flex">
    <div class="bg-color-warning w-200">
      <h1>{{ $filters.sexName(1) }}</h1>
    </div>

    <div class="flex-1">
      <div class="bg-color-success font-size-lg">123456789123456789</div>
      <span class="hello font-size-lg w-200 h-100 line-height-100 text-center bg-color-red display-block">hello</span>
      <p v-for="index in 10" :key="index" class="font-size-lg">{{ index }}</p>
      <div class="test m-l-300"></div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, toRefs } from 'vue';
const { proxy } = getCurrentInstance();

let useUserStore = proxy.$store.user.useUserStore();
let { login } = useUserStore;
let { userObj } = toRefs(useUserStore);

async function handleClick() {
  proxy.submitOk('保存成功');
  proxy.submitFail('操作失败');
}
</script>
<style lang="scss" scoped>
.app {
  .hello {
    border: 10px solid #000;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
  }
  .test {
    width: 200px;
    height: 100px;
    background-color: pink;
    /* transition: 变化的属性 花费时间 运动曲线 何时开始; */
    /* 如果想要写多个属性，利用逗号进行分割 */
    // transition:
    //   width 0.5s,
    //   height 0.5s;
    // transform: scale(2, 2);
    /* 如果想要多个属性都变化，属性写all就可以了 */
    // transition: all 0.5s;

    transform: translate(100px, 100px);

    // &:hover {
    //   width: 400px;
    //   height: 200px;
    //   background-color: red;
    // }
  }
}
</style>
