# 引入uview-plus3.0

### 一、导入插件

https://ext.dcloud.net.cn/plugin?name=uview-plus

### 二、配置

> 可参考 https://uiadmin.net/uview-plus/components/downloadSetting.html

#### 1、main.js

```
import uviewPlus from '@/uni_modules/uview-plus'

app.use(uviewPlus)
```

#### 2、uni.scss

```
@import '@/uni_modules/uview-plus/theme.scss';
```

#### 3、App.vue

```
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-plus/index.scss";
</style>
```
