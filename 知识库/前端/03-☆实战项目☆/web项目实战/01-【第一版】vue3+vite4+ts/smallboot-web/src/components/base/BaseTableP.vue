<template>
  <div>
    <div v-if="isHeader" class="base-table-header">
      <slot name="header" :res="res"></slot>
    </div>
    <slot name="zdy-header" :res="res"></slot>
    <el-table
      ref="baseTable"
      v-loading="loading && (isPage ? res.records == null || res.records.length == 0 : tableDataList == null || tableDataList.length == 0)"
      v-bind="$attrs"
      :data="isPage ? res.records : tableDataList"
      :class="{ pointer: pointer }"
      size="small"
      fit
      highlight-current-row
    >
      <el-table-column v-if="selection" type="selection" :width="55"></el-table-column>
      <template v-if="indexCode">
        <el-table-column type="index" label="序号" width="60px"></el-table-column>
      </template>
      <slot />
      <template v-for="(item, index) in columns" v-bind:key="item">
        <el-table-column v-if="item.slotName" :key="index" v-bind="item" :width="item.width">
          <template #scope>
            <slot :name="item.slotName" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="item"></el-table-column>
      </template>
    </el-table>

    <div v-if="isPage" class="pagination-container">
      <base-pagination
        v-if="res && res.total > 0"
        :total="res.total == null ? 0 : res.total"
        v-model:page="pageParams.pageNum"
        v-model:limit="pageParams.pageSize"
        @pagination="getListPage"
      />
    </div>
  </div>
</template>
<script>
export default {
  model: {
    event: 'load',
  },
  props: {
    indexCode: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    params: {
      type: Object,
      default() {
        return {}
      },
    },
    api: {
      type: String,
      default: '',
    },
    pointer: {
      //行是否显示手指的手势
      type: Boolean,
      default: false,
    },
    isHeader: {
      //行是否显示手指的手势
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    isPage: {
      //是否分页
      type: Boolean,
      default() {
        return true
      },
    },
  },
  data() {
    return {
      loading: true,
      pageParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 分页响应数据
      res: {
        current: 1,
        pages: 2,
        size: 10,
        total: 0,
        records: [],
      },
      // 列表响应数据
      tableDataList: [],
      isCli: false,
    }
  },
  computed: {
    apiMethod() {
      return this.api.split('.').reduce((acc, item) => {
        return acc[item]
      }, this.$api)
    },
  },
  watch: {
    data: {
      handler(val) {
        this.res = []
        if (!this.isPage || (this.data && this.data.length > 0)) {
          this.tableDataList = val
        }
      },
      deep: true, // 是否深度监听
      immediate: true, // true代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行
    },
  },
  created() {
    this.refresh()
  },
  methods: {
    // 分页列表
    async getListPage(pageObj) {
      if (this.api) {
        this.loading = true
        // 处理分页参数
        if (pageObj) {
          // 从分页子组件中拿到数据
          this.pageParams.pageNum = pageObj.page
          this.pageParams.pageSize = pageObj.limit
        }
        // this.params.pageNum = this.pageParams.pageNum;
        // this.params.pageSize = this.pageParams.pageSize;
        // console.log(pageObj);
        let response = await this.apiMethod(this.params, this.pageParams)
        this.res = response.data
        this.loading = false
      }
    },
    // 列表
    async getList() {
      if (this.api) {
        this.loading = true
        let response = await this.apiMethod(this.params)
        this.tableDataList = response.data
        this.loading = false
      }
    },
    //刷新
    refresh() {
      this.loading = true
      if (this.data && this.data.length > 0) {
        // 情况1：走父组件传值过来
        this.tableDataList = this.data
      } else {
        // 情况2：走api接口数据
        if (this.isPage) {
          this.res = {
            current: 1,
            pages: 2,
            size: 10,
            total: 0,
            records: [],
          }
          this.pageParams.pageNum = 1
          this.getListPage()
        } else {
          this.getList()
        }
      }
      this.loading = false
    },
  },
}
</script>
<style lang="scss" scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
