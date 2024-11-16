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
var sortable;
function initTableSort() {
  const elTable = document.querySelector('.elTable .el-table__body-wrapper tbody');
  // 创建拖拽对象
  sortable = Sortable.create(elTable, {
    sort: true, //是否可以进行拖拽排序
    group: 'shared',
    animation: 150,
    ghostClass: 'sortable-ghost', //拖拽样式
    easing: 'cubic-bezier(1, 0, 0, 1)',
    disabled: false, // 初始状态下开启拖拽，如果想要一开始禁用拖拽，可以设置disabled为true，然后调用disableDrag方法来实现动态开关
    onStart: (evt) => {
      // console.log('11', evt);
    },
    onEnd: (evt) => {
      doUpdateSort(evt.oldIndex, evt.newIndex);
    },
  });
}
// 是否禁用拖拽 true:禁用 false:启用
function disableDrag(disabled) {
  sortable.option('disabled', disabled);
}
// 更新排序
function doUpdateSort(oldIndex, newIndex) {
  const arr = pageRes.records;
  const currentRow = arr.splice(oldIndex, 1)[0];
  // console.log('拖拽后的下标：', newIndex, '拖拽行：', currentRow);
  arr.splice(newIndex, 0, currentRow);
  pageRes.records = [];
  nextTick(async () => {
    pageRes.records = arr;
    // 子组建回调父组件触发更新排序 TODO 这里实现自己的排序接口更新数据接口...
    const startIndex = (pageParams.pageNum - 1) * pageParams.pageSize;
    proxy.$emit('doSort', pageRes.records, startIndex);
  });
}
```