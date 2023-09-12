# Grid布局

Grid布局是将容器划分成“行”和“列”，产生单元格，然后指定“项目所在”的单元格，可以看作是二维布局。

### 简单示例

```
.container {
    /* 设置容器布局为grid布局 */
    display: grid;
    /* 指定每一行的宽度 */
    grid-template-rows: 100px 150px;
    /* 指定每一列的宽度 */
    grid-template-columns: repeat(3, 33.33%);
}
```

![](images/grid-simple-01.png)

