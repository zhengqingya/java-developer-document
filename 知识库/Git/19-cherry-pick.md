# cherry-pick

从dev分支选择N次提交，合并到master分支

### 方式一：IDEA

选择要合并到当前分支的提交，右键选择 Cherry-Pick
![](./images/19-cherry-pick-1737702721631.png)

查看 cherry-pick 过来的代码
![](./images/19-cherry-pick-1737702912318.png)

### 方式二：命令

```shell
git checkout master

# 将指定提交合并过来
git cherry-pick <commit_id1> <commit_id2>

git push

# 如果冲突，可以取消本次合并操作，或者解决冲突
git cherry-pick --abort
```

eg: 合并 dev分支的提交的A1和A3 

![](./images/19-cherry-pick_1725729492287.png)

```shell
git log --all --graph --oneline
 
git cherry-pick 1f03b50 7be9823

git push
```

![](./images/19-cherry-pick_1725729768403.png)

