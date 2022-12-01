# 对象数组操作

```
let skuList = [{"spuId":1,"skuId":"2","num":1,"price":6},{"spuId":3,"skuId":"4","num":2,"price":10}]
```

### 求和

```
let sumSku = this.skuList.reduce((total, item) => total += item.num, 0)
```

### 过滤数据

```
// 只保留>0的数据
this.skuList = this.skuList.filter(e => e.num > 0)
```

### 最大值

```
let maxValue = Math.max.apply(Math, this.skuList.map(function(item) {
    return item.price << 0
}));
```

### 最小值

```
let minValue = Math.min.apply(Math, this.skuList.map(function(item) {
    return item.price << 0
}));
```
