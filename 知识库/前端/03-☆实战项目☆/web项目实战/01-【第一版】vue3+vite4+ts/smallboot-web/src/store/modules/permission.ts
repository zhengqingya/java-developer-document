import { PermissionState } from '@/types/store/permission'
import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import useStore from '@/store'

const modules = import.meta.glob('../../views/**/**.vue')
export const Layout = () => import('@/layout/index.vue')
export const parentView = () => import('@/layout/parentView.vue')

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roleCodeList: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tmp = { ...route } as any
    if (tmp.component === 'Layout') {
      tmp.component = Layout
    } else if (tmp.component === 'parentView') {
      tmp.component = parentView // 单独页面 -- 无左侧菜单等
    } else {
      const component = modules[`../../views/${tmp.component}.vue`] as any
      if (component) {
        tmp.component = modules[`../../views/${tmp.component}.vue`]
      } else {
        tmp.component = modules[`../../views/error-page/404.vue`]
      }
    }
    res.push(tmp)
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, roleCodeList)
    }
  })
  return res
}

/**
 * 侧边栏权限路由
 */
const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
    addRoutes: [],
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    generateRoutes(roleCodeList: string[]) {
      const { user } = useStore()
      const accessedRoutes = filterAsyncRoutes(user.permissionTreeList, roleCodeList)
      return new Promise((resolve, reject) => {
        this.setRoutes(accessedRoutes)
        resolve(accessedRoutes)
      })
    },
  },
})

export default usePermissionStore
