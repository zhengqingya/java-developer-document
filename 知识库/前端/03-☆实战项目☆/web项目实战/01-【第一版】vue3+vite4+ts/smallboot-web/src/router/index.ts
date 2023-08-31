import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import useStore from '@/store'

export const Layout = () => import('@/layout/index.vue');

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index.vue'),
  //       name: 'Dashboard',
  //       meta: { title: '首页', icon: 'House', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/test',
    component: () => import('@/views/test/index.vue'),
  },
  {
    // path: '/404',
    path: '/:pathMatch(.*)*', // 防止浏览器刷新时路由未找到警告提示: vue-router.mjs:35 [Vue Router warn]: No match found for location with path "/xxx"
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
  },
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
})

// 重置路由
export function resetRouter() {
  const { permission } = useStore()
  permission.routes.forEach((route) => {
    const name = route.name
    if (name && router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}

export default router
