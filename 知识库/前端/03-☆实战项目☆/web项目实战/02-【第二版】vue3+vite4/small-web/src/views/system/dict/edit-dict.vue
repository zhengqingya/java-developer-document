<template>
  <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="30%">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="字典名称：" prop="name">
        <el-input v-model="form.name" placeholder="输入字典名称" />
      </el-form-item>
      <el-form-item label="字典值：" prop="value">
        <el-input v-model="form.value" placeholder="输入字典值" />
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="form.sort" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </template>
  </base-dialog>
</template>
<script setup>
const { proxy } = getCurrentInstance();

let dialogStatus = $ref('');
let dialogVisible = $ref(false);
let form = $ref({});
let rules = {
  name: [{ required: true, message: '字典名称不得为空', trigger: 'blur' }],
  value: [{ required: true, message: '字典值不得为空', trigger: 'blur' }],
};

defineExpose({
  open,
});

function open(type, data, dictTypeId, code, maxSort) {
  dialogStatus = type;
  if (type === 'add') {
    form = { dictTypeId: dictTypeId, code: code, sort: maxSort };
  } else if (type === 'update') {
    form = Object.assign({}, data);
  }
  dialogVisible = true;
}
function handleSave() {
  proxy.$refs.formRef.validate(async (valid) => {
    if (valid) {
      let res = await proxy.$api.sys_dict[form.id ? 'update' : 'add'](form);
      proxy.$emit('save-succ');
      dialogVisible = false;
      proxy.submitOk(res.msg);
    } else {
      return false;
    }
  });
}
</script>
<style lang="scss" scoped></style>
