```
// 求和
let sumSku = this.cartList.reduce((total, item) => total += item.num, 0)

// 过滤数据 -- 只保留>0的数据
this.cartList = this.cartList.filter(e => e.num > 0)
```