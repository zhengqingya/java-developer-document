### [package.json](../package.json)

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

```
在 package.json 文件中，依赖包的版本号前面的符号表示版本号的范围。   eg: "sass": "^1.66.1"

常见的符号和意义如下：
^：锁定主版本号（major），例如："^3.2.1" 表示使用 3.x 版本，4.x 版本需要手动升级。
~：锁定次版本号（minor），例如："~3.2.1" 表示使用 3.2.x 版本，3.3.x 版本可以自动安装，但 4.x 版本需要手动升级。
*：表示任何版本。

<、<=、>、>=：表示版本号的范围，例如："<=3.2.1" 表示使用小于等于 3.2.1 的版本。
这些符号可以用于确保项目所使用的依赖包版本是符合要求的。
但需要注意的是，过于严格的版本锁定可能导致安装或升级依赖包时的问题，因此需要根据实际情况进行选择。
```

### package-lock.json

`package-lock.json` 是一个自动生成的文件，用于锁定依赖项的版本，防止依赖项的版本升级导致的问题。
`cnpm` 安装依赖时不会生成 `package-lock.json` 见 https://github.com/cnpm/cnpmjs.org/issues/1283
