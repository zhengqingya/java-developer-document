# 小技巧

### Vue table表头显示值  ->  https://my.oschina.net/u/264284/blog/2872831

#### 方法一：直接在template scope 使用v-if判断
```vue
<el-table-column prop="versionStatus" label="标准状态">
    <template slot-scope="scope">                   
            <p v-if="scope.row.versionStatus=='1'">
                在用
            </p>
            <p v-else-if="scope.row.versionStatus=='2'">
                过期
            </p>
            <p v-else-if="scope.row.versionStatus=='3'">
                作废
            </p>
            <p v-else-if="scope.row.versionStatus=='4'">
                停用
            </p>                    
    </template>
</el-table-column>

或

<el-table-column prop="status" label="显示状态">
  <template scope="scope">
    <span v-if="scope.row.status=== 1">在线</span>
    <span v-else-if="scope.row.status=== 0">离线</span>
  </template>
</el-table-column>
```

```vue
<el-table-column align="center" label="操作">
    <template slot-scope="scope">
      <el-button type="text" style="color:#3785FF;" @click="handleUpdate(scope.row)">编辑</el-button>
      <cus-del-btn @ok="handleDel(scope.row)"/> &nbsp;
      <el-button type="text" style="color:#3785FF;" @click="handleDetail(scope.row)">详情</el-button>
    </template>
</el-table-column>
```

#### 方法二：element-ui formatter
1. el-table-column 绑定formatter属性
```vue
<el-table-column 
  prop="status"
  align='center'
  label="显示状态"
  :formatter="formatStatus">
</el-table-column>
```

2. 定义绑定的方法
```vue
formatStatus(row, column) {
  return row.status == 'Y' ? '已执行' : '未执行'
},
```

#### 方法三：在data对象中静态绑定属性
1. 在data中定义相关值
```vue
data () {
  return {
    ASSET_STATUS: {
      'used': { 'status': '使用中', 'type': 'primary' },
      'noused': { 'status': '未使用', 'type': 'info' },
      'broken': { 'status': '故障', 'type': 'danger' },
      'trash': { 'status': '废弃', 'type': 'warning' }
    }
  }
}
```

2. 在template中使用
```vue
<el-table-column prop='status' label='状态'>
  <template slot-scope="scope">
    <div slot="reference" class="name-wrapper" style="text-align: center">
      <el-tag :type="ASSET_STATUS[scope.row.status].type">
        {{ASSET_STATUS[scope.row.status].status}}
      </el-tag>
    </div>
  </template>
</el-table-column>
```

！！！！可以使用element ui 的 e-tag标签来显示不同的背景颜色！

---

```vue
<el-table-column label="AQI指数范围" align="center">
    <template slot-scope="scope">
      <span v-if="scope.row.aqiLowerLimit<300">{{ scope.row.aqiUpperLimit }}~{{ scope.row.aqiLowerLimit }}</span>
      <span v-else>  > {{ scope.row.aqiLowerLimit }}</span>
    </template>
</el-table-column>
```



