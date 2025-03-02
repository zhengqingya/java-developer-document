# 对象数组操作

含es6

```
let skuList = [{"spuId":1,"skuId":"2","num":1,"price":6},{"spuId":3,"skuId":"4","num":2,"price":10}]
```

### 求和

```
// 0为初始值
let sumSku = this.skuList.reduce((total, item) => total += item.num, 0)
```

### 过滤数据

```
// 只保留>0的数据
this.skuList = this.skuList.filter(e => e.num > 0)
```

### 判断list中是否存在某个值

```
// 是否存在大于0的数据
let isGt0 = this.skuList.some(e => e.num > 0)
```

### 获取对象数组中某一属性所组成的list

```
list = this.skuList.map(item => item.spuId)
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

### 是否包含

```
const list = ['java', 'python', 'go']
console.log(list.includes('java')); // true
```

### 合并

```
let list = ['java', 'go']
console.log(list.concat(['python', 'java'])); // ['java', 'go', 'python', 'java']

// 或
list.push(...['python', 'java'])
console.log(list); // ['java', 'go', 'python', 'java']

// 或
list = [...list, ...['python', 'java']]
```

### 去重

```
// 数组去重
let array = Array.from(new Set([1, 1, 1, 2, 3, 2, 4])); 
console.log(array); // => [1, 2, 3, 4]

// 数组对象去重
const list = [{"name":"test"},{"name":"test"}]
const unique = (arrs) => {
    const res = new Map()
    return arrs.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1))
}
console.log('去重后:', unique(list))
```

### 移除指定元素

```
let list = [{"id":1,"name":"admin"},{"id":2,"name":"test"}]
// 移除id为1的元素
list.splice(list.findIndex((item) => item.id === 1), 1)
console.log(list) // [{"id":2,"name":"test"}]

// 移除指定元素
let item = {"id":1,"name":"admin"}
list.splice(list.indexOf(item), 1);
```

### 扩展运算符...

用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中

```
let x = ['e','f','h']
let y = [...x]
console.log(y); // ['e','f','h']
y[0] = 'aa'
console.log(x); // ['e','f','h']
console.log(y); // ['aa','f','h']


const a = {"id":1,"name":"zq"}
const b = {...a}
b.name = 'test'
console.log(a); // {"id":1,"name":"zq"}
console.log(b); // {"id":1,"name":"test"}

b.age = 18
console.log(b); // {"id":1,"name":"test","age":18}
```

### 分组

根据某个属性将数组分组

```
const list = [{"id":1,"name":"zhengqingya","sex":"男"},{"id":2,"name":"admin","sex":"女"},{"id":3,"name":"test","sex":"男"}]

// 数组
function getGroupArray(list, attr) {
    const map = new Map()
    list.forEach((item, index, arr) => {
      if (!map.has(item[attr])) {
        map.set(
          item[attr],
          arr.filter((a) => a[attr] == item[attr]),
        )
      }
    })
    return Array.from(map).map((item) => [...item[1]])
}

// 数组对象
function getGroupArrayObj(list, attr) {
    const map = new Map()
    list.forEach((item, index, arr) => {
      if (!map.has(item[attr])) {
        map.set(
          item[attr],
          arr.filter((a) => a[attr] == item[attr]),
        )
      }
    })
    return Array.from(map).map((item) => [item[0], item[1]])
}

// 对象
function getGroupObject(list, attr) {
    const map = new Map()
    list.forEach((item, index, arr) => {
      if (!map.has(item[attr])) {
        map.set(
          item[attr],
          arr.filter((a) => a[attr] == item[attr]),
        )
      }
    })
    return Object.fromEntries(Array.from(map).map((item) => [item[0], item[1]]))
}

console.log('分组-数组', getGroupArray(list, 'sex')) // [[{"id":1,"name":"zhengqingya","sex":"男"},{"id":3,"name":"test","sex":"男"}],[{"id":2,"name":"admin","sex":"女"}]]
console.log('分组-数组对象', getGroupArrayObj(list, 'sex')) // [["男",[{"id":1,"name":"zhengqingya","sex":"男"},{"id":3,"name":"test","sex":"男"}]],["女",[{"id":2,"name":"admin","sex":"女"}]]]
console.log('分组-对象', getGroupObject(list, 'sex')) // {"男":[{"id":1,"name":"zhengqingya","sex":"男"},{"id":3,"name":"test","sex":"男"}],"女":[{"id":2,"name":"admin","sex":"女"}]}
```

