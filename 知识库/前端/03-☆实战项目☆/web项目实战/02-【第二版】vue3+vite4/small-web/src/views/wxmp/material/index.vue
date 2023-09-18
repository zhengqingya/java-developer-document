<template>
  <base-wrapper>
    <base-header>
      <el-select v-model="listQuery.mediaType" placeholder="请选择">
        <el-option v-for="item in materialTypeList" :key="item.value" :label="item.name" :value="item.value" />
      </el-select>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="wx_mp_material.page" :params="listQuery">
      <el-table-column label="mediaId" prop="mediaId" width="500px" align="center"></el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
      <el-table-column label="url" prop="url" align="center">
        <template #default="scope">
          <el-image style="width: 50px; height: 50px" :src="scope.row.url" />
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="30%">
      <el-form ref="dataForm" :model="form" label-width="100px">
        <!-- <el-form-item label="名称:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item> -->
        <el-form-item label="素材类型:" prop="mediaType">
          <el-select v-model="form.mediaType" placeholder="请选择">
            <el-option v-for="item in materialTypeList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="素材:" prop="file">
          <el-upload v-model:file-list="fileList" drag :limit="1" :http-request="uploadFile">
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
  </base-wrapper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let listQuery = $ref({ mediaType: 'image' });
let form = $ref({});
let fileList = $ref([]);
let dialogVisible = $ref(false);
let dialogStatus = $ref('');

let materialTypeList = [
  { value: 'news', name: '图文' },
  { value: 'voice', name: '语音' },
  { value: 'image', name: '图片' },
  { value: 'video', name: '视频' },
];

function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
function handleAdd() {
  form = Object.assign({}, {});
  dialogStatus = 'add';
  dialogVisible = true;
  form.mediaType = 'image';
  fileList = [];
}

async function uploadFile(content) {
  let file = content.file;
  // console.log(file)
  if (file.size / 1024 / 1024 > 2) {
    submitFail('文件最大2MB');
    return;
  }
  fileList = [{ name: file.name, file: file }];
}
async function submitForm() {
  form.file = fileList[0].file;
  let res = await proxy.$api.wx_mp_material.add(form);
  proxy.submitOk(res.message);
  refreshTableData();
  dialogVisible = false;
}
</script>
<style scoped></style>
