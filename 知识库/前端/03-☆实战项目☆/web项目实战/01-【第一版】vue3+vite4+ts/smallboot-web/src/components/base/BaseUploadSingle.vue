<template>
  <div>
    <!-- <span>{{ imgUrl }}</span> -->
    <el-upload v-bind="$attrs" :action="uploadUrl" :headers="dataToken" :show-file-list="false"
      :before-upload="beforeUpload" :on-success="onSuccess" :on-remove="onRemove">
      <el-image v-if="imgUrl" :src="imgUrl" style="width: 100px; height: 100px" />
      <el-button v-else size="small">点击上传</el-button>
    </el-upload>
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
      type: String,
      default: '',
    },
  },
  computed: {
    imgUrl: {
      set: function (val) {
        this.$emit('update:modelValue', val)
      },
      get: function () {
        return this.modelValue
      },
    },
  },
  data() {
    return {
      uploadUrl: import.meta.env.VITE_APP_BASE_FILE_API,
      dataToken: { [useStore().user.tokenName]: useStore().user.tokenValue },
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
      this.imgUrl = data.url
      // this.submitOk("成功");
      this.$emit('saveSucc', data.url)
    },
    onRemove() { },
  },
}
</script>
<style lang="scss" scoped></style>
