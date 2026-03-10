###### Go

> [https://golang.google.cn/dl/](https://golang.google.cn/dl/)

```shell
# 查看版本
go version
# 查看环境配置
go env
```

go加速配置

```shell
# 开启 Go 的 Module 模式（Go Modules）
go env -w GO111MODULE=on

# 设置 Go 模块代理
# 直接访问 Google 的服务器或 GitHub 下载依赖包往往极慢或失败。goproxy.cn 是由七牛云提供的国内镜像站，速度极快。
# direct：这是一个备选方案。如果代理服务器上找不到某个私有库，Go 会回退到直接连接（direct）原地址去尝试下载。
go env -w GOPROXY=https://goproxy.cn,direct

# 验证
go env | grep -E "GO111MODULE|GOPROXY"
# GO111MODULE='on'
# GOPROXY='https://goproxy.cn,direct'
```
