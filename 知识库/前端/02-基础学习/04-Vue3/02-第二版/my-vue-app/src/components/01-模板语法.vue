<template>
  <h3>{{ text }}</h3>
  <h3>{{ user }}</h3>

  <!--  
  指令 v-
        v-model   数据双向绑定
        v-if      判断表达式的值,true则显示,false则隐藏 -- 控制dom元素的创建和销毁，应避免频繁切换状态
        v-show    和v-if区别 --  始终会被渲染并保留在dom中，只是css被隐藏了 "display: none;"  一次性的
        v-for     循环
        v-bind    绑定属性或对象
        v-on      注册事件
  -->
  <input v-model="user.age" />

  <span v-if="user.age == 18">成年人：{{ user.age }}</span>
  <span v-else-if="user.age < 18">未成年</span>
  <span v-else>长大了...</span>
  <span v-show="user.age >= 18">
    和v-if区别：始终会被渲染并保留在dom中，只是css被隐藏了 "display: none;"
  </span>

  <!-- <button v-bind:disabled="true">v-bind</button> -->
  <button :disabled="true">v-bind</button>

  <h6
    v-for="(value, key, index) in user.friends"
    :key="index"
    style="color: rgb(70, 238, 146)"
  >
    {{ value }} - {{ key }} - {{ index }}
  </h6>

  <!-- <button v-on:click="addFriend">添加好友</button> -->
  <button @click="addFriend">添加好友</button>

  <p :class="{ active: isActive }">Class 与 Style 绑定</p>
</template>

<script setup>
import { ref, reactive } from "vue";

const text = ref("HelloWorld");
const isActive = ref(true);

const user = reactive({
  name: "小郑",
  age: 18,
  friends: [
    {
      name: "小张",
      age: 18,
    },
    {
      name: "小李",
      age: 20,
    },
  ],
});

function addFriend() {
  user.friends.push({
    name: "哈基米",
    age: 18,
  });
}
</script>

<style scoped>
.active {
  color: rgb(134, 17, 250);
}
</style>
