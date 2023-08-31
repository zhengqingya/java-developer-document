####################################
# @description 构建docker镜像
# @params $? => 代表上一个命令执行后的退出状态: 0->成功,1->失败
# @example => deploy.sh
# @author zhengqingya
# @date 2023/2/2 14:55
####################################

# 在执行过程中若遇到使用了未定义的变量或命令返回值为非零，将直接报错退出
set -eu

rm -rf dist

cnpm i

# 构建出dist文件夹，然后将打包后的文件放到nginx中...
cnpm run build:prod

# 构建docker镜像
docker build -f ./Docker/Dockerfile -t "registry.cn-hangzhou.aliyuncs.com/zhengqingya/smallboot-web:prod" . --no-cache

# 推送到远程仓库
docker push registry.cn-hangzhou.aliyuncs.com/zhengqingya/smallboot-web:prod
