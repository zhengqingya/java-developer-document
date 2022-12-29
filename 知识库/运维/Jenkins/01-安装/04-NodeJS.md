# 安装 NodeJS

```shell
# 下载`node-v12.18.3-linux-x64.tar.xz` : https://nodejs.org/en/download/
wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz
# 解压
tar -xvf node-v12.18.3-linux-x64.tar.xz
```

### 配置环境变量

```shell
vi /etc/profile
```

```shell
############################## ↓↓↓↓↓↓ set nodejs environment ↓↓↓↓↓↓ #############################
NODEJS_HOME=/home/soft/node-v12.18.3-linux-x64
PATH=$PATH:$NODEJS_HOME/bin
export NODEJS_HOME PATH
#################################################################################################
```

### 使配置生效

```shell
source /etc/profile
```

验证

```shell
node -v
npm -v
```

```shell
# 将npm软连接到`/usr/bin`目录下 => 解决`sudo: npm：找不到命令`问题
sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/node /usr/bin/node
sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/npm /usr/bin/npm
sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/cnpm /usr/bin/cnpm
sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/npx /usr/lib/npx
```
