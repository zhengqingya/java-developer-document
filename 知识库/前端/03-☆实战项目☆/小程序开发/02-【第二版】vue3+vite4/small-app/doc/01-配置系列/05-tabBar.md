# tarBar

### 原生tabBar

[pages.json](../../src/pages.json)

```
{
    "pages": [
        //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
        {
            "path": "pages/index/index",
            "style": {
                "navigationBarTitleText": "首页"
            }
        },
        {
            "path": "pages/product/index",
            "style": {
                "navigationBarTitleText": "点餐",
                "enablePullDownRefresh": false
            }
        },
        {
            "path": "pages/order/index",
            "style": {
                "navigationBarTitleText": "订单列表",
                "enablePullDownRefresh": false
            }
        },
        {
            "path": "pages/mine/index",
            "style": {
                "navigationBarTitleText": "个人中心",
                "enablePullDownRefresh": false
            }
        }
    ],
    "globalStyle": {
        "navigationBarTextStyle": "black",
        "navigationBarTitleText": "uni-app",
        "navigationBarBackgroundColor": "#00aaff",
        "backgroundColor": "#F8F8F8"
    },
    "tabBar": {
        "color": "#7A7E83",
        "selectedColor": "#00aaff",
        "borderStyle": "black",
        "backgroundColor": "#ffffff",
        "list": [
            {
                "pagePath": "pages/index/index",
                "text": "首页",
                "iconPath": "static/images/tabBar/index.png",
                "selectedIconPath": "static/images/tabBar/index_selected.png"
            },
            {
                "pagePath": "pages/product/index",
                "text": "点餐",
                "iconPath": "static/images/tabBar/product.png",
                "selectedIconPath": "static/images/tabBar/product_selected.png"
            },
            {
                "pagePath": "pages/order/index",
                "text": "订单",
                "iconPath": "static/images/tabBar/order.png",
                "selectedIconPath": "static/images/tabBar/order_selected.png"
            },
            {
                "pagePath": "pages/mine/index",
                "text": "我的",
                "iconPath": "static/images/tabBar/mine.png",
                "selectedIconPath": "static/images/tabBar/mine_selected.png"
            }
        ]
    }
}
```

### 自定义tabBar

eg: 根据不同的角色展示不同的底部tabBar

https://uniapp.dcloud.net.cn/collocation/pages.html#custom-tab-bar

#### 方式一：H5端的自定义tabBar组件

https://uniapp.dcloud.net.cn/component/custom-tab-bar.html#

```
<custom-tab-bar :show-icon="false" :selected="0" />
```

#### 方式二：普通自定义tabBar

##### 1、[App.vue](../../src/App.vue) 中隐藏原生tabBar

```
<script setup>
    onShow(() => {
        // #ifndef MP-WEIXIN
        uni.hideTabBar(); // 隐藏原生tabBar
        // #endif
    });
</script>
```

##### 2、[pages.json](../../src/pages.json) 开启自定义底部菜单

```
"tabBar": {
    "custom": true, // 自定义底部菜单
}
```

##### 3、[g-tab-bar.vue](../../src/components/g-tab-bar/g-tab-bar.vue) 全局组件中自定义tabBar内容

```
<template>
  <u-tabbar
    :value="activeTabName"
    :fixed="false"
    @change="changeTab"
    activeColor="#00aaff"
    inactiveColor="#7A7E83"
    :z-index="10">
    <u-tabbar-item
      v-for="(item, index) in tabbarList"
      :key="item.name"
      :text="item.text"
      :name="item.name"
      :icon="item.icon" />
  </u-tabbar>
</template>
<script setup>
const { proxy } = getCurrentInstance();
const props = defineProps({
  activeTabName: { type: String, required: true, default: 'index' },
});
let tabbarList = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    icon: 'home',
    name: 'index',
  },
  {
    pagePath: '/pages/product/index',
    text: '点餐',
    icon: 'shopping-cart',
    name: 'product',
  },
  {
    pagePath: '/pages/order/index',
    text: '订单',
    icon: 'order',
    name: 'order',
  },
  {
    pagePath: '/pages/mine/index',
    text: '我的',
    icon: 'account',
    name: 'mine',
  },
];
function changeTab(name) {
  if (props.activeTabName === name) {
    return;
  }
  uni.switchTab({
    url: tabbarList.filter((e) => e.name === name)[0].pagePath,
  });
}
</script>
<style lang="scss" scoped></style>
```

##### 4、在页面中引入使用

> tips: 其它内容高度需100%填满，tabBar才会在底部展示，因为自定义的tabBar中配置了`:fixed="false"`

```
<g-tab-bar activeTabName="index" />
```