import store from '@/store';

/**
 * 自定义角色权限指令 `v-has-role`
 * single: v-has-role="'admin'"
 * array : v-has-role="['admin','test']"
 */
export const hasRole = {
  mounted(el, binding) {
    // 拿到DOM绑定需要的角色编码
    const { value } = binding;
    if (!value) {
      throw new Error("need roles! Like v-has-role=\"['admin','test']\"");
    }
    const requiredCodeList = value instanceof Array ? value : [value];
    let { isLogin, userObj } = toRefs(store.user.useUserStore());
    let hasRole = false;
    if (isLogin.value) {
      hasRole = userObj.value.roleCodeList.some((roleCode) => {
        return requiredCodeList.includes(roleCode);
      });
    }
    if (!hasRole) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
};
