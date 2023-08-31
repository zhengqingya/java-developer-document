<template>
  <base-wraper>
    <el-row :gutter="15">
      <el-col :span="5">
        <base-wraper full-height>
          <base-title-card title="字典类型">
            <el-button type="primary" @click="addDictType">添加</el-button>
            <el-tree :props="defaultProps" :data="dictionaryTree" highlight-current @node-click="handleNodeClick" />
          </base-title-card>
        </base-wraper>
      </el-col>
      <el-col :span="7">
        <base-wraper>
          <base-title-card title="字典类型信息">
            <el-button v-if="dictTypeData.name" type="primary" @click="updateDictType(dictTypeData)">编辑 </el-button>
            <el-button v-if="dictTypeData.name" type="danger" @click="deleteDictType">删除</el-button>
            <base-table-cell>
              <base-cell-item label-width="105px" label="字典类型名称">{{ dictTypeData.name }}</base-cell-item>
              <base-cell-item label-width="105px" label="字典类型编码">{{ dictTypeData.code }}</base-cell-item>
              <base-cell-item label-width="105px" v-if="dictTypeData.status == 1" label="字典类型状态">启用</base-cell-item>
              <base-cell-item label-width="105px" v-if="dictTypeData.status == 0" label="字典类型状态">停用</base-cell-item>
            </base-table-cell>
          </base-title-card>
        </base-wraper>
      </el-col>
      <el-col :span="10">
        <base-title-card style="margin-top: 10px" title="字典列表">
          <el-button v-if="isShowAddDictButton" type="primary" @click="addDict">添加</el-button>
          <el-table v-loading.body="listLoading" :data="dicList" border :height="calcTableHeight">
            <el-table-column type="index" label="序号" width="60px" align="center" />
            <el-table-column prop="name" label="字典名称" align="center" />
            <el-table-column prop="value" label="字典值" align="center" />
            <el-table-column prop="sort" label="排序" align="center" />
            <el-table-column label="操作" align="center" width="150">
              <template v-slot="scope">
                <el-button link @click="updateDict(scope.row)">编辑</el-button>
                <base-delete-btn @ok="deleteDict(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </base-title-card>
      </el-col>
    </el-row>
    <edit-dict ref="editDict" @saveSucc="getDicList(dictTypeData)" />
    <edit-dict-type ref="editDictType" @saveSucc="getDictTree()" />
  </base-wraper>
</template>
<script>
import editDict from './edit-dict.vue'
import editDictType from './edit-dict-type.vue'
export default {
  name: 'Dict',
  components: { editDict, editDictType },
  data() {
    return {
      isShowAddDictButton: false,
      dictionaryTree: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      dicList: [], // 字典列表
      dictTypeData: {},
      listLoading: false,
    }
  },
  computed: {
    calcTableHeight() {
      const winHeight = document.documentElement.clientHeight
      return Math.abs(winHeight - 360)
    },
  },
  mounted() {
    this.getDictTree()
  },
  methods: {
    async getDictTree() {
      let res = await this.$api.sys_dict_type.list()
      this.dictionaryTree = res.data
      this.dictTypeData = {}
      this.dicList = []
      this.isShowAddDictButton = false
    },
    handleNodeClick(data) {
      this.dictTypeData = data
      this.getDicList(this.dictTypeData)
      this.isShowAddDictButton = true
    },
    async getDicList(data) {
      let res = await this.$api.sys_dict.listByCode(data.code)
      this.dicList = res.data
    },
    addDict() {
      if (!this.dictTypeData.name) {
        this.$message.warning('请先选中要添加的字典类型')
        return
      }
      var maxSort = 1
      if (this.dicList.length > 0) {
        maxSort = Math.max(...this.dicList.map((e) => e.sort)) + 1
      }
      this.$refs.editDict.open('create', null, this.dictTypeData.id, this.dictTypeData.code, maxSort)
    },
    updateDict(row) {
      this.$refs.editDict.open('update', row)
    },
    async deleteDict({ id }) {
      let res = await this.$api.sys_dict.delete(id)
      this.submitOk(res.msg)
      this.getDicList(this.dictTypeData)
    },
    // 下：数据字典类型操作 ======================
    addDictType() {
      this.$refs.editDictType.open('create')
    },
    updateDictType(row) {
      this.$refs.editDictType.open('update', row)
    },
    deleteDictType() {
      if (!this.dictTypeData.name) {
        this.$message.warning('请先选中要删除的字典类型')
        return
      }
      this.$confirm('确定删除数据字典?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        let res = await this.$api.sys_dict_type.delete(this.dictTypeData.id)
        this.submitOk(res.msg)
        this.getDictTree()
      })
    },
  },
}
</script>
<style scoped></style>
