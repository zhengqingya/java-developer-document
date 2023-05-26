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

### 根据sku获取规格属性list

```
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
    const unique = (arrs) => {
        const res = new Map()
        return arrs.filter((arr) => !res.has(arr.attrValueName) && res.set(arr.attrValueName, 1))
    }
    return Array.from(map).map((item) => {
        let attrValueList = unique(item[1])
        return {
            attrKeyId: attrValueList[0].attrKeyId,
            attrKeyName: item[0],
            attrValueList: attrValueList
        }
    })
}

// 计算sku中包含的属性值
let specList = [{"attrKeyId":"1","attrKeyName":"尺寸","attrValueId":"11","attrValueName":"X"},{"attrKeyId":"2","attrKeyName":"颜色","attrValueId":"21","attrValueName":"蓝色"},{"attrKeyId":"1","attrKeyName":"尺寸","attrValueId":"12","attrValueName":"X"},{"attrKeyId":"2","attrKeyName":"颜色","attrValueId":"22","attrValueName":"红色"}]
let attrList = getGroupArrayObj(specList, 'attrKeyName')
console.log(attrList) // [{"attrKeyId":"1","attrKeyName":"尺寸","attrValueList":[{"attrKeyId":"1","attrKeyName":"尺寸","attrValueId":"11","attrValueName":"X"}]},{"attrKeyId":"2","attrKeyName":"颜色","attrValueList":[{"attrKeyId":"2","attrKeyName":"颜色","attrValueId":"21","attrValueName":"蓝色"},{"attrKeyId":"2","attrKeyName":"颜色","attrValueId":"22","attrValueName":"红色"}]}]
```
