# unplugin-auto-import插件解决ref大量引入问题

解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题

配置后可以不用引入，直接使用

```shell
cnpm i -D unplugin-auto-import
```

`vite.config.js`

```
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
    }),
  ],
});
```