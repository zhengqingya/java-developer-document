### 本地运行

> tips: 个人node版本 v16.18.0

```shell
# 安装依赖
cnpm install

# 运行
cnpm run dev
```

### 部署

```shell
# 构建出dist文件夹，然后将打包后的文件放到nginx中...
cnpm run build:prod

# 构建docker镜像
docker build -f ./Docker/Dockerfile -t "registry.cn-hangzhou.aliyuncs.com/zhengqingya/smallboot-web:prod" . --no-cache

# 推送到远程仓库
docker push registry.cn-hangzhou.aliyuncs.com/zhengqingya/smallboot-web:prod


# 运行
docker run -d --name web -p 80:80 --restart=always registry.cn-hangzhou.aliyuncs.com/zhengqingya/smallboot-web:prod
```
