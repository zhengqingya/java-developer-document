# 计算商品sku笛卡尔积

```
// 商品属性 -- 支持数组和对象
// const attrList = [{"name":"颜色","values":[{"name":"红色","value":"red"},{"name":"蓝色","value":"blue"}]},{"name":"尺寸","values":[{"name":"S","value":"s"}]}]
const attrList = {"color":{"name":"颜色","values":[{"name":"红色","value":"red"},{"name":"蓝色","value":"blue"}]},"size":{"name":"尺寸","values":[{"name":"S","value":"s"}]}}


const attrValueList = Object.values(attrList).map((attr) => attr.values)
const cartesianSku = (...arrays) => arrays.reduce((acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])), [[]])
const attrCombinationList = cartesianSku(...attrValueList)


console.log(attrCombinationList) // [[{"name":"红色","value":"red"},{"name":"S","value":"s"}],[{"name":"蓝色","value":"blue"},{"name":"S","value":"s"}]]
```

得到结果：

```
[
    [
        {
            "name": "红色",
            "value": "red"
        },
        {
            "name": "S",
            "value": "s"
        }
    ],
    [
        {
            "name": "蓝色",
            "value": "blue"
        },
        {
            "name": "S",
            "value": "s"
        }
    ]
]
```
