`package.json`

```
{
  "name": "small-tools-web",
  "private": true,
  "version": "1.0.1",
  "type": "module",
  "scripts": {
    // 运行
    "dev": "vite --mode dev",
    // 构建生成 dist 文件夹
    "build:prod": "vue-tsc --noEmit && vite build --mode prod",
    // 在本地启动一个静态 Web 服务器，将 dist 文件夹运行在 http://localhost:8080
    "preview": "vite preview --port 8080 --mode prod",
    // eslint检查
    "lint": "eslint --ext .js --ext .ts --ext .vue src",
    // eslint自动修复
    "lint-fix": "eslint --ext .js --ext .ts --ext .vue src --fix",
    // prettier自动格式化代码
    "prettier": "prettier --write ."
  },
  "dependencies": {
    "vue": "^3.2.37",
    "vue-router": "^4.1.2"
  },
  "devDependencies": {
    "@types/node": "^18.0.5",
    "@typescript-eslint/eslint-plugin": "^5.30.6",
    "@typescript-eslint/parser": "^5.30.6",
    "@vitejs/plugin-vue": "^3.0.0",
    "eslint": "^8.20.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-vue": "^9.2.0",
    "prettier": "^2.7.1",
    "typescript": "^4.6.4",
    "vite": "^3.0.0",
    "vue-tsc": "^0.38.4"
  }
}
```

---

```
# devDependencies: 里面的插件只用于开发环境，不用于生产环境 
# dependencies: 需要发布到生产环境的

# 写入到 dependencies 对象
npm i module_name -S    =>    npm install module_name --save

# 写入到 devDependencies 对象
npm i module_name -D    =>    npm install module_name --save-dev
```