<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.key" clearable placeholder="key" style="width: 200px" @clear="refreshTableData" />
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="add">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="sys_property.listPage" :params="listQuery">
      <el-table-column prop="key" label="属性key" />
      <el-table-column prop="value" label="属性value" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" align="center" width="250">
        <template v-slot="scope">
          <el-button link @click="update(scope.row)">编辑</el-button>
          <base-delete-btn @ok="deleteData(scope.row.id)" />
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="textMap[dialogStatus]" width="50%">
      <el-form ref="formRef" :model="form" label-width="100px">
        <el-form-item label="属性key：">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item label="属性value：">
          <el-input v-model="form.value" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveForm">确 定</el-button>
      </template>
    </base-dialog>
  </base-wraper>
</template>
<script setup lang="ts">
import { reactive, toRefs, getCurrentInstance } from 'vue'
// 组件实例
const { proxy }: any = getCurrentInstance()
// 响应式
const state = reactive({
  form: {} as any,
  dialogVisible: false,
  listLoading: false,
  listQuery: {
    key: '',
  },
  dialogStatus: '',
  textMap: {
    update: '编辑',
    create: '添加',
  } as any,
})
const { form, dialogVisible, listQuery, dialogStatus, textMap } = toRefs(state)

async function refreshTableData() {
  proxy.$refs.baseTable.refresh()
}
function saveForm() {
  proxy.$refs.formRef.validate(async (valid: any) => {
    if (valid) {
      let res = await proxy.$api.sys_property[state.form.id ? 'update' : 'add'](state.form)
      proxy.submitOk(res.msg)
      refreshTableData()
      state.dialogVisible = false
    }
  })
}
function update(row: any) {
  state.form = Object.assign({}, row)
  state.dialogVisible = true
  state.dialogStatus = 'update'
}
function add() {
  state.dialogVisible = true
  state.dialogStatus = 'create'
  state.form = {}
}
async function deleteData(id: number) {
  let res = await proxy.$api.sys_property.delete(id)
  proxy.submitOk(res.msg)
  refreshTableData()
}
</script>
<style scoped></style>
