# Vue - 组织树形菜单组件 v-org-tree
 
-> iview中的  单独的一个组件也可以抽取出来在elment中使用 -> https://github.com/iview/iview-admin

### 官网资料：
https://github.com/lison16/v-org-tree

#### 效果图：
https://admin.iviewui.com/components/org_tree_page

---

-> element

# 基于Vue的组织架构树组件 -> vue-org-tree

官网资料：https://github.com/hukaibaihu/vue-org-tree
效果图：https://hukaibaihu.github.io/vue-org-tree/


### element中使用v-org-tree博客教程： ->  https://blog.csdn.net/qq_38225558/article/details/97185171


el-dropdown的源码封装有hiden()和show()方法，直接给el-dropdown加个ref再通过ref运行组件内的方法即可
```vue
<el-dropdown trigger="click" ref="messageDrop"></el-dropdown>

this.$refs.messageDrop.hide();
this.$refs.messageDrop.show();
```
