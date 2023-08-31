import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  const isShowMenu = ref(true); // 是否显示菜单

  function update() {
    isShowMenu.value = !isShowMenu.value;
  }

  return { isShowMenu, update };
});
