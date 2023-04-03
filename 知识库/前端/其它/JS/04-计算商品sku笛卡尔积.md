# 计算商品sku笛卡尔积

```
// 商品属性 -- 支持数组和对象
// const attrList = [{"name":"颜色","values":[{"name":"红色","value":"red"},{"name":"蓝色","value":"blue"}]},{"name":"尺寸","values":[{"name":"S","value":"s"}]}]
const attrList = {"color":{"name":"颜色","values":[{"name":"红色","value":"red"},{"name":"蓝色","value":"blue"}]},"size":{"name":"尺寸","values":[{"name":"S","value":"s"}]}}


const attrValueList = Object.values(attrList).map((attr) => attr.values) // 如果attrList数据格式为 {"颜色":[{"id":"1","name":"蓝色"}]}  那么这里的 .values 可以不要
const cartesianSku = (...arrays) => arrays.reduce((acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])), [[]])
const skuCombinationList = cartesianSku(...attrValueList)


console.log(skuCombinationList) // [[{"name":"红色","value":"red"},{"name":"S","value":"s"}],[{"name":"蓝色","value":"blue"},{"name":"S","value":"s"}]]
```

和table表格数据对应 规格名(表头)：规格值(表数据)

```
// 为每一个sku属性加上规格值
let newSkuList = []
let skuCombinationList = [[{"attrKeyName":"颜色","attrValueName":"蓝色"},{"attrKeyName":"尺寸","attrValueName":"L"}],[{"attrKeyName":"颜色","attrValueName":"红色"},{"attrKeyName":"尺寸","attrValueName":"XL"}]]
skuCombinationList.forEach((specList) => {
    let newSkuItem = {}
    specList.forEach((specItem) => {
        newSkuItem[`${specItem.attrKeyName}`] = specItem.attrValueName
    })
    newSkuList.push(newSkuItem)
})
console.log(newSkuList) // [{"颜色":"蓝色","尺寸":"L"},{"颜色":"红色","尺寸":"XL"}]
```
