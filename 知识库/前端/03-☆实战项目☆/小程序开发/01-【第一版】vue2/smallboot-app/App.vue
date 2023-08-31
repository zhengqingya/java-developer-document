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
	@import "./uni_modules/vk-uview-ui/index.scss";
	/*每个页面公共css */
	@import '@/common.scss';


	page,
	#app {
		background-color: #fff;
		height: 100%;
		// border: 2px solid red;
	}
</style>