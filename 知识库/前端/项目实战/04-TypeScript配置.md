`tsconfig.json`

> 通过vite创建项目后的默认配置

```
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

---

### 解决：找不到模块“@/router”或其相应的类型声明。

`tsconfig.json`新增如下配置

```
"baseUrl": ".",
"paths": {
  "@/*": [ "src/*" ]
}
```

### 解决：template中使用$store报错

`vite-env.d.ts`

```ts
import { Store } from '@/store'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
```