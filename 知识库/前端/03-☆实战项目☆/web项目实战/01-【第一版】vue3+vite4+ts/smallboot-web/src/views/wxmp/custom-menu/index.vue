<template>
  <base-wraper>
    <div class="app-container" v-if="menu != null">
      <!-- 左边配置 -->
      <div class="left">
        <div class="menu">
          <div class="content" v-for="(item, index) of menu.buttons" :key="index">
            <!-- 一级菜单 -->
            <div @click="selectMenu(1, index)" class="item" :class="{ active: selectedMenuIndex == index && selectedMenuLevel == 1 }">
              {{ item.name }}
            </div>
            <!--二级菜单-->
            <div class="sub-menu" v-if="selectedMenuIndex == index">
              <div class="sub-title" v-for="(subItem, subIndex) in item.subButtons" :key="subIndex">
                <div
                  class="sub-item"
                  :class="{ active: selectedMenuIndex == index && selectedSubMenuIndex == subIndex && selectedMenuLevel == 2 }"
                  @click="selectMenu(2, subIndex)"
                >
                  {{ subItem.name }}
                </div>
              </div>
              <!-- 二级菜单加号 -->
              <div class="add-icon" v-if="item.subButtons.length < 5" @click="addMenu(2, index)">
                <el-icon><Plus /></el-icon>
              </div>
            </div>
          </div>
          <!-- 一级菜单加号 -->
          <div class="add-icon" v-if="menu.buttons.length < 3" @click="addMenu(1)">
            <el-icon><Plus /></el-icon>
          </div>
        </div>
        <el-button class="save-btn" type="success" @click="save">保存并发布</el-button>
      </div>
      <!-- 右边配置 -->
      <div v-if="selectedMenu" class="right">
        <div class="content">
          <div class="del-btn">
            <el-button type="danger" @click="deleteMenu(selectedMenu)">删除当前菜单</el-button>
          </div>
          <div class="interval">
            <span>菜单名称：</span>
            <el-input v-model="selectedMenu.name" placeholder="请输入菜单名称" maxlength="8" clearable></el-input>
            <p class="tips">tips：仅支持中英文和数字，字数不超过4个汉字或8个字母。</p>
          </div>

          <div class="interval">
            <span>消息类型：</span>
            <el-radio-group v-model="selectedMenu.type">
              <el-radio :label="'media_id'">发送素材</el-radio>
              <el-radio :label="'view'">跳转网页</el-radio>
              <el-radio :label="'miniprogram'">跳转小程序</el-radio>
            </el-radio-group>
          </div>
          <div class="interval">
            <div v-if="selectedMenu.type == 'media_id'">
              <span>素材内容：</span>
              <el-input v-model="selectedMenu.mediaId" placeholder="请输入mediaId" clearable></el-input>
            </div>
            <div v-if="selectedMenu.type == 'view'">
              <span>网页链接：</span>
              <el-input v-model="selectedMenu.url" placeholder="请输入网页链接" clearable></el-input>
            </div>
            <div v-if="selectedMenu.type == 'miniprogram'">
              <div>
                <span class="miniprogram-text">小程序appId：</span>
                <el-input v-model="selectedMenu.appid" placeholder="请输入小程序的appId" clearable></el-input>
              </div>
              <div>
                <span class="miniprogram-text">页面路径：</span>
                <el-input v-model="selectedMenu.pagePath" placeholder="eg：pages/index/index" clearable></el-input>
              </div>
              <p class="tips">tips:需要和公众号进行关联才可以把小程序绑定在微信菜单上！</p>
            </div>
          </div>
        </div>
        <!-- <div>{{ menu }}</div> -->
      </div>
      <base-no-data v-else class="right">请先选择菜单</base-no-data>
    </div>
  </base-wraper>
