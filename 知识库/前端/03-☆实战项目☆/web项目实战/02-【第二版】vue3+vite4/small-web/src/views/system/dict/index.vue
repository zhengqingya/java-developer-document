<template>
  <base-wrapper class="flex">
    <base-card title="字典类型">
      <template #append>
        <el-button type="primary" @click="addDictType">添加</el-button>
      </template>
      <el-tree
        v-if="dictionaryTree.length > 0"
        :props="{
          children: 'children',
          label: 'name',
        }"
        :data="dictionaryTree"
        highlight-current
        @node-click="handleNodeClick" />
    </base-card>

    <div class="flex-1 p-x-10">
      <base-no-data v-if="!selectedDictTypeData" style="height: 200px">点击左侧数据查看</base-no-data>

      <div v-else>
        <base-card title="字典类型信息">
          <template #append>
            <el-button type="primary" @click="updateDictType(selectedDictTypeData)">编辑 </el-button>
            <el-button type="danger" @click="deleteDictType">删除</el-button>
          </template>
          <base-cell label-width="100px">
            <base-cell-item label="字典类型名称">{{ selectedDictTypeData.name }}</base-cell-item>
            <base-cell-item label="字典类型编码">{{ selectedDictTypeData.code }}</base-cell-item>
            <base-cell-item label="字典类型状态">{{ selectedDictTypeData.status == 1 ? '启用' : '停用' }}</base-cell-item>
          </base-cell>
        </base-card>

        <base-card title="字典列表" class="m-t-10">
          <template #append>
            <el-button v-if="isShowAddDictButton" type="primary" @click="addDict">添加</el-button>
          </template>
          <el-table v-loading.body="listLoading" :data="dicList" border :height="calcTableHeight">
            <el-table-column type="index" label="序号" width="60px" align="center" />
            <el-table-column prop="name" label="字典名称" align="center" />
            <el-table-column prop="value" label="字典值" align="center" />
            <el-table-column prop="sort" label="排序" align="center" />
            <el-table-column label="操作" align="center" width="150">
              <template #default="scope">
                <el-button link @click="updateDict(scope.row)">编辑</el-button>
                <base-delete-btn @ok="deleteDict(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </base-card>
      </div>
    </div>

    <edit-dict ref="editDictRef" @save-succ="getDicList(selectedDictTypeData)" />
    <edit-dict-type ref="editDictTypeRef" @save-succ="getDictTree()" />
  </base-wrapper>
</template>
<script setup>
import editDict from './edit-dict.vue';
import editDictType from './edit-dict-type.vue';
const { proxy } = getCurrentInstance();
let isShowAddDictButton = $ref(false);
let dictionaryTree = $ref([]);
let dicList = $ref([]); // 字典列表
let selectedDictTypeData = $ref(null);
let listLoading = $ref(false);

onMounted(() => {
  getDictTree();
});

const calcTableHeight = computed(() => {
  const winHeight = document.documentElement.clientHeight;
  return Math.abs(winHeight - 400);
});

async function getDictTree() {
  let res = await proxy.$api.sys_dict_type.list();
  dictionaryTree = res.data;
  selectedDictTypeData = null;
  dicList = [];
  isShowAddDictButton = false;
}
function handleNodeClick(data) {
  selectedDictTypeData = data;
  getDicList(selectedDictTypeData);
  isShowAddDictButton = true;
}
async function getDicList(data) {
  let res = await proxy.$api.sys_dict.listByCode(data.code);
  dicList = res.data;
}
function addDict() {
  if (!selectedDictTypeData.name) {
    proxy.$message.warning('请先选中要添加的字典类型');
    return;
  }
  var maxSort = 1;
  if (dicList.length > 0) {
    maxSort = Math.max(...dicList.map((e) => e.sort)) + 1;
  }
  proxy.$refs.editDictRef.open('add', null, selectedDictTypeData.id, selectedDictTypeData.code, maxSort);
}
function updateDict(row) {
  proxy.$refs.editDictRef.open('update', row);
}
async function deleteDict({ id }) {
  let res = await proxy.$api.sys_dict.delete(id);
  proxy.submitOk(res.msg);
  getDicList(selectedDictTypeData);
}
// 下：数据字典类型操作 ======================
function addDictType() {
  proxy.$refs.editDictTypeRef.open('add');
}
function updateDictType(row) {
  proxy.$refs.editDictTypeRef.open('update', row);
}
function deleteDictType() {
  if (!selectedDictTypeData.name) {
    proxy.$message.warning('请先选中要删除的字典类型');
    return;
  }
  proxy
    .$confirm('确定删除数据字典?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(async () => {
      let res = await proxy.$api.sys_dict_type.delete(selectedDictTypeData.id);
      proxy.submitOk(res.msg);
      getDictTree();
    });
}
</script>
<style scoped></style>
