# Vue - 判断存在效验则清除效验

```vue
<el-dialog :title="title[dialogStatus]" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色编码:" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>
```
```javascript
methods: {
    // 监听dialog关闭时的处理事件
    handleDialogClose(){
        if(this.$refs['dataForm']){
          this.$refs['dataForm'].clearValidate(); // 清除整个表单的校验
        }
    }  
}
```


### 延迟加载
```vue
setTimeout(() => {
    this.listLoading = false
}, 1.5 * 1000)
```

ex:
```vue
methods: {
    getList() {
        this.listLoading = true;
        getRolePage(this.listQuery).then(response => {
            this.list = response.data.records;
            this.total = response.data.total;
            setTimeout(() => {
                this.listLoading = false
            }, 1.5 * 1000)
         })
    }
}
```
