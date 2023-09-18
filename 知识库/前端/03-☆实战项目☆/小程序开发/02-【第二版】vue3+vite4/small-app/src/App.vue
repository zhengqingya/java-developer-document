<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
const { proxy } = getCurrentInstance();

onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');

  // #ifndef MP-WEIXIN
  uni.hideTabBar(); // 隐藏原生tabBar
  // #endif

  // #ifdef MP-WEIXIN
  getUpdateManager();
  login();
  // #endif
});
onHide(() => {
  console.log('App Hide');
});

// 静默登录
function login() {
  let { login } = proxy.$store.user.useUserStore();
  login();
}

// 小程序更新 https://uniapp.dcloud.net.cn/api/other/update.html
function getUpdateManager() {
  const updateManager = uni.getUpdateManager();

  // 请求完新版本信息时回调 res: {hasUpdate: true}
  updateManager.onCheckForUpdate(function (res) {
    if (res.hasUpdate) {
      // 有更新
      // uni.showLoading({ title: '更新中...' });
    }
  });

  // 新版本下载完成时回调
  updateManager.onUpdateReady(function () {
    // uni.hideLoading(); // 关闭 Loading
    uni.showModal({
      // 弹确认框（强制更新）
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });

  // 新版本下载失败时回调
  updateManager.onUpdateFailed(function () {
    // uni.hideLoading(); // 关闭 Loading
    uni.showModal({
      title: '更新提示',
      content: '检查到有新版本，但由于网络原因等下载失败，请您删除当前小程序后重新搜索打开哟~',
      confirmText: '好的',
      showCancel: false,
    });
  });
}
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-plus/index.scss';

page {
  height: 100%;
  overflow: hidden; // 超出部分隐藏，也可用于禁止页面上下回弹
}
</style>
