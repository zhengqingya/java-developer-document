# --force-with-lease

`--force-with-lease` 在你推送之前检查远程仓库是否有更新，如果有，则不会进行推送。

```shell
git push origin master --force-with-lease
```

`--force` 忽略所有安全检查，直接进行推送。

```shell
git push origin master --force
```