<template>
  <div class="app">
    <el-scrollbar>
      <base-right-click class="flex">
        <div v-for="item in tabsList" :key="item" class="item m-4" :class="{ active: $route.meta.fullPath === item.meta.fullPath }" style="display: inline-block; white-space: nowrap">
          <div class="flex-between-center h-20" @click.right="handleRightClick(item, $event)">
            <router-link :to="item.meta.fullPath" @click="activeTabs(item)">
              <span class="m-r-4">{{ item.meta.title }}</span>
            </router-link>
            <el-icon v-if="item.meta.fullPath !== '/'" :size="10" @click="handleClose(item)"> <Close /> </el-icon>
          </div>
        </div>

        <template #right-show="{ isShow }">
          <div class="right-menu flex-column b-rd-4 bg-color-white">
            <div class="option" @click="handleCloseCurrent">
              <el-icon :size="10"> <Close /> </el-icon><span> 关闭当前</span>
            </div>
            <div class="option" @click="handleCloseAll">
              <el-icon :size="10"> <Close /> </el-icon><span> 关闭所有</span>
            </div>
          </div>
        </template>
      </base-right-click>
    </el-scrollbar>
  </div>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let useSettingsStore = proxy.$store.settings.useSettingsStore();
let { tabsList } = toRefs(useSettingsStore);
let { activeTabs } = useSettingsStore;
let chooseItem = $ref(null);

// 保留首页
watch(
  tabsList,
  (newValue) => {
    if (newValue.length === 0) {
      tabsList.value.push({ meta: { title: '首页', fullPath: '/' } });
    }
  },
  { immediate: true, deep: true },
);

function handleClose(item) {
  tabsList.value.splice(tabsList.value.indexOf(item), 1);
}

function handleRightClick(item) {
  chooseItem = item;
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
      background: #00aaff;
    }
  }

  .right-menu {
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
