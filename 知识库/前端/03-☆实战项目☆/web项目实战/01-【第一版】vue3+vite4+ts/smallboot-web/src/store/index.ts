import useAppStore from './modules/app'
import useUserStore from './modules/user'
import usePermissionStore from './modules/permission'
import useSettingStore from './modules/settings'
import useTagsViewStore from './modules/tagsView'

const useStore = () => ({
  app: useAppStore(),
  user: useUserStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore(),
})

export default useStore
