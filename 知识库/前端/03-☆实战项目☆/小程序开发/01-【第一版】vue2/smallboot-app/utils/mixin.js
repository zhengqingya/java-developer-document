// 抽取公用的实例 - 操作成功与失败消息提醒内容等
export default {
	methods: {
		// 操作成功消息提醒内容
		submitOk(msg, cb) {
			uni.showToast({
				duration: 1000,
				title: msg
			});
		},
		// 操作失败消息提醒内容
		submitFail(msg) {
			uni.showToast({
				icon: 'none',
				duration: 1000,
				title: msg
			});
		},
		// 加载框
		submitLoading(msg) {
			uni.showLoading({
				title: msg
			});
			setTimeout(function() {
				uni.hideLoading();
			}, 1000);
		}
	},
}