# 撤销merge

eg：在`dev`分支上开发完，想提交到`origin/release`分支，
结果不小心提交到`origin/master`分支了，需要撤销本次合并的merge

### 情景1：撤销未推送的合并 -- dev刚merge到master，未推送到远程仓库

![](./images/17-撤销merge_1725724415224.png)

```shell
git checkout master

# 将 <commit-id> 替换为合并前的提交哈希id
git reset --hard <commit-id>
```

commit-id查看方式：
![](./images/17-撤销merge_1725724645136.png)

eg：

```shell
git reset --hard bd932c06
```

操作成功如下：
![](./images/17-撤销merge_1725724711312.png)


### 情景2：撤销已推送的合并 -- dev已经merge到master，且已推送到远程仓库

#### 情景2.1：reset重置提交 -- 没有其他人依赖于这次合并后的代码进行修改提交，您可以直接回退到合并之前的状态

![](./images/17-撤销merge_1725726831445.png)

```shell
git checkout master
git reset --hard <commit-before-merge>  # 将 <commit-before-merge> 替换为合并前的提交哈希
git push origin master --force-with-lease
```

eg: 

```shell
git reset --hard bd932c06
```

![](./images/17-撤销merge_1725726901551.png)

```shell
git push origin master --force-with-lease
```

操作成功如下：
![](./images/17-撤销merge_1725726982966.png)

#### 情景2.2：其他人已经基于这个合并做了修改提交，您应该创建一个新的合并来撤销之前的合并

![](./images/17-撤销merge_1725728627169.png)


```shell
git checkout master

# 将 <merge_commit> 替换为实际的合并提交哈希id
git revert <merge_commit_id>
git push origin master --force-with-lease
```

eg:

```shell
git revert 2d4b5856
```

如果报错：

```shell
error: commit 2d4b58567045c01f2d50d67291978485f3057435 is a merge but no -m option was given.
fatal: revert failed
```

![](./images/17-撤销merge_1725728750371.png)

这时候需要指定 -m 选项来选择合并中的父提交。这是因为合并提交通常有两个或多个父提交，分别代表合并前的两个分支。

- 问题：不能确定合并的具体父提交
- 解决：git revert时指定一个非合并分支的提交哈希id即可。

