# Vite项目配置

1. 配置路径别名
2. 反向代理解决跨域问题
3. 配置项目运行端口
4. 环境变量
5. 解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题
6. $ref语法糖 告别 .value

```shell
// 解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题
cnpm i -D unplugin-auto-import
```

[.env.dev](../.env.dev) 环境变量

```
# 开发环境
# NODE_ENV='dev'

# 为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。
# js中通过`import.meta.env.VITE_APP_BASE_API`取值
VITE_APP_PORT = 5173
VITE_APP_BASE_API = '/dev-api'
VITE_APP_BASE_FILE_API = '/dev-api/web/api/system/file/upload'

# 后端服务地址
VITE_APP_SERVICE_API = 'http://localhost:888'
```

[package.json](../package.json)

```json
{
  "scripts": {
    "dev": "vite --mode dev",
    "prod": "vite --mode prod",
    "build": "vite build --mode prod"
  }
}
```

[`vite.config.js`](../vite.config.js)

```
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import * as path from 'path';

import AutoImport from 'unplugin-auto-import/vite';

import ReactivityTransform from '@vue-macros/reactivity-transform/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取`.env`环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      ReactivityTransform(), // 启用响应式语法糖 $ref ...
      // 解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题
      AutoImport({
        imports: ['vue', 'vue-router'],
      }),
    ],
    // 反向代理解决跨域问题
    server: {
      // host: 'localhost', // 只能本地访问
      host: '0.0.0.0', // 局域网别人也可访问
      port: Number(env.VITE_APP_PORT),
      // 运行时自动打开浏览器
      // open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVICE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    resolve: {
      // 配置路径别名
      alias: [
        // @代替src
        {
          find: '@',
          replacement: path.resolve('./src'),
        },
      ],
    },
    // 引入scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/color.scss";@import "@/styles/theme.scss";`,
        },
      },
    },
  };
});
```
