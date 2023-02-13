# RuoYi

https://gitee.com/y_project/RuoYi-Vue

---

前端修改请求api直接访问ruoyi的接口 => 方便本地测试

修改`ruoyi-ui/vue.config.js`

```
target: `http://localhost:8080`,
```

变更为

```
target: `http://vue.ruoyi.vip/prod-api`,
```

示例:

```
// webpack-dev-server 相关配置
devServer: {
    host: "0.0.0.0",
    port: port,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://localhost:8080`,
        target: `http://vue.ruoyi.vip/prod-api`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
    disableHostCheck: true,
},
```