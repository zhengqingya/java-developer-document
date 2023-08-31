# mixin混入

全局混入是一种在多个组件中共享相同逻辑的方式，可以将一些通用的方法、生命周期钩子等混入到所有页面和组件中，以简化代码的编写和维护。

> 等于抽取公共属性、方法...

### 一、[`mixin.js`](../src/utils/mixin.js)

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
    submitOk(msg, cb) {
      this.$notify({
        title: '成功',
        message: msg || '操作成功！',
        type: 'success',
        duration: 2000,
        onClose: function () {
          cb && cb();
        },
      });
    },
    // 操作失败消息提醒内容
    submitFail(msg) {
      this.$message({
        message: msg || '网络异常，请稍后重试！',
        type: 'error',
      });
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

[src/main.js](../src/main.js)

```
// 混入 -- 抽取公用的实例（操作成功与失败消息提醒内容等）
import mixin from '@/utils/mixin';
app.mixin(mixin);
```

使用

```
<template>
  <h1>{{ sexList }}</h1>
  <button @click="handleClick">click</button>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

async function handleClick() {
  proxy.submitOk('保存成功');
  proxy.submitFail('操作失败');
}
</script>
```