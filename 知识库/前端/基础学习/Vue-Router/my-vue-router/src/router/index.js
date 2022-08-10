import { createRouter, createWebHashHistory } from "vue-router";

// 1. 定义路由组件.
// 也可以从其他文件导入
// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }

import About from "../views/About.vue";
import User from "../views/User.vue";
import NotFound from "../views/404.vue";
import Parent from "../views/Parent.vue";
import ParentOne from "../views/ParentOne.vue";
import ParentTwo from "../views/ParentTwo.vue";
import Page from "../views/Page.vue";
import Order from "../views/Order.vue";
import Top from "../views/Top.vue";
import Footer from "../views/Footer.vue";
import Login from "../views/Login.vue";

// import Home from "../views/Home.vue";
// 路由懒加载，用到时再加载
const Home = () => import("../views/Home.vue");

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: "/",
    // 重定向`/`至`home`
    // redirect: "/home"
    // 命名路由
    // redirect: {
    //   name: "home",
    // },
    // 方法
    redirect: (to) => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      console.log(to);
      return { path: "/home" };
    },
  },
  { path: "/home/:id*", name: "home", component: Home },

  { path: "/about", component: About },
  { path: "/user/:id*", name: "user", props: true, component: User },
  {
    path: "/parent",
    component: Parent,
    children: [
      { path: "parentOne", component: ParentOne },
      { path: "parentTwo", component: ParentTwo },
    ],
  },
  {
    path: "/page",
    // 访问`/hhh`或`hh` 和 访问`/page` 一样
    // alias: "/hhh",
    alias: ["/hhh", "/hh"],
    component: Page,
  },
  // 命名视图
  {
    path: "/order/:id*",
    components: {
      default: Order,
      // Top: Top 的缩写
      Top,
      // 它们与 `<router-view>` 上的 `name` 属性匹配
      Footer: Footer,
    },
    props: {
      // true:标识能拿到参数，false:不能
      default: true,
      Top: true,
      Footer: false,
    },
  },
  {
    path: "/login",
    component: Login,
    // 具体路由守卫
    beforeEnter: (to, from, next) => {
      console.log("*** to", to);
      console.log("*** from", from);
      if (true) {
        next();
      }
    },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

// 全局守卫
router.beforeEach((to, from, next) => {
  console.log("to", to);
  console.log("from", from);
  // ...
  // 返回 false 以取消导航
  // return false;

  // 通行
  next();
});

export default router;

// 5. 创建并挂载根实例
// const app = Vue.createApp({})
// //确保 _use_ 路由实例使
// //整个应用支持路由。
// app.use(router)

// app.mount('#app')

// 现在，应用已经启动了！
