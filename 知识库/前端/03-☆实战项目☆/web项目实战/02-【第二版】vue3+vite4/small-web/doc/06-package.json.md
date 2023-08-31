[package.json](../package.json)

```
{
  "name": "small-web",
  "private": true,
  "version": "1.0.1",
  "type": "module",
  "scripts": {
    // 运行
    "dev": "vite --mode dev",
    "prod": "vite --mode prod",
    // 构建生成 dist 文件夹
    "build:prod": "vite build --mode prod",
    // 在本地启动一个静态 Web 服务器，将 dist 文件夹运行在 http://localhost:8080
    "preview": "vite preview --port 8080 --mode prod"
  },
  "dependencies": {
  },
  "devDependencies": {
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