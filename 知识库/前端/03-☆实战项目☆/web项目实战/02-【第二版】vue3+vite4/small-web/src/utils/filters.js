export const filters = {
  // 获取性别值
  sexName: (sex) => {
    // 拿到mixin混入的属性值
    const { proxy } = getCurrentInstance();
    let result = proxy.sexList.find((obj) => obj.value == sex);
    return result ? result.name : '数据丢失';
  },
};
