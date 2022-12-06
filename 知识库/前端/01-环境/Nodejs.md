### Node.js

[点击下载](https://nodejs.org/zh-cn/download/)

```shell
# 查看版本
node -v
npm -v

# npm 升级
npm install -g npm
# 指定版本
# npm -g install npm@8.5.4

# node升级
# 安装n模块
npm install -g n
# 升级到最新稳定版
n stable
```

#### 卸载

```
# 控制面板卸载 node.js
# 删除`C:\Users\Administrator\AppData\Roaming`目录下的 `npm`和`npm-cache` 文件夹
# 删除环境变量
```

---

### cnpm

```shell
# 设置淘宝`NPM`镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 指定版本
# npm install cnpm@7.1.0 -g --registry=https://registry.npm.taobao.org
# 查看
cnpm config get registry
# 测试
cnpm -v
```

### yarn

> 并行下载依赖

```shell
# 安装yarn
cnpm install -g yarn --registry=https://registry.npm.taobao.org
# 配置源
yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
# 测试
yarn -v
```

### pnpm

> 将依赖下载到一个统一位置管理，每个项目有需要其依赖再通过建立索引引入依赖

```shell
# 全局安装
npm install pnpm -g
# 查看源
pnpm config get registry 
# 切换淘宝源
pnpm config set registry https://registry.npmmirror.com
# 测试
pnpm -v
# 设置存储路径
pnpm config set store-dir /.pnpm-store
# 查看存储路径
pnpm config get store-dir
```