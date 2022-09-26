const user = {
  namespaced: true,
  state: () => ({
    name: "小郑",
  }),
  getters: {
    // rootState: 根节点状态
    getName(state, getters, rootState) {
      console.log(rootState);
      console.log(getters);
      return state.name + "666";
    },
  },
};

export default user;
