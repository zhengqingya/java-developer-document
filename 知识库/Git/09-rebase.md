# rebase - 变基

### 压缩合并提交

通过rebase实现对多次commit进行压缩合并

#### 法一：

![git-rebase-interactively.png](images/git-rebase-interactively-01.png)

交互式变基

![git-rebase-interactively.png](images/git-rebase-interactively-02.png)

![git-rebase-interactively.png](images/git-rebase-interactively-03.png)

最终压缩提交后的效果

![git-rebase-interactively.png](images/git-rebase-interactively-04.png)

#### 法二：

选择要压缩合并的日志直接操作即可
![git-squash-commit-message.png](images/git-squash-commit-message.png)

### 合并分支

![git-rebase-branch.png](images/git-rebase-branch.png)

---

### rebase和merge差异对比

![git-rebase-diff-merge.png](images/git-rebase-diff-merge.png)