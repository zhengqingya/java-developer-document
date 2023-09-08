<template>
  <base-wraper>
    <div v-if="menu != null" class="flex">
      <!-- 左边配置 -->
      <div class="flex-c-start-center w-400">
        <div class="menu">
          <div v-for="(item, index) of menu.buttons" :key="index" class="content">
            <!-- 一级菜单 -->
            <div class="item" :class="{ active: selectedMenuIndex == index && selectedMenuLevel == 1 }" @click="selectMenu(1, index)">
              {{ item.name }}
            </div>
            <!--二级菜单-->
            <div v-if="selectedMenuIndex == index" class="sub-menu">
              <div v-for="(subItem, subIndex) in item.subButtons" :key="subIndex" class="sub-title">
                <div class="sub-item" :class="{ active: selectedMenuIndex == index && selectedSubMenuIndex == subIndex && selectedMenuLevel == 2 }" @click="selectMenu(2, subIndex)">
                  {{ subItem.name }}
                </div>
              </div>
              <!-- 二级菜单加号 -->
              <div v-if="item.subButtons.length < 5" class="add-icon" @click="addMenu(2, index)">
                <el-icon><Plus /></el-icon>
              </div>
            </div>
          </div>
          <!-- 一级菜单加号 -->
          <div v-if="menu.buttons.length < 3" class="add-icon" @click="addMenu(1)">
            <el-icon><Plus /></el-icon>
          </div>
        </div>
        <el-button class="m-t-20" type="success" @click="save">保存并发布</el-button>
      </div>
      <!-- 右边配置 -->
      <base-no-data v-if="!selectedMenu" class="right m-l-20">tips:选择菜单可查看菜单详情哦</base-no-data>
      <div v-else class="flex-1 m-l-20 p-10">
        <div class="content">
          <base-card title="菜单详情">
            <template #append>
              <el-button type="danger" @click="deleteMenu(selectedMenu)">删除当前菜单</el-button>
            </template>
            <base-cell label-width="100px">
              <base-cell-item label="菜单名称：">
                <div>
                  <el-input v-model="selectedMenu.name" placeholder="请输入菜单名称" maxlength="8" clearable></el-input>
                  <p class="text-color-warning">tips：仅支持中英文和数字，字数不超过4个汉字或8个字母。</p>
                </div>
              </base-cell-item>
              <base-cell-item label="消息类型：">
                <el-radio-group v-model="selectedMenu.type">
                  <el-radio :label="'media_id'">发送素材</el-radio>
                  <el-radio :label="'view'">跳转网页</el-radio>
                  <el-radio :label="'miniprogram'">跳转小程序</el-radio>
                </el-radio-group>
              </base-cell-item>
              <base-cell-item v-if="selectedMenu.type == 'media_id'" label="素材内容：">
                <el-input v-model="selectedMenu.mediaId" placeholder="请输入mediaId" clearable></el-input>
              </base-cell-item>
              <base-cell-item v-if="selectedMenu.type == 'view'" label="网页链接：">
                <el-input v-model="selectedMenu.url" placeholder="请输入网页链接" clearable></el-input>
              </base-cell-item>
              <div v-if="selectedMenu.type == 'miniprogram'">
                <base-cell-item label="小程序appId：">
                  <el-input v-model="selectedMenu.appid" placeholder="请输入小程序的appId" clearable></el-input>
                </base-cell-item>
                <base-cell-item label="页面路径：">
                  <div>
                    <el-input v-model="selectedMenu.pagePath" placeholder="eg：pages/index/index" clearable></el-input>
                    <p class="text-color-warning">tips:需要和公众号进行关联才可以把小程序绑定在微信菜单上！</p>
                  </div>
                </base-cell-item>
              </div>
            </base-cell>
          </base-card>
        </div>
        <!-- <div>{{ menu }}</div> -->
      </div>
    </div>
  </base-wraper>
</template>
<script setup>
const { proxy } = getCurrentInstance();

let selectedMenuLevel = $ref(null); // 选中的菜单级别
let selectedMenuIndex = $ref(null); // 选中的一级菜单索引
let selectedSubMenuIndex = $ref(null); // 选中的二级菜单索引
let selectedMenu = $ref(null); // 选中的菜单数据
let menu = $ref(null); // 所有菜单数据

onMounted(() => {
  init();
});

function init() {
  proxy.$api.wx_mp_menu.detail().then((res) => {
    menu = res.data.menu;
  });
  // menu.buttons = [
  //   {
  //     name: '菜单',
  //     subButtons: [
  //       {
  //         name: '子菜单',
  //       },
  //     ],
  //   },
  // ]
}
// 菜单点击事件
function selectMenu(level, index) {
  selectedMenuLevel = level;
  if (level == 1) {
    selectedMenuIndex = index;
    selectedMenu = menu.buttons[selectedMenuIndex];
  } else if (level == 2) {
    selectedSubMenuIndex = index;
    selectedMenu = menu.buttons[selectedMenuIndex].subButtons[selectedSubMenuIndex];
  }
}
// 添加菜单
function addMenu(level, index) {
  if (level == 1 && menu.buttons.length < 3) {
    menu.buttons.push({
      type: 'view',
      name: '菜单名称',
      subButtons: [],
      url: '',
    });
    selectMenu(1, menu.buttons.length - 1);
  } else if (level == 2 && menu.buttons[index].subButtons.length < 5) {
    menu.buttons[index].subButtons.push({
      type: 'view',
      name: '子菜单名称',
      url: '',
    });
    selectMenu(2, menu.buttons[index].subButtons.length - 1);
  }
}
// 删除菜单
function deleteMenu() {
  if (selectedMenuLevel == 1 && confirm('该菜单下所有内容将会被删除！')) {
    menu.buttons.splice(selectedMenuIndex, 1);
  } else if (selectedMenuLevel == 2) {
    menu.buttons[selectedMenuIndex].subButtons.splice(selectedSubMenuIndex, 1);
  }
  unSelected();
}
// 不选中任何菜单
function unSelected() {
  selectedMenuLevel = null;
  selectedMenuIndex = null;
  selectedSubMenuIndex = null;
  selectedMenu = null;
}
// 提交数据
function save() {
  let res = proxy.$api.wx_mp_menu.update(menu);
  proxy.submitOk(res.message);
}
</script>
<style lang="scss" scoped="scoped">
.menu {
  background: url('./bg.png') no-repeat;
  background-size: 100% auto;
  padding: 594px 28px 88px;
  position: relative;
  min-width: 358px;

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
    height: 45px;
    line-height: 45px;
  }
}

::v-deep(.el-input) {
  width: 350px;
}
</style>
