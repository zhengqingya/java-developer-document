# dialog中组件每次打开时都重新执行生命周期

问题： dialog组件中存在一个组件 `<sku-form ref="skuForm" v-model="form.skuList" />`
第一次打开页面的时候，可以执行组件中的init函数，但第二次不行

解决：`<el-dialog v-if="dialogVisible" </el-dialog>`
即使用v-if去控制每次显示关闭对话框时的元素销毁
