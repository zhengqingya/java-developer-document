# scroll-view 占满剩余空间

1. scroll-view 设置垂直方向超出滚动 & 占剩余的一份
2. 同一区域下其它组件高度不能为100%，需固定

```
.scroll-view{
    flex: 1;
    overflow-y: scroll;
}
```
