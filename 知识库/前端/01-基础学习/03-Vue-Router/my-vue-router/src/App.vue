<script setup></script>

<template>
  <div>
    <h1>Hello App!</h1>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <ol>
      <li><router-link to="/">Go to Home</router-link></li>
      <li><router-link to="/about">Go to About</router-link></li>
      <li><router-link to="/user/123">Go to User</router-link></li>
      <li>
        <router-link :to="{ name: 'user', params: { name: 'zq' } }">
          Go User
        </router-link>
      </li>
      <li><router-link to="/parent">Go to Parent</router-link></li>
      <li><router-link to="/page">Go to Page</router-link></li>
      <li><router-link to="/order">Go to Order</router-link></li>
      <li><router-link to="/login">Go to Login</router-link></li>
    </ol>
    <hr />
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

    <router-view name="Top"></router-view>
    <h2>******************</h2>
    <router-view name="Footer"></router-view>
  </div>
</template>

<style></style>
