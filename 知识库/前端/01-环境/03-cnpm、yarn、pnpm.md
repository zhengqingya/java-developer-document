### cnpm

tips: 淘宝镜像过期，已从 `https://registry.npm.taobao.org` -> https://registry.npmmirror.com

```shell
# 设置淘宝`NPM`镜像
npm install -g cnpm --registry=https://registry.npmmirror.com
# 指定版本 -- 在部分项目环境下只能使用低版本cnpm 不然会报错 “Error: Cannot find module 'fs/promises'” （ 低版本的node也只能安装低版本cnpm eg: 14.21.3 ）
# npm install cnpm@7.1.0 -g --registry=https://registry.npmmirror.com
# 查看
cnpm config get registry
# 测试
cnpm -v
```

### yarn

> 并行下载依赖

```shell
# 安装yarn
cnpm install -g yarn --registry=https://registry.npmmirror.com
# 配置源
yarn config set registry https://registry.npmmirror.com -g
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
