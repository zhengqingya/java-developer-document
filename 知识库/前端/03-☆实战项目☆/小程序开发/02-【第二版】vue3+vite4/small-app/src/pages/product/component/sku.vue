<template>
  <u-popup :show="isShow" mode="bottom" @close="handleClose" :round="10" :closeable="true">
    <view class="flex-column overflow-y-scroll">
      <view class="top flex p-10 h-200">
        <image :src="spu.coverImg" class="img-base m-l-10"></image>
        <view class="spu-info m-l-30">
          <view class="font-size-lg font-bold">{{ spu.name }}</view>
          <view class="m-t-10 font-bold text-color-red">
            <view v-if="chooseSkuData">￥{{ chooseSkuData.sellPrice / 100 }}</view>
            <view v-else>
              <view v-if="(spu.minPrice = spu.maxPrice)">￥{{ spu.minPrice / 100 }}</view>
              <view v-else>￥{{ spu.minPrice / 100 }} - {{ spu.maxPrice / 100 }}</view>
            </view>
          </view>
          <view class="m-t-10 font-size-base">
            库存：{{ chooseSkuData ? chooseSkuData.usableStock : spu.usableStock }}
          </view>
        </view>
      </view>
      <scroll-view class="detail" scroll-y="true">
        <view class="attr flex-column p-20" v-if="spu.attrList">
          <view class="flex-column" v-for="(item, index) in spu.attrList" :key="index">
            <view class="title flex-start-center m-b-20">
              <text class="m-r-20">{{ item.attrKeyName }}</text>
              <!-- <view class="desc" v-if="item.attrKeyName">({{ item.attrKeyName }})</view> -->
            </view>
            <view class="flex-wrap w100">
              <view
                class="border-radius-10 font-size-sm text-color-grey bg-color-lightgrey m-b-10 m-r-10 p-x-30 p-y-10"
                :class="{ choose: value.isChoose }"
                v-for="(value, key) in item.attrValueList"
                :key="key"
                @tap="chooseSku(index, key)">
                {{ value.attrValueName }}
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <view class="flex-between-center bg-color-lightgrey h-100 p-x-20">
        <view class="left flex-column-center-start flex-1">
          <!-- <view class="font-size-base" v-if="chooseSkuData">
                        ￥{{ chooseSkuData.sellPrice / 100 }}
                    </view> -->
          <view class="text-color-grey font-size-sm text-overflow-1">
            {{ calSkuSpecDesc() }}
          </view>
        </view>
        <view class="right">
          <u-number-box
            v-model="spu.num"
            :min="1"
            :max="100"
            :step="1"
            integer
            :disabledInput="true" />
        </view>
      </view>
      <up-button @click="addCart" type="primary" text="加入购物车" />
    </view>
  </u-popup>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let isShow = ref(false); // 商品选规格时的详情框是否显示
let spu = ref({}); // 商品数据
let chooseSkuData = ref(null); // 选择的sku
let skuMap = ref(null); // "X,蓝色" => sku

// 暴露方法
defineExpose({
  show,
});

async function show(spuData) {
  spu.value = spuData;
  isShow.value = true;
  chooseSkuData.value = null;

  function getGroupArrayObj(list, attr) {
    const map = new Map();
    list.forEach((item, index, arr) => {
      if (!map.has(item[attr])) {
        map.set(
          item[attr],
          arr.filter((a) => a[attr] == item[attr])
        );
      }
    });
    const unique = (arrs) => {
      const res = new Map();
      return arrs.filter((arr) => !res.has(arr.attrValueName) && res.set(arr.attrValueName, 1));
    };
    return Array.from(map).map((item) => {
      let attrValueList = unique(item[1]);
      return {
        attrKeyId: attrValueList[0].attrKeyId,
        attrKeyName: item[0],
        attrValueList: attrValueList,
      };
    });
  }
  // 计算sku中包含的属性值
  let specList = [];
  spu.value.skuList.forEach((skuItem) => {
    skuItem.specList.forEach((specItem) => {
      specList.push(specItem);
    });
  });
  spu.value.attrList = getGroupArrayObj(specList, 'attrKeyName');
  initSkuMap();
}
// 规格信息对应sku  "X,蓝色" => sku
function initSkuMap() {
  const map = new Map();
  spu.value.skuList.forEach((skuItem) => {
    map.set(skuItem.specList.map((obj) => obj.attrValueName).join(','), skuItem);
  });
  skuMap.value = map;
}
function calSkuSpecDesc() {
  let attrDescList = [];
  if (spu.value.attrList) {
    spu.value.attrList.forEach((attr) => {
      attr.attrValueList.forEach((value) => {
        if (value.isChoose) {
          attrDescList.push(value.attrValueName);
        }
      });
    });
  }
  return attrDescList.join(',');
}
// 选sku
function chooseSku(index, key) {
  if (spu.value.attrList[index].attrValueList[key].isChoose === 1) {
    spu.value.attrList[index].attrValueList[key].isChoose = 0;
    chooseSkuData.value = null;
    return;
  }
  spu.value.attrList[index].attrValueList.forEach((value) => proxy.$set(value, 'isChoose', 0));
  spu.value.attrList[index].attrValueList[key].isChoose = 1;
  let attrDesc = calSkuSpecDesc();
  // 确认所需 sku-id
  chooseSkuData.value = skuMap.value.get(attrDesc);
}
// 加入购物车
function addCart() {
  if (chooseSkuData.value == null) {
    proxy.submitFail('请选择sku！');
    return;
  }
  // 请求后端开始加入购物车数据
  proxy.$api.cart.add({
    spuId: spu.value.id,
    skuId: chooseSkuData.value.id,
    num: spu.value.num,
  });
  handleClose();
}
function handleClose() {
  proxy.$emit('close', false);
  isShow.value = false;
}
</script>

<style lang="scss" scoped>
.detail {
  min-height: 1vh;
  max-height: calc(90vh - 500rpx);

  .attr {
    border-top: 2rpx solid #f5f5f5;

    .choose {
      background-color: $color-primary;
      color: white;
    }
  }
}
</style>
