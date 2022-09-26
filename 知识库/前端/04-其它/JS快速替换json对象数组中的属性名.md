# 替换后端返回对象数据中的属性名为前端所要的属性名

```javascript
jsonData = JSON.parse(JSON.stringify(jsonData).replace(/userId/g,"id")); // jsonData为数组，userId为修改前，id为修改后


// 替换多个字段如下 ex:
this.handleForm = Object.assign({}, handleData)
this.docUrlList = JSON.parse(JSON.stringify(handleForm.attachList).replace(/fileName/g,"name").replace(/fileUrl/g,"url"))
this.imageUrlList = JSON.parse(JSON.stringify(handleForm.imageList).replace(/fileName/g,"name").replace(/fileUrl/g,"url"))
```
