export const filters = {
    // 获取性别值
    sexName: (sex) => {
        // 拿到mixin混入的属性值
        const { proxy } = getCurrentInstance();
        return proxy.sexList.find((obj) => obj.value == sex).name;
    },
};
