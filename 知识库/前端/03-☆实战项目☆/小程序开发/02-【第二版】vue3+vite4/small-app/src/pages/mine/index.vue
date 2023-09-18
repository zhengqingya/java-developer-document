<template>
  <base-wrapper activeTabName="mine">
    <view v-if="isLogin" class="h-full">
      <view class="flex-center-center bg-color-white p-30">
        <view>
          <image :src="userObj.avatarUrl" class="img-lg" />
        </view>

        <view class="flex-1 m-l-10">
          <view class="font-size-lg p-b-10">{{ userObj.nickname }}</view>
          <view class="color-grey font-size-sm text-overflow-1">
            {{ userObj.createTime }}
          </view>
        </view>
        <navigator :url="'/subPackages/mine/user'" hover-class="none">
          <view class="m-l-10 p-10">
            <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
          </view>
        </navigator>
      </view>

      <u-cell-group>
        <u-cell icon="star" title="收藏" isLink @click="tips"></u-cell>
        <u-cell icon="coupon" title="优惠券" isLink @click="tips"></u-cell>
        <u-cell icon="car" title="地址管理" isLink @click="tips"></u-cell>
      </u-cell-group>

      <!-- <u-cell-group>
        <u-cell icon="setting" title="设置" isLink></u-cell>
      </u-cell-group> -->

      <view class="m-t-20">
        <up-button type="error" @tap="logout">退出登录</up-button>
      </view>
    </view>
    <view v-else class="bg-color-white h-full w-full flex-c-center-center">
      <up-button type="primary" withCredentials="true" @tap="login">授权登录</up-button>
      <up-button type="error" @tap="localLogin">本地临时登录</up-button>
    </view>
  </base-wrapper>
</template>

<script setup>
const { proxy } = getCurrentInstance();

let { isLogin, isTest, userObj } = toRefs(proxy.$store.user.useUserStore());

async function login() {
  await proxy.$store.user.useUserStore().login();
}

async function localLogin() {
  await proxy.$store.user.useUserStore().localLogin();
}

function logout() {
  proxy.$store.user.useUserStore().logout();
}

function tips() {
  proxy.submitFail('暂未开发...');
}
</script>

<style lang="scss" scoped>
page {
  background-color: #ededed;
}

.user-box {
  background-color: #fff;
}
.u-cell-group {
  margin-top: 20rpx;
  background-color: #fff;
}
</style>
