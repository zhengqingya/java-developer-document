# mixin混入

在UniApp中，可以使用 app.mixin 配置来定义全局混入（mixin）。
全局混入是一种在多个组件中共享相同逻辑的方式，可以将一些通用的方法、生命周期钩子等混入到所有页面和组件中，以简化代码的编写和维护。

> 等于抽取公共属性、方法...

### 一、[`mixin.js`](../../src/utils/mixin.js)

```
// 抽取公用的实例 - 操作成功与失败消息提醒内容等
export default {
    data() {
        return {
            sexList: [
                { name: '不想说', value: 0 },
                { name: '男', value: 1 },
                { name: '女', value: 2 },
            ],
        };
    },
    methods: {
        // 操作成功消息提醒内容
        submitOk(msg) {
            uni.showToast({
                title: msg || '操作成功！',
            });
        },
        // 操作失败消息提醒内容
        submitFail(msg) {
            uni.showToast({
                icon: 'none',
                duration: 3000,
                title: msg || '网络异常，请稍后重试！',
            });
        },
        // 加载框
        submitLoading(msg) {
            uni.showLoading({
                title: msg || '加载中',
            });
            setTimeout(function () {
                uni.hideLoading();
            }, 1000);
        },
    },
};
```

### 二、混入

#### 局部混入

```
<script>
import mixin from '@/utils/mixin.js';
export default {
    mixins: [mixin],
};
</script>


<script setup>
const { proxy } = getCurrentInstance();

async function submit() { 
    proxy.submitOk('保存成功');
}
</script>
```

#### 全局混入

[mian.js](../../src/main.js)

```
import { createSSRApp } from 'vue';
import App from './App.vue';

// 抽取公用的实例 - 操作成功与失败消息提醒内容等
import mixin from '@/utils/mixin.js';

export function createApp() {
    const app = createSSRApp(App);

    app.mixin(mixin);

    return { app };
}
```

使用

```
<template>
    <view>{{ sexList }}</view>
</template>

<script setup>
const { proxy } = getCurrentInstance();

async function submit() { 
    proxy.submitOk('保存成功');
}
</script>
```