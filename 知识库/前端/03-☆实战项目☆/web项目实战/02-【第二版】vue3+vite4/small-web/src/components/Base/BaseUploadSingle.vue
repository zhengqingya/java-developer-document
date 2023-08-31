<template>
  <div>
    <el-upload
      v-bind="$attrs"
      :action="uploadUrl"
      :headers="{ [tokenObj.tokenName]: tokenObj.tokenValue }"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove">
      <el-image v-if="modelValue" :src="modelValue" class="img-base" />
      <el-button v-else size="small">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let { tokenObj } = toRefs(proxy.$store.user.useUserStore());
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

let uploadUrl = import.meta.env.VITE_APP_BASE_FILE_API;

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
  proxy.$emit('update:modelValue', data.url);
}

function onRemove() {}
</script>
<style lang="scss" scoped></style>
