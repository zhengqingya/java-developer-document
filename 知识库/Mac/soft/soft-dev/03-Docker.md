###### Docker

[https://www.runoob.com/docker/macos-docker-install.html](https://www.runoob.com/docker/macos-docker-install.html)

```shell
brew cask install docker
```

docker 镜像加速器

```shell
{
  "features": {
    "buildkit": true
  },
  "experimental": false,
  "registry-mirrors": [
    "加速器地址"
  ]
}
```

###### docker-compose安装服务（portainer、mysql、redis、nginx、rabbitmq、nacos、sentinel、minio...）

```shell
# 环境准备
git clone https://gitee.com/zhengqingya/docker-compose.git
cd docker-compose/Linux

# 运行服务...

# Docker可视化界面工具`Portainer`
docker-compose -f ./portainer/docker-compose-portainer.yml -p portainer up -d
```