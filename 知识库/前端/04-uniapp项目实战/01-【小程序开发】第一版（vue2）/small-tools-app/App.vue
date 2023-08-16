<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-plus/index.scss";

	/*每个页面公共css */
	page,
	#app {
		/* background-color: #aaffff; */
		height: 100%;
		/* border: 2px solid red; */
	}

	.app-container {
		width: 100%;
		height: 100%;
	}

	button {
		&[type='primary'] {
			background-color: $color-primary !important;
		}
	}

	uni-toast {
		// 解决被popup组件遮盖问题
		z-index: 999999999 !important;
	}
</style>
