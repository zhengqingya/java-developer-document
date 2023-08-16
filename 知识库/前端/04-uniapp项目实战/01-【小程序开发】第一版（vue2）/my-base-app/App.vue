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
	/*每个页面公共css */
	page,
	#app {
		background-color: #fff;
		height: 100%;
		// border: 2px solid red;
	}

	.app-container {
		width: 100%;
		height: 100%;
	}
</style>
