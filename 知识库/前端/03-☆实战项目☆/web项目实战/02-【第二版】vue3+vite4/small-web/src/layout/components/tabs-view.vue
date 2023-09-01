<template>
  <div class="app">
    <el-scrollbar>
      <div class="flex w-100">
        <div v-for="item in tabsList" :key="item" class="item m-5" :class="{ active: $route.meta.fullPath === item.meta.fullPath }">
          <div class="flex-between-center p-x-2 w-85 h-20" @click.right="handleRightClick(item, $event)">
            <router-link class="w100" :to="item.meta.fullPath" @click="activeTabs(item)">
              <span class="m-r-3 text-overflow-1">{{ item.meta.title }}</span>
            </router-link>
            <el-icon :size="10" @click="handleClose(item)"> <Close /> </el-icon>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div v-show="isShowRightMenu" class="right-menu flex-column border-radius-5 bg-color-white w-85" :style="{ left: rmLeft + 'px', top: rmTop + 'px' }">
      <div class="option" @click="handleCloseCurrent">
        <el-icon :size="10" @click="handleClose(item)"> <Close /> </el-icon><span> 关闭当前</span>
      </div>
      <div class="option" @click="handleCloseAll">
        <el-icon :size="10" @click="handleClose(item)"> <Close /> </el-icon><span> 关闭所有</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let { tabsList } = toRefs(proxy.$store.settings.useSettingsStore());
let { activeTabs } = proxy.$store.settings.useSettingsStore();
let isShowRightMenu = ref(false);
let chooseItem = $ref(null);
let rmLeft = $ref(0);
let rmTop = $ref(0);

watch(
  isShowRightMenu,
  (newValue, oldValue) => {
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

function handleClose(item) {
  tabsList.value.splice(tabsList.value.indexOf(item), 1);
}

function handleRightClick(item, event) {
  chooseItem = item;
  isShowRightMenu.value = true;
  event.preventDefault(); // 阻止默认的右击菜单
  const el = proxy.$el.getBoundingClientRect(); // 返回元素的大小及其相对于视口的位置
  rmLeft = event.clientX - el.left;
  rmTop = event.clientY - el.top + 20; // 距离顶级窗口位置 - 本组件元素到顶级窗口距离 + tabs高度 => 相当于刚好在tabs底部位置
}

function handleCloseCurrent() {
  handleClose(chooseItem);
}

function handleCloseAll() {
  tabsList.value = [];
}
</script>
<style lang="scss" scoped>
.app {
  position: relative;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  .item {
    border: 1px solid #ebeef5;
    &.active {
      background: $color-primary;
    }
  }

  .right-menu {
    position: absolute;
    z-index: 10;
    box-shadow: 1px 1px 3px 0 rgba(17, 17, 17, 0.3);
    .option {
      text-align: center;
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

a {
  text-decoration: none; // 去掉下换线
  color: black; //文字颜色更改
}
</style>
