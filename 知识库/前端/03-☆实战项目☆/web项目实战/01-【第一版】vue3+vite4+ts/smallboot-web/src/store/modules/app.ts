import { AppState } from '@/types/store/app'
import { localStorage } from '@/utils/storage'
import { defineStore } from 'pinia'

const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    name: localStorage.get('name') || 'Small Tools',
    device: 'desktop',
    sidebar: {
      opened: localStorage.get('sidebarStatus') ? !!+localStorage.get('sidebarStatus') : true,
      withoutAnimation: false,
    },
  }),
  actions: {
    setName(name: string) {
      this.name = name
      localStorage.set('name', name)
    },
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        localStorage.set('sidebarStatus', 1)
      } else {
        localStorage.set('sidebarStatus', 0)
      }
    },
    closeSideBar(withoutAnimation: any) {
      localStorage.set('sidebarStatus', 0)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: string) {
      this.device = device
    },
  },
})

export default useAppStore
