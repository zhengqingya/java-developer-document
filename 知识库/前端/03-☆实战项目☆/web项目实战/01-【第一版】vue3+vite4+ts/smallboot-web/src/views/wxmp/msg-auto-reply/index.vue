<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-input v-model="listQuery.matchValue" placeholder="请输入关键词" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="wx_mp_msg_auto_reply.page" :params="listQuery">
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="类型" prop="typeName" align="center"></el-table-column>
      <el-table-column label="关键词" prop="matchValue" align="center"></el-table-column>
      <el-table-column label="是否精确匹配" prop="isExactMatch" align="center"></el-table-column>
      <el-table-column label="回复消息类型" prop="replyTypeName" align="center"></el-table-column>
      <el-table-column label="回复消息内容" prop="replyContent" align="left" width="500px" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button link @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button link @click="handleDetail(scope.row)">详情</el-button>
          <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
      <el-form ref="dataForm" v-if="dialogStatus !== 'detail'" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select v-model="form.type" placeholder="请选择" @change="handleChangeType">
            <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <div v-if="form.type === 2">
          <el-form-item label="关键词:" prop="matchValue">
            <el-input v-model="form.matchValue"></el-input>
          </el-form-item>
          <el-form-item label="是否精确匹配:" prop="isExactMatch">
            <el-select v-model="form.isExactMatch" placeholder="请选择">
              <el-option v-for="item in isExactMatchList" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="回复消息类型:" prop="replyType">
          <el-select v-model="form.replyType" placeholder="请选择">
            <el-option v-for="item in replyTypeList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="回复消息内容:" prop="replyContent">
          <el-input v-model="form.replyContent"></el-input>
        </el-form-item>
      </el-form>
      <base-table-cell label-width="110px" v-else>
        <base-cell-item label="名称">{{ form.name }}</base-cell-item>
        <base-cell-item label="类型">{{ form.typeName }}</base-cell-item>
        <base-cell-item label="关键词">{{ form.matchValue }}</base-cell-item>
        <base-cell-item label="是否精确匹配">{{ form.isExactMatch }}</base-cell-item>
        <base-cell-item label="回复消息类型">{{ form.replyTypeName }}</base-cell-item>
        <base-cell-item label="回复消息内容">{{ form.replyContent }}</base-cell-item>
      </base-table-cell>
      <template #footer v-if="dialogStatus !== 'detail'">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </base-dialog>
  </base-wraper>
</template>

<script>
export default {
  name: 'WxMpMsgAutoReply',
  data() {
    return {
      listQuery: {},
      form: {},
      typeList: [
        { value: 1, name: '关注时回复' },
        { value: 2, name: '关键词回复' },
      ],
      isExactMatchList: [
        { value: 1, name: '是' },
        { value: 0, name: '否' },
      ],
      replyTypeList: [
        { value: 'text', name: '文本' },
        { value: 'image', name: '图片' },
        { value: 'voice', name: '语音' },
        { value: 'video', name: '视频' },
        { value: 'music', name: '音乐' },
        { value: 'news', name: '图文' },
      ],
      dialogVisible: false,
      dialogStatus: '',
      titleMap: {
        add: '添加',
        update: '编辑',
        detail: '详情',
      },
      rules: {},
    }
  },
  created() {},
  methods: {
    refreshTableData() {
      this.$refs.baseTable.refresh()
    },
    handleDetail(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'detail'
      this.dialogVisible = true
    },
    handleAdd() {
      this.form = Object.assign({}, {})
      this.dialogStatus = 'add'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    handleChangeType() {
      if (this.form.type === 1) {
        this.form.matchValue === 'subscribe'
      }
    },
    async handleDelete(row) {
      let res = await this.$api.wx_mp_msg_auto_reply.delete(row.id)
      this.refreshTableData()
      this.submitOk(res.message)
    },
    submitForm() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          let res = await this.$api.wx_mp_msg_auto_reply[this.form.id ? 'update' : 'add'](this.form)
          this.submitOk(res.message)
          this.refreshTableData()
          this.dialogVisible = false
        }
      })
    },
  },
}
</script>
<style scoped></style>
