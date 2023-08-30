# uni.showToast 被其他组件遮挡

App.vue

```
<style lang="scss">
	uni-toast {
		// 解决被popup组件遮盖问题
		z-index: 999999999 !important;
	}
</style>
```

解决后使用

```
uni.showToast({
    icon: 'none',
    duration: 1000,
    title: '请选择sku！'
});
```