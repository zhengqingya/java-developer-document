# 基于 sortablejs 实现 el-table 拖拽排序 

> 见 https://blog.csdn.net/m0_52827996/article/details/143429165

安装依赖

```shell
cnpm i sortablejs
```

添加类名

```
<el-table class="elTable" />
```

导入sortablejs

```
import Sortable from 'sortablejs';
```

拖拽排序

```
onMounted(() => {
  initTableSort();
});

// 拖动排序
function initTableSort() {
  const table = document.querySelector('.elTable .el-table__body-wrapper tbody');
  Sortable.create(table, {
    group: 'shared',
    animation: 150,
    ghostClass: 'sortable-ghost', //拖拽样式
    easing: 'cubic-bezier(1, 0, 0, 1)',
    onStart: (item) => {
      // console.log(11, item);
    },

    // 结束拖动事件
    onEnd: (item) => {
      // console.log(22, item);
      doSort(item.oldIndex, item.newIndex);
    },
  });
}
// 处理排序
const doSort = (oldIndex, newIndex) => {
  // pageRes.records 为请求后端拿到的分页数据
  const arr = pageRes.records;
  const currentRow = arr.splice(oldIndex, 1)[0];
  arr.splice(newIndex, 0, currentRow);

  pageRes.records = [];
  nextTick(async () => {
    pageRes.records = arr;
    // api更新排序 ... TODO
  });
};
```