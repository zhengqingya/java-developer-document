<template>
  <base-wrapper class="">
    <h1 class="flex-center-center">{{ proxy.$route.query.isAdd ? '添加店铺' : isDetail ? '店铺详情' : '编辑店铺' }}</h1>

    <div class="flex m-t-10">
      <base-card title="基本信息" class="flex-1">
        <el-form ref="dataFormRef" :model="form" label-width="100px">
          <el-form-item label="名称:">
            <el-input v-model="form.shopName" :disabled="isDetail"></el-input>
          </el-form-item>
          <el-form-item label="联系人:">
            <el-input v-model="form.contactName" :disabled="isDetail" />
          </el-form-item>
          <el-form-item label="联系手机号:">
            <el-input v-model="form.contactPhone" :disabled="isDetail" />
          </el-form-item>
          <el-form-item label="是否显示:">
            <el-radio-group v-model="form.isShow" :disabled="isDetail">
              <el-radio :label="false">隐藏</el-radio>
              <el-radio :label="true">显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属地区:">
            <province-city-area v-model="form.provinceCityAreaList" :disabled="isDetail" />
          </el-form-item>
          <el-form-item label="详细地址:">
            <div class="flex-between-center w-full">
              <el-input v-model="form.address" :disabled="isDetail" />
              <el-button v-if="!isDetail" @click="addressToLocation">点击生成经纬度</el-button>
            </div>
          </el-form-item>
          <el-form-item label="门店坐标:">
            <div class="flex w-full">
              <div>经度 <el-input v-model="form.longitude" style="width: 50%" :disabled="isDetail" /></div>
              <div class="m-l-10">纬度 <el-input v-model="form.latitude" style="width: 50%" :disabled="isDetail" /></div>
            </div>
          </el-form-item>
          <base-map ref="mapRef" />
        </el-form>
      </base-card>

      <div>
        <base-card title="营业信息" class="flex-1 m-l-10 bg-color-white">
          <el-form ref="dataFormRef" :model="form" label-width="100px">
            <el-form-item label="堂食:">
              <el-radio-group v-model="form.snackStatus" :disabled="isDetail">
                <el-radio :label="false">关闭</el-radio>
                <el-radio :label="true">开启</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="外卖:">
              <el-radio-group v-model="form.takeoutStatus" :disabled="isDetail">
                <el-radio :label="false">关闭</el-radio>
                <el-radio :label="true">开启</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="营业:">
              <el-radio-group v-model="form.openStatus" :disabled="isDetail">
                <el-radio :label="false">未营业</el-radio>
                <el-radio :label="true">营业中</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="营业时间:">
              <div class="flex-column">
                <el-checkbox-group v-model="openTimeDayList">
                  <el-checkbox v-for="item in openTimeDayList" :key="item" disabled :label="item">{{ item }}</el-checkbox>
                </el-checkbox-group>
                <el-time-picker
                  v-model="form.openTimeStartAndEndArray"
                  :disabled="isDetail"
                  format="HH:mm"
                  value-format="HH:mm"
                  is-range
                  range-separator="到"
                  start-placeholder="开始营业时间点"
                  end-placeholder="结束营业时间点" />
              </div>
            </el-form-item>
          </el-form>
        </base-card>

        <base-card title="外卖信息" class="flex-1 m-l-10 bg-color-white">
          <el-form ref="dataFormRef" :model="form" label-width="160px">
            <el-form-item label="配送距离（单位：米）:">
              <el-input v-model="form.deliverDistance" :disabled="isDetail" />
            </el-form-item>
          </el-form>
        </base-card>
      </div>
    </div>

    <div class="flex-center-center m-t-10">
      <router-link to="/mall/shop"> <el-button>返回</el-button></router-link>
      <el-button v-if="!isDetail" type="primary" class="m-l-20" @click="submitForm">确定</el-button>
    </div>
  </base-wrapper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let shopId = $ref(null);
let isDetail = $ref(false);
let form = $ref({});
let openTimeDayList = $ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);

onMounted(() => {
  isDetail = proxy.$route.query.isDetail == 'true';
  if (!isDetail) {
    // proxy.$refs.mapRef.initMap({ lat: 30.56079, lng: 104.07483 });
    proxy.$refs.mapRef.initMap();
  }

  if (proxy.$route.query.isAdd) {
    form = { isShow: true, type: 1 };
  } else {
    shopId = proxy.$route.query.shopId;
    if (!shopId) {
      proxy.$router.push('/mall/shop');
      return;
    }
    initData();
  }
});

async function initData() {
  let res = await proxy.$api.sms_shop.detail({ shopId: shopId });
  form = res.data;
  form.provinceCityAreaList = [form.provinceName, form.cityName, form.areaName];
  form.openTimeStartAndEndArray = [form.openTimeList[0].startTime, form.openTimeList[0].endTime];
  form.openTimeList = null;
}

async function addressToLocation() {
  let locationObj = await proxy.$refs.mapRef.addressToLocation(form.address);
  if (locationObj) {
    form.latitude = locationObj.lat;
    form.longitude = locationObj.lng;
  }
}

function submitForm() {
  proxy.$refs.dataFormRef.validate(async (valid) => {
    if (valid) {
      // 省市区
      if (form.provinceCityAreaList) {
        form.provinceName = form.provinceCityAreaList[0];
        if (form.provinceCityAreaList.length > 1) {
          form.cityName = form.provinceCityAreaList[1];
          form.areaName = form.provinceCityAreaList[2];
        }
      }

      // 营业时间
      let timeArray = form.openTimeStartAndEndArray;
      if (timeArray) {
        form.openTimeList = [{ weekList: [1, 2, 3, 4, 5, 6, 7], startTime: timeArray[0], endTime: timeArray[1] }];
      }

      let res = await proxy.$api.sms_shop[form.shopId ? 'update' : 'add'](form);
      proxy.submitOk(res.message);
      proxy.$router.push('/mall/shop');
    }
  });
}
</script>
<style lang="scss" scoped></style>
