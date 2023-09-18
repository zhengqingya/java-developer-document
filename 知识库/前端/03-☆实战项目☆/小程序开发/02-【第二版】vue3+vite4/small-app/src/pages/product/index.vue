<template>
  <base-wrapper activeTabName="product" class="app">
    <view v-if="reSpuList.length > 0" class="h-full flex overflow-y-scroll">
      <scroll-view
        class="category bg-color-lightgrey text-color-grey p-r-10"
        scroll-with-animation
        scroll-y>
        <view
          class="item font-size-base flex-center-center"
          :class="{ active: item.id === currentCategoryId }"
          style="height: 90rpx"
          v-for="(item, index) in reSpuList"
          :key="index"
          @tap="hanleCategoryTap(item.id)">
          <view class="position-relative">
            <text class="text-overflow-1">{{ item.name }}</text>
            <!-- <up-badge
                            :value="getCategoryCartNum(item.id)"
                            max="99"
                            :offset="[-8, -20]"
                            :absolute="true" /> -->
          </view>
        </view>
      </scroll-view>

      <scroll-view
        class="spu flex-1 p-20"
        scroll-with-animation
        scroll-y
        :scroll-top="categoryScrollTop"
        @scroll="handleSpuScroll">
        <view id="ads"></view>
        <view>
          <view
            class="spu-box"
            :id="`cate-${item.id}`"
            v-for="(item, index) in reSpuList"
            :key="index">
            <view style="height: 30rpx" class="font-size-base font-bold flex-start-center">
              {{ item.name }}
            </view>
            <view>
              <view
                class="flex-center-center p-10"
                style="height: 160rpx"
                v-for="(spuItem, index) in item.spuList"
                :key="index"
                @tap="showSpuDetailModal(item, spuItem)">
                <image class="img-base" :src="spuItem.coverImg" />
                <view class="flex-1 flex-c-between-start h-full p-10">
                  <text class="font-size-lg text-overflow-1">{{ spuItem.name }}</text>

                  <text class="font-size-base text-color-grey">
                    库存：{{ spuItem.usableStockSum }}
                  </text>
                  <view class="w-full flex-between-center">
                    <text class="font-size-base font-bold">
                      ￥{{ spuItem.skuList[0].sellPrice / 100 }}
                    </text>
                    <view class="flex-between-center position-relative">
                      <u-icon name="plus" />
                      <!-- <up-badge :value="getSkuNum(spuItem)" max="99" :inverted="true" :offset="[-15, -10]" :absolute="true" /> -->
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view v-else class="h-full flex-center-center bg-color-white">
      <u-empty mode="data" text="商品为空" />
    </view>

    <!--  商品详情  -->
    <sku ref="skuRef" @close="handleCloseSkuChoose" />
    <!-- 购物车 -->
    <cart ref="cartRef" v-model="cartList" />
  </base-wrapper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
import cart from './component/cart.vue';
import sku from './component/sku.vue';

const orderType = ref('takein'); // 堂食：takein  外卖：takeout
let reSpuList = ref([]); // 分类关联的商品列表数据
let currentCategoryId = ref(0); // 当前分类id
let spu = ref({}); // 当前选择的商品
let cateScrollTopList = ref([]); // 左侧分类关联右边商品滑动的顶部位置
let categoryScrollTop = ref(0); // 竖向滚动条位置
let cartList = ref([]); // 购物车数据

onMounted(() => {
  init();
});

async function init() {
  reSpuList.value = await proxy.$api.category.reSpuList();
  if (reSpuList.value) {
    currentCategoryId.value = reSpuList.value[0].id;
  }
  showCart();

  setTimeout(() => {
    calcSize();
  }, 500);
}

// 购物车
async function showCart() {
  // 延时500毫秒，防止数据库未及时更新数据
  setTimeout(() => {
    if (proxy.$refs.cartRef) {
      proxy.$refs.cartRef.init();
    }
  }, 500);
}
// 点击左侧分类时，动态滑动右侧数据到关联分类位置
function hanleCategoryTap(id) {
  currentCategoryId.value = id;
  categoryScrollTop.value = reSpuList.value.find((item) => item.id == id).top;
}
// 右侧商品滚动时触发
function handleSpuScroll({ detail }) {
  const { scrollTop } = detail;

  if (cateScrollTopList.value.includes(categoryScrollTop.value)) {
    // 这里标识是从左侧分类点击触发的滚动
    categoryScrollTop.value = scrollTop;
    return;
  }

  let len = reSpuList.value.length;
  let endE = reSpuList.value[len - 1];
  let endTop = endE.top;
  for (let i = 0; i < len; i++) {
    let item = reSpuList.value[i];
    if (item.top <= scrollTop) {
      currentCategoryId.value = item.id;
    }
  }
}
function calcSize() {
  // 高度
  let h = 0;
  // 获取节点信息 https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#createselectorquery
  uni
    .createSelectorQuery()
    .select('#ads')
    .fields({ size: true }, (data) => {
      h += Math.floor(data.height);
    })
    .exec();
  reSpuList.value.forEach((item) => {
    let view = uni.createSelectorQuery().select(`#cate-${item.id}`);
    view
      .fields({ size: true }, (data) => {
        item.top = h;
        cateScrollTopList.value.push(h);
        h += data.height;
        item.bottom = h;
      })
      .exec();
  });
}
// 商品在购物车中的数量
function getSkuNum(spuItem) {
  return cartList.value
    .filter((e) => e.spuId === spuItem.id)
    .reduce((total, item) => (total += item.num), 0);
}
// 指定分类下所有商品在购物车中的数量
function getCategoryCartNum(categoryId) {
  let sum = 0;
  reSpuList.value.forEach((e) => {
    if (e.id === categoryId) {
      let spuIdList = e.spuList.map((item) => item.id);
      sum = cartList.value
        .filter((e) => spuIdList.includes(e.spuId))
        .reduce((total, item) => (total += item.num), 0);
      return;
    }
  });
  return sum;
}
// 选规格-商品详情
async function showSpuDetailModal(item, spu) {
  spu.value = await proxy.$api.spu.detail(spu.id);
  spu.value.num = 1;
  await proxy.$refs.skuRef.show(spu.value);
}
// 关闭sku选择时触发
function handleCloseSkuChoose() {
  showCart();
}
</script>

<style lang="scss" scoped>
.app {
  .category {
    width: 25%;
    .item {
      border-left: 10rpx solid transparent;
      &.active {
        border-left: 10rpx solid #3c9cff;
        background-color: #fff;
        color: #000;
        font-weight: bold;
      }
    }
  }

  .spu {
    .spu-box {
      &:nth-last-child(1) {
        margin-bottom: 100rpx;
      }
    }
  }
}
</style>
