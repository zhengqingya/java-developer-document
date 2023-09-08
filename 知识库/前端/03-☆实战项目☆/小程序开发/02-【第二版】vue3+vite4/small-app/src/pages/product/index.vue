<template>
  <base-wraper activeTabName="product" class="app">
    <view v-if="reSpuList.length > 0" class="h100 flex overflow-y-scroll">
      <scroll-view
        class="category bg-color-lightgrey text-color-grey p-r-10"
        scroll-with-animation
        scroll-y>
        <view
          class="item h-90 font-size-base flex-center-center"
          :class="{ active: item.id === currentCategoryId }"
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
        <view class="p-b-10">
          <view
            class="spu-box"
            :id="`cate-${item.id}`"
            v-for="(item, index) in reSpuList"
            :key="index">
            <view class="text-color-black font-size-base font-bold">
              <text>{{ item.name }}</text>
            </view>
            <view>
              <view
                class="h-160 flex-center-center m-t-10"
                v-for="(spuItem, index) in item.spuList"
                :key="index"
                @tap="showSpuDetailModal(item, spuItem)">
                <image class="img-base" :src="spuItem.coverImg" />
                <view class="flex-1 flex-c-between-start h100 p-10">
                  <text class="font-size-lg text-overflow-1">{{ spuItem.name }}</text>

                  <text class="font-size-base text-color-grey">
                    库存：{{ spuItem.usableStockSum }}
                  </text>
                  <view class="w100 flex-between-center">
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

    <view v-else class="h100 content-center bg-color-white">
      <u-empty mode="data" text="商品为空" />
    </view>

    <!--  商品详情  -->
    <sku ref="skuRef" @close="handleCloseSkuChoose" />
    <!-- 购物车 -->
    <cart ref="cartRef" v-model="cartList" />
  </base-wraper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
import cart from './component/cart.vue';
import sku from './component/sku.vue';

const orderType = ref('takein'); // 堂食：takein  外卖：takeout
let reSpuList = ref([]); // 分类关联的商品列表数据
let currentCategoryId = ref(0); // 当前分类id
let spu = ref({}); // 当前选择的商品
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
}

// 购物车
async function showCart() {
  // 延时500毫秒，防止数据库未及时更新数据
  setTimeout(() => {
    proxy.$refs.cartRef.init();
  }, 500);
}
// 点击左侧分类时，动态滑动右侧数据到关联分类位置
function hanleCategoryTap(id) {
  calcSize();
  currentCategoryId.value = id;
  proxy.$nextTick(() => (categoryScrollTop = reSpuList.value.find((item) => item.id == id).top));
}
// 右侧商品滚动时触发
function handleSpuScroll({ detail }) {
  calcSize();
  const { scrollTop } = detail;
  let tabs = reSpuList.filter((item) => item.top <= scrollTop).reverse();
  if (tabs.length > 0) {
    currentCategoryId.value = tabs[0].id;
  }
}
function calcSize() {
  // 高度
  let h = 0;

  let view = uni.createSelectorQuery().select('#ads');
  view
    .fields(
      {
        size: true,
      },
      (data) => {
        h += Math.floor(data.height);
      }
    )
    .exec();

  reSpuList.value.forEach((item) => {
    let view = uni.createSelectorQuery().select(`#cate-${item.id}`);
    view
      .fields(
        {
          size: true,
        },
        (data) => {
          item.top = h;
          h += data.height;
          item.bottom = h;
        }
      )
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
