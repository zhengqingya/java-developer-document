### 配置路径别名

`vite.config.ts`

```ts
import * as path from 'path';

export default defineConfig({
    resolve: {
        // 配置路径别名
        alias: [
            // @代替src
            {
                find: '@',
                replacement: path.resolve('./src')
            }
        ]
    },
})
```

解决：找不到模块“path”或其相应的类型声明

```shell
# 安装node声明文件
cnpm i @types/node --save-dev
```

### 环境变量

`.env.dev`

```
# 开发环境
NODE_ENV='dev'

# 为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。
# ts中通过`import.meta.env.VITE_APP_BASE_API`取值
VITE_APP_PORT = 5173
VITE_APP_BASE_API = '/dev-api'
```

### 反向代理解决跨域问题 & 配置项目运行端口

`vite.config.ts`

```ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 获取`.env`环境配置文件
  const env = loadEnv(mode, process.cwd());

  return { 
    server: {
      host: 'localhost',
      port: Number(env.VITE_APP_PORT),
      // 运行时自动打开浏览器
      // open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:1218',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    }
  }
})
```

### 引入scss全局变量

`vite.config.ts`

```ts
export default defineConfig(({ mode }) => {
  return {
    // 引入scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/app-theme.scss";`
        }
      }
    }
  }
})
```

`src/styles/app-theme.scss`

```scss
$dark_main_color: #021b32;
```