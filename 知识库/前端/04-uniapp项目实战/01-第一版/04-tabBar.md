pages.json

```
{
	"pages": [
		//pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app"
			}
		}, {
			"path": "pages/product/product",
			"style": {
				"navigationBarTitleText": "",
				"enablePullDownRefresh": false
			}

		}, {
			"path": "pages/cart/cart",
			"style": {
				"navigationBarTitleText": "",
				"enablePullDownRefresh": false
			}

		}, {
			"path": "pages/mine/mine",
			"style": {
				"navigationBarTitleText": "",
				"enablePullDownRefresh": false
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8",
		"app-plus": {
			"background": "#efeff4"
		}
	},
	"tabBar": {
		"color": "#919293",
		"selectedColor": "#97AF13",
		"backgroundColor": "#fff",
		"borderStyle": "black",
		"list": [{
			"pagePath": "pages/index/index",
			"text": "首页",
			"iconPath": "static/images/tabBar/index.png",
			"selectedIconPath": "static/images/tabBar/index_selected.png"
		}, {
			"pagePath": "pages/product/product",
			"text": "商品",
			"iconPath": "static/images/tabBar/product.png",
			"selectedIconPath": "static/images/tabBar/product_selected.png"
		}, {
			"pagePath": "pages/cart/cart",
			"text": "购物车",
			"iconPath": "static/images/tabBar/cart.png",
			"selectedIconPath": "static/images/tabBar/cart_selected.png"
		}, {
			"pagePath": "pages/mine/mine",
			"text": "我的",
			"iconPath": "static/images/tabBar/mine.png",
			"selectedIconPath": "static/images/tabBar/mine_selected.png"
		}]
	}
}
```