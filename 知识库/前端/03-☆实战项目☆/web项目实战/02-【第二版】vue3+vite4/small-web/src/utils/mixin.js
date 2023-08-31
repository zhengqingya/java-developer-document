// 抽取公用的实例 - 操作成功与失败消息提醒内容等
export default {
  data() {
    return {
      sexList: [
        { name: '未知', value: 0 },
        { name: '男', value: 1 },
        { name: '女', value: 2 },
      ],
      // 弹出框标题
      dialogTitleObj: {
        add: '添加',
        create: '添加',
        edit: '编辑',
        update: '编辑',
        detail: '详情',
      },
    };
  },
  methods: {
    // 操作成功消息提醒内容
    submitOk(msg, cb) {
      this.$notify({
        title: '成功',
        message: msg || '操作成功！',
        type: 'success',
        duration: 2000,
        onClose: function () {
          cb && cb();
        },
      });
    },
    // 操作失败消息提醒内容
    submitFail(msg) {
      this.$message({
        message: msg || '网络异常，请稍后重试！',
        type: 'error',
      });
    },
  },
};
