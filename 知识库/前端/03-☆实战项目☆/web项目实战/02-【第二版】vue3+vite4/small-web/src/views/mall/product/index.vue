<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <router-link to="/mall/product-edit?isAdd=true"><el-button type="primary">添加</el-button></router-link>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="pms_spu.page" :params="listQuery">
      <!-- <el-table-column label="ID" prop="id" align="center"></el-table-column> -->
      <el-table-column label="封面图" prop="coverImg" align="center">
        <template #default="scope">
          <el-image :src="scope.row.coverImg" class="img-sm" />
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="规格" align="center" width="230px">
        <template #default="scope">
          <!-- {{ scope.row.skuList }} -->
          <div v-for="item in scope.row.skuList" :key="item.id" class="flex-between-center p-y-3">
            <el-image :src="item.coverImg" class="img-sm" />
            <div class="flex-1 m-l-10">
              <div class="flex-between-center">
                <span class="text-color-grey"> {{ item.specList.map((obj) => obj.attrValueName).join(',') }} </span>
                <span class="text-color-red">￥{{ item.sellPrice / 100 }}</span>
              </div>
              <div class="flex-c-start-end">
                <span>总库存：{{ item.totalStock }}</span>
                <span>剩余库存：{{ item.usableStock }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否上架" prop="isPut" align="center">
        <template #default="scope">
          {{ scope.row.isPut ? '上架' : '下架' }}
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="isShow" align="center">
        <template #default="scope">
          {{ scope.row.isShow ? '显示' : '隐藏' }}
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <router-link :to="`/mall/product-edit?id=` + scope.row.id">
            <el-button link>编辑</el-button>
          </router-link>
          <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
        </template>
      </el-table-column>
    </base-table-p>
  </base-wraper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let listQuery = $ref({});

function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}

async function handleDelete(row) {
  let res = await proxy.$api.pms_spu.deleteBatch({ idList: [row.id].join() });
  refreshTableData();
  proxy.submitOk(res.message);
}
</script>
<style scoped></style>
