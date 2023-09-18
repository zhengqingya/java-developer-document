<template>
  <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="30%">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="120px">
      <el-form-item v-if="hasParent" label="上级菜单:">
        <span>{{ parentName }}</span>
      </el-form-item>
      <el-form-item label="菜单标题:" prop="title">
        <el-input v-model="form.title" placeholder="输入标题" />
      </el-form-item>
      <el-form-item label="菜单路径:" prop="path">
        <el-input v-model="form.path" placeholder="输入菜单链接" />
      </el-form-item>
      <el-form-item label="组件:" prop="component">
        <el-input v-model="form.component" placeholder="输入菜单对应的文件路径" />
      </el-form-item>
      <el-form-item label="菜单图标:">
        <el-select v-model="form.icon" placeholder="请选择图标" style="width: 200px" filterable clearable allow-create>
          <el-option v-for="item in elIconList" :key="item.name" :value="item.name" :label="item.name">
            <span style="float: left; color: #8492a6; font-size: 12px">{{ item.name }}</span>
            <div style="float: right">
              <el-icon size="16">
                <component :is="item.name" />
              </el-icon>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示顺序:">
        <el-input-number v-model="form.sort" />
      </el-form-item>
      <el-form-item label="重定向路径:">
        <el-input v-model="form.redirect" placeholder="输入重定向路径" />
      </el-form-item>
      <el-form-item label="是否显示:">
        <el-radio-group v-model="form.isShow">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示面包屑:">
        <el-radio-group v-model="form.isShowBreadcrumb">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
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

let dialogVisible = $ref(false);
let dialogStatus = $ref('add');
let hasParent = $ref(false);
let parentName = $ref('');
let elIconList = $ref([]);
let form = $ref({});
let rules = {
  title: [{ required: true, message: '菜单标题不得为空', trigger: 'blur' }],
  path: [{ required: true, message: '菜单链接不得为空', trigger: 'blur' }],
  component: [{ required: true, message: '菜单文件路径不得为空', trigger: 'blur' }],
};

// 暴露方法
defineExpose({
  open,
});

function resetForm() {
  form = {
    parentId: 0,
    isShow: true, // 是否显示
    isShowBreadcrumb: true, // 面包屑是否显示
  };
}

// 打开弹窗
function open(type, currentClickMenu) {
  if (type === 1) {
    // 新增第一级
    hasParent = false;
    resetForm();
  } else if (type === 2) {
    // 添加下一级
    hasParent = true;
    resetForm();
    if (currentClickMenu) {
      form.parentId = currentClickMenu.menuId;
      form.sort = currentClickMenu.children.length + 1;
      parentName = currentClickMenu.title;
    }
  } else if (type === 3) {
    // 编辑
    dialogStatus = 'update';
    if (currentClickMenu) {
      if (currentClickMenu.parentId) {
        hasParent = true;
        parentName = currentClickMenu.parentName;
      }
      form = Object.assign({}, currentClickMenu);
    }
  }
  getIconList();
  dialogVisible = true;
}
async function getIconList() {
  let res = await proxy.$api.sys_dict.listFromCacheByCode('element_icon');
  elIconList = res.data;
}
function handleSave() {
  proxy.$refs.formRef.validate(async (valid) => {
    if (valid) {
      let res = await proxy.$api.sys_menu[form.menuId ? 'update' : 'add'](form);
      proxy.submitOk(res.msg);
      proxy.$emit('handle-succ');
      dialogVisible = false;
    }
  });
}
</script>
<style lang="scss" scoped></style>
