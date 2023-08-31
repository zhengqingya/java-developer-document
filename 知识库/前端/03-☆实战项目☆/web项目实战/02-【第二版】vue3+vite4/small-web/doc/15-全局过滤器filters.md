# 全局过滤器

当后端返回的数据格式不是前端想要的时候，可以将返回的数据处理成自己需要的格式

eg: 时间过滤器

### vue2

```
import { filters } from '@/utils/filters.js';

Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));
```

### vue3

通过 `app.config.globalProperties` 来注册一个全局都能访问到的属性

[`filters.js`](../src/utils/filters.js)

```
export const filters = {
  // 获取性别值
  sexName: (sex) => {
    // 拿到mixin混入的属性值
    const { proxy } = getCurrentInstance();
    let result = proxy.sexList.find((obj) => obj.value == sex);
    return result ? result.name : '数据丢失';
  },
};
```

[mian.js](../src/main.js)

```
// 全局过滤器
import { filters } from '@/utils/filters.js';
app.config.globalProperties.$filters = filters;
```

使用

```
<h1>{{ $filters.sexName(1) }}</h1>
```
