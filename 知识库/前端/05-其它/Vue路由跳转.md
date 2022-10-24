# Vue 路由跳转：

可参考：https://blog.csdn.net/jiandan1127/article/details/86170336

### 一、html跳转：
```html
<template slot-scope="scope">
  <router-link :to="{path:'/microservice/ciaDetail', query: { id:scope.row.id , status:scope.row.status }}">
    <el-button size="small" type="primary" plain v-if="scope.row.status=='1'">审核</el-button>
    <el-button size="small" type="primary" plain v-else-if="scope.row.status=='2'">详情</el-button>
    <el-button size="small" type="primary" plain v-else-if="scope.row.status=='3'">详情</el-button>
  </router-link>
</template>
```
#### html中接受跳转参数：
```html
$route.query.status  //接受传过来的status
```

### 二、js跳转：
```javascript
this.$router.push({
    path: `/test/demo`,
    query:{           //路由传参时push和query搭配使用 ，作用：传递参数
          id:this.id ,  
    }
});
// 或   【注：上方式：浏览器可返回上一级页面   下方式：浏览器不会返回 相当于重定向】
this.$router.replace('/test/demo')
```
#### js中接受跳转参数：
```javascript
this.$route.query.id  //接受传过来的id
```


### 返回上一级路由
```
this.$router.go(-1)
```
