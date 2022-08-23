import { createStore } from "vuex";
import user from "./user";

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    a: user,
  },
  // 存放数据
  state() {
    return {
      count: 0,
      msg: "hello",
    };
  },
  // 可以认为是 store 的计算属性
  getters: {
    reverMsg(state) {
      return state.msg.split("").reverse().join("");
    },
    // 第二个参数可以拿到getters中的函数
    reverMsgLength(state, getters) {
      return getters.reverMsg.length;
    },
  },
  // 同步变更数据
  mutations: {
    increment(state, value) {
      if (value) {
        console.log(value);
        state.count += value;
      } else {
        state.count++;
      }
    },
    updateMsg(state, value) {
      state.msg = value;
    },
  },
  // 和后台交互获取数据
  actions: {
    // context: 一个与store实例具有相同方法和属性的对象
    getData(context, params) {
      console.log(context);
      console.log(params);
      fetch("http://localhost/web/api/demo/test/time")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          context.commit("updateMsg", res.data);
        });
    },
  },
});

export default store;
