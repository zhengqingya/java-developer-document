<template>
  <div class="wx-mp-account" v-show="this.isShow">
    <div class="box">
      <!-- <p>{{ $route.path }}</p> -->
      <span>请选择公众号：</span>
      <el-select v-model="appId" placeholder="请选择账号" @change="changeData">
        <el-option v-for="item in list" :key="item.appId" :label="item.name" :value="item.appId" />
      </el-select>
    </div>
  </div>
</template>

<script>
import { localStorage } from '@/utils/storage'
export default {
  name: 'WxMpAccount',
  data() {
    return {
      appId: localStorage.get('appId'),
      list: [],
    }
  },
  computed: {
    isShow: function () {
      let isShow = this.$route.path.indexOf('/wx/mp') === 0 && !this.$route.path.includes('/wx/mp/account')
      this.init(isShow)
      return isShow
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init(isShow) {
      if (!isShow) {
        return
      }
      let res = await this.$api.wx_mp_account.list()
      this.list = res.data
      if (this.list.length == 0) {
        alert('请先去添加账号！')
        return
      }
      if (this.appId == null) {
        this.appId = this.list[0].appId
      }
      this.changeData()
    },
    changeData() {
      localStorage.set('appId', this.appId)
      // alert(localStorage.get('appId'))
    },
  },
}
</script>
<style lang="scss" scoped>
.wx-mp-account {
  position: relative;

  .box {
    position: absolute;
    right: 200px;
    top: 10px;
    text-align: center;

    background: #08c0ee8c;
    border-radius: 10%;

    ::v-deep .el-input__inner {
      width: 150px;
      color: red;
      font-size: 20px;
    }
    ::v-deep .el-input__wrapper {
      background-color: #08c0ee8c;
    }
  }
}
</style>
