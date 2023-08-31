<template>
  <div>
    <el-upload
      v-bind="$attrs"
      v-model:file-list="fileList"
      :action="uploadUrl"
      list-type="picture-card"
      :headers="dataToken"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-preview="onPreview"
      multiple
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script>
import useStore from '@/store'
export default {
  model: {
    event: 'change',
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    fileList: {
      set: function (val) {
        // console.log(11, val)
        // this.$emit('update:modelValue', list)
      },
      get: function () {
        // console.log(11, this.modelValue)
        return this.modelValue
      },
    },
  },
  data() {
    return {
      uploadUrl: import.meta.env.VITE_APP_BASE_FILE_API,
      dataToken: { [useStore().user.tokenName]: useStore().user.tokenValue },
      dialogImageUrl: null,
      dialogVisible: false,
    }
  },
  methods: {
    beforeUpload(file) {
      const patt = /^[a-z0-9A-Z\u4e00-\u9fa5|\.]+$/
      if (!patt.test(file.name)) {
        this.$message({
          type: 'error',
          message: '上传失败：文件名只能为中文，数字或大小写字母，请修改文件名或重新上传文件!',
          duration: 5000,
        })
        return false
      }
      return true
    },
    async onSuccess(res, uploadFile, fileList) {
      const data = res.data

      // 上传成功需手动替换文件路径为远程URL，否则图片地址为预览地址 blob:http://
      const fileIndex = fileList.findIndex((file) => file.uid == uploadFile.uid)
      fileList.splice(fileIndex, 1, {
        name: data.name,
        url: data.url,
      })
      this.callback(fileList)
      // this.submitOk("成功");
      // this.$emit('saveSucc', data)
    },
    onRemove() {},
    onPreview(uploadFile) {
      this.dialogImageUrl = uploadFile.url
      this.dialogVisible = true
    },

    callback(fileList) {
      this.$emit('update:modelValue', fileList)
    },
  },
}
</script>
<style lang="scss" scoped></style>
