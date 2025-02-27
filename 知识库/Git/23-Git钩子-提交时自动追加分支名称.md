# Git钩子-每次提交信息添加分支名称

 要在 Git 提交信息后自动添加当前分支信息，可以使用 Git 钩子（hooks）。
 
具体来说，可以使用 `commit-msg` 钩子来修改提交信息。

以下是实现步骤：

#### 1、进入 Git 仓库的 hooks 目录

```shell
cd .git/hooks
```

#### 2、创建或编辑 `commit-msg` 钩子脚本

```shell
touch commit-msg
chmod +x commit-msg
```

![](./images/23-Git钩子-提交时自动追加分支名称-1740658899551.png)


#### 3、编写 `commit-msg` 钩子脚本

```shell
#!/bin/sh

# 获取当前分支名称
branch_name=$(git rev-parse --abbrev-ref HEAD)

# 读取原始提交信息
commit_msg=$(cat $1)

# 检查提交信息是否已经包含分支名称
if ! echo "$commit_msg" | grep -q "\[$branch_name\]"; then
    # 在提交信息末尾添加分支名称
    echo "$commit_msg" | sed "s/$/ [$branch_name]/" > $1
fi
```

#### 4、保存并退出编辑器

这样，每次你提交代码时，`commit-msg` 钩子会自动在提交信息的末尾添加当前分支的名称。

#### 5、示例

假设你当前在 `feature-branch` 分支上，提交信息为 `Fix bug`，那么提交后，提交信息会自动变为 `Fix bug [feature-branch]`。
![](./images/23-Git钩子-提交时自动追加分支名称-1740658972883.png)

