<template>
  <span ref="box">
    <el-popover :visible="visible" placement="top" :width="200" trigger="click" @show="show" @hide="hide">
      <p>确定删除此条数据吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button link @click="visible = false">取消</el-button>
        <el-button link @click="handleClick">确定</el-button>
      </div>
      <template #reference>
        <el-button link style="margin-left: 5px; color: #f56c6c" @click="visible = true"> 删除 </el-button>
      </template>
    </el-popover>
  </span>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleClick() {
      this.$emit('ok')
      this.visible = false
    },
    show() {
      document.addEventListener('click', this.hidePanel, false)
    },
    hide() {
      document.removeEventListener('click', this.hidePanel, false)
    },
    hidePanel(e) {
      if (!this.$refs.box.contains(e.target)) {
        this.visible = false
        this.hide()
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
