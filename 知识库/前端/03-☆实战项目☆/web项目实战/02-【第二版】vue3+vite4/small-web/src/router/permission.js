import router from '@/router';
import store from '@/store';

// 进度条
import NProgress from 'nprogress'; // 导入 nprogress模块
import 'nprogress/nprogress.css'; // 导入样式
NProgress.configure({ showSpinner: true }); // 显示右上角螺旋加载提示

// 白名单路由
const whiteList = ['/login', '/test', '/test-layout'];
// 是否存在路由
let hasRouter = false;

/**
 * 全局前置守卫 https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
 * next();放行 -- 其它的路由跳转在没放行之前都会走 router.beforeEach()
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 开启进度条

  let useUserStore = store.user.useUserStore();
  const { getUserInfo, logout } = useUserStore;
  let { isLogin, routerList } = toRefs(useUserStore); // 响应式

  if (isLogin.value) {
    // 已经登录后的操作
    if (to.path === '/login') {
      if (to.fullPath.startsWith('/login?redirect=')) {
        let lastPath = to.fullPath.replace('/login?redirect=', '');
        next({ path: lastPath }); // 跳转到上次退出的页面
      } else {
        next({ path: '/' }); // 跳转到首页
      }
    } else {
      try {
        if (hasRouter) {
          next(); // 放行
        } else {
          // 请求接口数据，动态添加可访问路由表
          await getUserInfo();
          routerList.value.forEach((e) => router.addRoute(e)); // 路由添加进去之后不会及时更新，需要重新加载一次
          // console.log('全部路由数据：', router.getRoutes());
          hasRouter = true;
          next({ ...to, replace: true });
        }
      } catch (error) {
        console.log('刷新页面时获取权限异常：', error);
        // ElMessage.error('错误：' + error || 'Has Error');
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next(); // 放行 -- 可以访问白名单页面(eg: 登录页面)
    } else {
      next(`/login?redirect=${to.path}`); // 无权限 & 白名单页面未配置  =》 跳转到登录页面
    }
  }
});

// 全局后置钩子
router.afterEach(() => {
  NProgress.done(); // 完成进度条
});
