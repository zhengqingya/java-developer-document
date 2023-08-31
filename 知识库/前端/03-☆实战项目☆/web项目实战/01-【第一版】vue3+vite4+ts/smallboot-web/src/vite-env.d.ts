/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

import { Store } from '@/store'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}
