# 前端环境

### Node.js

> https://nodejs.org/zh-cn/download/

```shell script
cd /home/soft

# 下载`node-v12.18.3-linux-x64.tar.xz` : https://nodejs.org/en/download/
wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz
# 解压
tar -xvf node-v12.18.3-linux-x64.tar.xz

# 配置环境变量
vi /etc/profile


############################## ↓↓↓↓↓↓ set nodejs environment ↓↓↓↓↓↓ #############################
NODEJS_HOME=/home/soft/node-v12.18.3-linux-x64
PATH=$PATH:$NODEJS_HOME/bin
export NODEJS_HOME PATH
#################################################################################################


# 使配置生效
source /etc/profile
# 查看版本
node -v
npm -v

# npm 升级
npm install -g npm

# 设置淘宝`NPM`镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 测试
cnpm -v

# 安装yarn
cnpm install -g yarn --registry=https://registry.npm.taobao.org
# 配置源
yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

```shell
# 查看软链接
ls -il

# 建立软链接
# 将npm软连接到`/usr/bin`目录下 => 解决`sudo: npm：找不到命令`问题
sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/node /usr/bin/node
sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/npm /usr/bin/npm
sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/cnpm /usr/bin/cnpm
sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/npx /usr/lib/npx


# Linux删除软链接示例
rm -rf /usr/bin/node
rm -rf /usr/bin/npm
rm -rf /usr/bin/cnpm
rm -rf /usr/lib/npx


# nodejs 清空 npm 缓存
npm cache clean -f
```
