<template>
  <span ref="boxRef">
    <el-popover :visible="visible" placement="top" :width="200" trigger="click" @show="show" @hide="hide">
      <p>您确定删除这条数据吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button link @click="visible = false">取消</el-button>
        <el-button link @click="handleOk">确定</el-button>
      </div>
      <template #reference>
        <el-button link style="margin-left: 5px; color: #f36161" @click="visible = true"> 删除 </el-button>
      </template>
    </el-popover>
  </span>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let visible = $ref(false);

const emits = defineEmits(['ok']);
function handleOk() {
  emits('ok');
  visible = false;
}

function show() {
  document.addEventListener('click', handleClick, false);
}

function hide() {
  document.removeEventListener('click', handleClick, false);
}

function handleClick(e) {
  if (!proxy.$refs.boxRef.contains(e.target)) {
    visible = false;
    hide();
  }
}
</script>
<style lang="scss" scoped></style>
