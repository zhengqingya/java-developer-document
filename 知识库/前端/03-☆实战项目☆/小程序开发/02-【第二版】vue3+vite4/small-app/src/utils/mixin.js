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
        submitOk(msg) {
            uni.showToast({
                title: msg || '操作成功！',
            });
        },
        // 操作失败消息提醒内容
        submitFail(msg) {
            uni.showToast({
                icon: 'none',
                duration: 3000,
                title: msg || '网络异常，请稍后重试！',
            });
        },
        // 加载框
        submitLoading(msg) {
            uni.showLoading({
                title: msg || '加载中',
            });
            setTimeout(function () {
                uni.hideLoading();
            }, 1000);
        },
    },
};
