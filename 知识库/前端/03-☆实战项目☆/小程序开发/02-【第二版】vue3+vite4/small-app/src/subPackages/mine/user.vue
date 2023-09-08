<template>
    <view class="h-full m-30 bg-color-white">
        <view class="flex-center-center h-400">
            <button open-type="chooseAvatar" @chooseavatar="chooseavatar">
                <image :src="userObj.avatarUrl" class="img-base" />
            </button>
        </view>

        <view class="">
            <view class="item">
                <text class="title">昵称:</text>
                <input
                    class="value"
                    :value="userObj.nickname"
                    maxlength="10"
                    @blur="changeNickname"
                    placeholder="请输入昵称" />
            </view>
            <view class="item">
                <text class="title">生日:</text>
                <picker
                    class="value"
                    mode="date"
                    :value="userObj.birthday"
                    @change="changeBirthday">
                    <view class="value">{{ userObj.birthday }}</view>
                </picker>
            </view>
            <view class="item">
                <text class="title">性别:</text>
                <picker
                    class="value"
                    mode="selector"
                    :range="sexList"
                    range-key="name"
                    :value="userObj.sex"
                    @change="changeSex">
                    <view class="value">{{ $filters.sexName(userObj.sex) }}</view>
                </picker>
            </view>
            <view class="item">
                <text class="title">签名:</text>
                <input
                    class="value"
                    value="If i were you."
                    maxlength="20"
                    placeholder="请输入签名" />
            </view>
            <!-- <view class="item">
                <text class="title">手机:</text>
                <button
                    class="value"
                    type="default"
                    plain
                    open-type="getPhoneNumber"
                    @getphonenumber="getPhoneNumber">
                    {{ userObj.phone }}
                </button>
            </view> -->
        </view>

        <view class="flex-center-center m-t-30 font-bold bg-color-warning p-20 m-x-30" @click="submit">
            保存
        </view>
    </view>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let { userObj } = toRefs(proxy.$store.user.useUserStore());

async function chooseavatar({ detail }) {
    // console.log(detail.avatarUrl);
    // 将临时访问地址 转存 服务器
    let data = await proxy.$api.common.upload(detail.avatarUrl);
    userObj.value.avatarUrl = data.url;
}

function changeNickname({ detail }) {
    userObj.value.nickname = detail.value;
}
function changeBirthday({ detail }) {
    userObj.value.birthday = detail.value;
}

function changeSex({ detail }) {
    userObj.value.sex = detail.value;
}

function getPhoneNumber(res) {
    console.log(res);
    // userObj.value.phone = res;
}

async function submit() {
    await proxy.$api.user.updateUserInfo(userObj.value);
    proxy.submitOk('保存成功');
}
</script>

<style lang="scss" scoped>
page {
    background-color: #deece7;
}
button {
    background-color: #fff;
    &::after {
        border: none;
        border-radius: 0;
    }
}

.item {
    display: flex;
    justify-content: center;
    align-items: center;

    border-top: 1rpx solid #e3e3e3;
    &:last-child {
        border-bottom: 1rpx solid #e3e3e3;
    }
    padding: 30rpx 20rpx;

    .title {
        color: grey;
        flex: 1;
    }

    .value {
        // color: grey;
        flex: 4;
    }
}
</style>
