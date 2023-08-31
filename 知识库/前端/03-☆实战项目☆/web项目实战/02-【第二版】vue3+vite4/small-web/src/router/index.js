import { createRouter, createWebHashHistory } from 'vue-router';

// 本地静态路由
export const constantRoutes = [
  // {
  //   path: '/',
  //   component: () => import('@/views/dashboard/index.vue'),
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      isParentView: true,
    },
  },
  {
    path: '/test',
    component: () => import('@/views/test/index.vue'),
  },
  {
    path: '/test-layout',
    component: () => import('@/views/test/index.vue'),
    // component: () => import('@/layout/index.vue'),
    // component: () => import('@/layout/parentView.vue'),
    meta: {
      isParentView: true,
      xxx: true,
    },
    children: [
      {
        path: 'xxx', // 加斜杠 全路径，不加的话会拼接父path eg：/test-layout/xxx
        component: () => import('@/views/test/index.vue'),
      },
    ],
  },
  {
    // path: '/404',
    path: '/:pathMatch(.*)*', // 防止浏览器刷新时路由未找到警告提示: vue-router.mjs:35 [Vue Router warn]: No match found for location with path "/xxx"
    component: () => import('@/views/error-page/404.vue'),
  },
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
