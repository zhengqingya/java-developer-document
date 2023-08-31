<template>
  <div>
    <el-upload
      v-bind="$attrs"
      v-model:file-list="fileList"
      :action="uploadUrl"
      list-type="picture-card"
      :headers="{ [tokenObj.tokenName]: tokenObj.tokenValue }"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-preview="onPreview"
      multiple>
      <el-icon><Plus /></el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <el-image v-if="dialogImageUrl" :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let { tokenObj } = toRefs(proxy.$store.user.useUserStore());
let props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

let uploadUrl = import.meta.env.VITE_APP_BASE_FILE_API;
let dialogImageUrl = $ref(null);
let dialogVisible = $ref(false);

const fileList = computed(() => {
  return props.modelValue;
});

function onPreview(uploadFile) {
  dialogImageUrl = uploadFile.url;
  dialogVisible = true;
}

function beforeUpload(file) {
  const patt = /^[a-z0-9A-Z\u4e00-\u9fa5|\.]+$/;
  if (!patt.test(file.name)) {
    proxy.submitFail('上传失败：文件名只能为中文，数字或大小写字母，请修改文件名或重新上传文件!');
    return false;
  }
  return true;
}

async function onSuccess(res, uploadFile, fileList) {
  const data = res.data;

  // 上传成功需手动替换文件路径为远程URL，否则图片地址为预览地址 blob:http://
  const fileIndex = fileList.findIndex((file) => file.uid == uploadFile.uid);
  fileList.splice(fileIndex, 1, {
    name: data.name,
    url: data.url,
  });
  proxy.$emit('update:modelValue', fileList);
}

function onRemove() {}
</script>
<style lang="scss" scoped></style>
