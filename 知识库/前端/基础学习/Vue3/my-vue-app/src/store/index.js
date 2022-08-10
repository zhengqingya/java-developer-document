// 状态集中管理
import { reactive } from "vue";
const store = {
  state: reactive({
    msg: "hello",
  }),
  updateMsg: function () {
    this.state.msg = "你好";
  },
};

export default store;
