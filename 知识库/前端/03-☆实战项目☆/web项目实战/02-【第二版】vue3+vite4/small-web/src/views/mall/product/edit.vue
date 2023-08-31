<template>
  <base-wraper>
    <h1 class="flex-center-center m-b-20">{{ proxy.$route.query.isAdd ? '添加商品' : '编辑商品' }}</h1>
    <el-form ref="dataFormRef" :model="form" label-width="100px">
      <el-form-item label="名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="封面图:" prop="coverImg">
        <base-upload-single v-model="form.coverImg" />
      </el-form-item>
      <el-form-item label="轮播图:" prop="slideImgList">
        <base-upload-multi v-model="form.slideImgList" />
      </el-form-item>
      <el-form-item label="商品详情图:" prop="detailImgList">
        <base-upload-multi v-model="form.detailImgList" />
      </el-form-item>
      <el-form-item label="商品sku:">
        <sku ref="skuRef" v-model="form.skuList" />
      </el-form-item>
      <el-form-item label="是否上架:" prop="isPut">
        <el-radio-group v-model="form.isPut">
          <el-radio :label="false">下架</el-radio>
          <el-radio :label="true">上架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示:" prop="isShow">
        <el-radio-group v-model="form.isShow">
          <el-radio :label="false">隐藏</el-radio>
          <el-radio :label="true">显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item label="运费:" prop="freight">
        <el-input v-model="form.freight"></el-input>
      </el-form-item>
    </el-form>
    <div class="flex-center-center">
      <router-link to="/mall/product"> <el-button>返回</el-button></router-link>
      <el-button type="primary" class="m-l-20" @click="submitForm">确定</el-button>
    </div>
  </base-wraper>
</template>

<script setup>
import sku from './sku.vue';
const { proxy } = getCurrentInstance();
let id = $ref(null);
let form = $ref({});

onMounted(() => {
  if (proxy.$route.query.isAdd) {
    form = { isPut: true, isShow: true, sort: 0, freight: 0, type: 101 };
  } else {
    id = proxy.$route.query.id;
    if (!id) {
      proxy.$router.push('/mall/product');
      return;
    }
    initData();
  }
});

async function initData() {
  let res = await proxy.$api.pms_spu.detail({ id });
  form = res.data;
  // 金额一类 分转元
  form.freight = form.freight / 100;
  proxy.$refs.skuRef.init(form.skuList);
}

function submitForm() {
  proxy.$refs.dataFormRef.validate(async (valid) => {
    if (valid) {
      // 转存下 -- 防止异常情况下的金额数据显示问题
      let apiForm = JSON.parse(JSON.stringify(form));

      // 金额 元转分
      apiForm.freight = form.freight * 100;
      if (apiForm.skuList && apiForm.skuList.length > 0) {
        apiForm.skuList.forEach((item) => {
          item.sellPrice = item.sellPrice * 100;
        });
      }

      let res = await proxy.$api.pms_spu[apiForm.id ? 'update' : 'add'](apiForm);
      proxy.submitOk(res.message);
      // proxy.$router.push('/mall/product');
    }
  });
}
</script>
<style scoped></style>
