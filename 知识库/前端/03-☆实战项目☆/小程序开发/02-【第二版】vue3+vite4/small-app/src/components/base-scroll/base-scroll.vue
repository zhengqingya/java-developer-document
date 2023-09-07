<template>
  <scroll-view
    class="h100"
    scroll-y
    enable-back-to-top
    @scrolltolower="onPushRefresh"
    :refresher-enabled="true"
    :refresher-triggered="isReFresh"
    @refresherrefresh="onPullRefresh">
    <view v-if="dataList.length > 0">
      <slot :list="dataList" />
      <u-loadmore
        v-if="dataList.length > loadmoreNum"
        :line="true"
        :status="loadmoreStatus"></u-loadmore>
    </view>
    <view v-else class="h100 content-center bg-color-white">
      <slot name="empty" />
    </view>
  </scroll-view>
</template>
<script setup>
const { proxy } = getCurrentInstance();
import { onShow } from '@dcloudio/uni-app';

const props = defineProps({
  params: { type: Object, default: () => {} },
  api: { type: String, default: '' },
  loadmoreNum: { type: Number, default: 5 },
});

let pageParams = ref({ pageNum: 1, pageSize: 10 });
let current = ref(0);
let total = ref(1);
let isReFresh = ref(true);
let dataList = ref([]);
let loadmoreStatus = ref('loadmore');

// 页面显示就触发
onShow(() => {
  getApiData(true);
});

// 上拉加载更多 -- 滑到底部触发
function onPushRefresh() {
  loadmoreStatus.value = 'loading';
  pageParams.value.pageNum++;
  setTimeout(async () => {
    await getApiData();
  }, 200);
}

// 下拉刷新
function onPullRefresh() {
  isReFresh.value = true;
  getApiData(true);
  setTimeout(() => {
    isReFresh.value = false;
  }, 100);
}

// 分页查询订单数据
async function getApiData(isFirst) {
  if (isFirst) {
    pageParams.value.pageNum = 1;
  }
  if (!isFirst && dataList.value.length >= total.value) {
    loadmoreStatus.value = 'nomore';
    return;
  } else {
    loadmoreStatus.value = 'loadmore';
  }

  // 请求处理数据
  let result = await apiMethod(props.params, pageParams.value);
  total.value = result.total;
  pageParams.value.pageNum = result.current;
  dataList.value = isFirst ? result.records : [...dataList.value, ...result.records];

  // 最终显示状态
  if (dataList.value.length >= total.value) {
    loadmoreStatus.value = 'nomore';
  }
}

function apiMethod(params, headers) {
  // eg: proxy.$api.order.page(xx);
  return props.api.split('.').reduce((acc, item) => acc[item], proxy.$api)(params, headers);
}
</script>
<style lang="scss" scoped></style>
