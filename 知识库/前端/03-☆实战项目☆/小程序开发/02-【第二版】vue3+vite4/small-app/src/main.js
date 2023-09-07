import { createSSRApp } from 'vue';
import App from './App.vue';

import store from '@/store';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import api from '@/api/index.js';

import uviewPlus from '@/uni_modules/uview-plus';

// 解决控制台警告问题： [Violation] Added non-passive event listener to a scroll-blocking 'touchmove' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
import 'default-passive-events';

// 全局组件引入
import globalComponent from '@/components/index.js';

// 抽取公用的实例 - 操作成功与失败消息提醒内容等
import mixin from '@/utils/mixin.js';

// 全局过滤器
import { filters } from '@/utils/filters.js';

export function createApp() {
  const app = createSSRApp(App);

  const pinia = createPinia();

  pinia.use(
    createPersistedState({
      storage: localStorage,
      auto: true, // 启用所有Store默认持久化
    })
  );
  app.use(pinia);
  app.config.globalProperties.$store = store;

  app.config.globalProperties.$api = api;

  app.use(uviewPlus);
  // uni.$u.config.unit = 'rpx';

  app.mixin(mixin);

  app.config.globalProperties.$filters = filters;

  return {
    app,
  };
}
