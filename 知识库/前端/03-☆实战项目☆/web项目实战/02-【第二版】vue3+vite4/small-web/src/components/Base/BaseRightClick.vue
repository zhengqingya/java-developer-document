<template>
  <div class="app" @click.right="handleRightClick($event, '本区域中可右击')">
    <slot />

    <div v-show="isShowRightMenu" class="right-menu" :style="{ left: rmLeft + 'px', top: rmTop + 'px' }">
      <!-- 作用域插槽可回调值给父组件使用 <template #right-show="{ isShow }"></template> -->
      <slot name="right-show" :is-show="isShowRightMenu" />
    </div>
  </div>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let isShowRightMenu = ref(false);
let rmLeft = $ref(0);
let rmTop = $ref(0);

let props = defineProps({
  // 距离鼠标位置的偏移量
  x: {
    type: Number,
    default: 10,
  },
  y: {
    type: Number,
    default: 10,
  },
});

watch(
  isShowRightMenu,
  (newValue) => {
    if (newValue) {
      document.body.addEventListener('click', closeRightClickMenu);
    } else {
      document.body.removeEventListener('click', closeRightClickMenu);
    }
  },
  {
    immediate: true, // 初始化执行一次
    // deep: true, // 深度监听
  },
);

function closeRightClickMenu() {
  isShowRightMenu.value = false;
}

function handleRightClick(event, data) {
  isShowRightMenu.value = true; // 显示右击box内容
  event.preventDefault(); // 阻止默认的右击菜单

  // 方式一：position: absolute;
  // const el = proxy.$el.getBoundingClientRect(); // 返回元素的大小及其相对于视口的位置
  // rmLeft = event.clientX - el.left + props.x;
  // rmTop = event.clientY - el.top + props.y; // 距离顶级窗口位置 - 本组件元素到顶级窗口距离 + 间隔距离 => 相当于刚好在右击操作的下面一点

  // 方式二：position: fixed;
  rmLeft = event.clientX + props.x;
  rmTop = event.clientY + props.y;
  proxy.$emit('right-click'); // 触发父组件回调处理
}
</script>
<style lang="scss">
.app {
  position: relative;

  .right-menu {
    // position: absolute;
    position: fixed;
    z-index: 9999;
    box-shadow: 1px 1px 3px 0 rgba(17, 17, 17, 0.3);
  }
}
</style>
