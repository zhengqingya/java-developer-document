<template>
  <base-wraper>
    <base-header>
      <el-select v-model="listQuery.mediaType" placeholder="请选择">
        <el-option v-for="item in materialTypeList" :key="item.value" :label="item.name" :value="item.value" />
      </el-select>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="wx_mp_material.page" :params="listQuery">
      <el-table-column label="mediaId" prop="mediaId" width="500px" align="center"></el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
      <el-table-column label="url" prop="url" align="center">
        <template v-slot="scope">
          <el-image style="width: 50px; height: 50px" :src="scope.row.url" />
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
      <el-form ref="dataForm" :model="form" :rules="rules" label-width="100px">
        <!-- <el-form-item label="名称:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item> -->
        <el-form-item label="素材类型:" prop="mediaType">
          <el-select v-model="form.mediaType" placeholder="请选择">
            <el-option v-for="item in materialTypeList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="素材:" prop="file">
          <el-upload drag v-model:file-list="fileList" :limit="1" :http-request="uploadFile">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div>拖动文件到此上传或点击上传</div>
            <template #tip>
              <div class="el-upload__tip">
                <span>提示：文件最大2MB</span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </base-dialog>
  </base-wraper>
</template>

<script>
export default {
  name: 'WxMpmaterial',
  data() {
    return {
      listQuery: {
        mediaType: 'image',
      },
      form: {},
      fileList: [],
      materialTypeList: [
        { value: 'news', name: '图文' },
        { value: 'voice', name: '语音' },
        { value: 'image', name: '图片' },
        { value: 'video', name: '视频' },
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
    handleAdd() {
      this.form = Object.assign({}, {})
      this.dialogStatus = 'add'
      this.dialogVisible = true
      this.form.mediaType = 'image'
      this.fileList = []
    },

    // stl文件数据处理
    async uploadFile(content) {
      let file = content.file
      // console.log(file)
      if (file.size / 1024 / 1024 > 2) {
        this.submitFail('文件最大2MB')
        return
      }
      this.fileList = [
        {
          name: file.name,
          file: file,
        },
      ]
    },
    async submitForm() {
      this.form.file = this.fileList[0].file
      let res = await this.$api.wx_mp_material.add(this.form)
      this.submitOk(res.message)
      this.refreshTableData()
      this.dialogVisible = false
    },
  },
}
</script>
<style scoped></style>
