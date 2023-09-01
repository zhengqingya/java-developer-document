import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  let isShowMenu = ref(true); // 是否显示菜单
  let tabsList = ref([]); // Tabs标签页数据

  function update() {
    isShowMenu.value = !isShowMenu.value;
  }

  function getTabsList() {
    const unique = (arrs) => {
      const res = new Map();
      return arrs.filter((arr) => !res.has(arr.meta.fullPath) && res.set(arr.meta.fullPath, 1));
    };
    tabsList.value = unique(tabsList.value);
    return tabsList.value;
  }

  // 点击菜单/tabs标签页时触发
  function activeTabs(router) {
    // tabsList.value.forEach((e) => (e.meta.isActive = e.meta.fullPath === router.meta.fullPath));
    if (tabsList.value.filter((e) => e.meta.fullPath === router.meta.fullPath).length === 0) {
      // router.meta.isActive = true;
      tabsList.value.push(router);
    }
  }

  return { isShowMenu, update, tabsList, getTabsList, activeTabs };
});