</template>
<script>
export default {
  name: 'WxMpMenu',
  data() {
    return {
      selectedMenuLevel: null, // 选中的菜单级别
      selectedMenuIndex: null, // 选中的一级菜单索引
      selectedSubMenuIndex: null, // 选中的二级菜单索引
      selectedMenu: null, // 选中的菜单数据
      menu: null, // 所有菜单数据
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$api.wx_mp_menu.detail().then((res) => {
        this.menu = res.data.menu
      })
      // this.menu.buttons = [
      //   {
      //     name: '菜单',
      //     subButtons: [
      //       {
      //         name: '子菜单',
      //       },
      //     ],
      //   },
      // ]
    },
    // 菜单点击事件
    selectMenu(level, index) {
      this.selectedMenuLevel = level
      if (level == 1) {
        this.selectedMenuIndex = index
        this.selectedMenu = this.menu.buttons[this.selectedMenuIndex]
      } else if (level == 2) {
        this.selectedSubMenuIndex = index
        this.selectedMenu = this.menu.buttons[this.selectedMenuIndex].subButtons[this.selectedSubMenuIndex]
      }
    },
    // 添加菜单
    addMenu(level, index) {
      if (level == 1 && this.menu.buttons.length < 3) {
        this.menu.buttons.push({
          type: 'view',
          name: '菜单名称',
          subButtons: [],
          url: '',
        })
        this.selectMenu(1, this.menu.buttons.length - 1)
      } else if (level == 2 && this.menu.buttons[index].subButtons.length < 5) {
        this.menu.buttons[index].subButtons.push({
          type: 'view',
          name: '子菜单名称',
          url: '',
        })
        this.selectMenu(2, this.menu.buttons[index].subButtons.length - 1)
      }
    },
    // 删除菜单
    deleteMenu() {
      if (this.selectedMenuLevel == 1 && confirm('该菜单下所有内容将会被删除！')) {
        this.menu.buttons.splice(this.selectedMenuIndex, 1)
      } else if (this.selectedMenuLevel == 2) {
        this.menu.buttons[this.selectedMenuIndex].subButtons.splice(this.selectedSubMenuIndex, 1)
      }
      this.unSelected()
    },
    // 不选中任何菜单
    unSelected() {
      this.selectedMenuLevel = null
      this.selectedMenuIndex = null
      this.selectedSubMenuIndex = null
      this.selectedMenu = null
    },
    // 提交数据
    save() {
      // console.log(this.menu)
      let res = this.$api.wx_mp_menu.update(this.menu)
      this.submitOk(res.message)
    },
  },
}
</script>
<style lang="scss" scoped="scoped">
.app-container {
  display: flex;
  min-width: 1200px;
  width: 1200px;
  margin: 0 auto;

  .left {
    width: 350px;
    height: 800px;
    background: url('./bg.png') no-repeat;
    // background: #21e0c0;
    background-size: 100% auto;
    padding: 580px 25px 88px;
    position: relative;
    .menu {
      .content {
        position: relative;
        display: inline-block;
        width: 100px;
        text-align: center;
        background-color: #e2e2e2;
        border: 1px solid #ebedee;
        cursor: pointer;

        .item {
          height: 44px;
          line-height: 44px;
          text-align: center;
          &.active {
            border: 1px solid #2bb673;
          }
        }
        .sub-menu {
          position: absolute;
          width: 100px;
          bottom: 45px;

          .sub-title {
            background-color: #e8e7e7;
            margin-bottom: 2px;
          }

          .sub-item {
            height: 44px;
            line-height: 44px;
            text-align: center;
            &.active {
              border: 1px solid #2bb673;
            }
          }
        }
      }

      .add-icon {
        display: inline-block;
        width: 100px;
        text-align: center;
        background-color: #e2e2e2;
        border: 1px solid #ebedee;
        cursor: pointer;
        height: 46px;
        line-height: 46px;
      }
    }
    .save-btn {
      position: absolute;
      bottom: 35px;
      left: 125px;
    }
  }
  .right {
    width: 60%;
    background-color: #e8e7e7;
    padding: 25px 10px 0px 20px;
    height: 800px;
    margin-left: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .content {
      .del-btn {
        text-align: right;
      }
      .tips {
        color: #29b6f6;
        margin-top: 10px;
        margin-left: 80px;
      }
      .interval {
        margin-top: 30px;
        ::v-deep .el-input {
          width: 80%;
        }
      }
      .miniprogram-text {
        display: inline-block;
        width: 80px;
      }
    }
  }
}
</style>
