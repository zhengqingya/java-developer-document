<template>
  <div class="w-full p-5 border-radius-4" style="background: rgba(154, 235, 178, 0.775)">
    <el-alert title="tips: 属性变动会影响sku数据！" type="warning" :closable="false" show-icon />

    <base-card title="sku属性" class="">
      <span>选择属性：</span>
      <el-autocomplete v-model="newAttrKey" style="width: 200px" class="m-b-10" :fetch-suggestions="getAttrKeyList" value-key="attrKeyName" clearable placeholder="如：颜色" @select="selectAttrKey">
        <template v-if="newAttrKey && attrKeyList.length === 0" #suffix> <el-button link @click="addAttrKey">添加</el-button> </template>
      </el-autocomplete>
    </base-card>

    <div class="flex">
      <base-card v-for="item in attrDbList" :key="item.attrKeyName" :title="item.attrKeyName" class="m-l-10 bg-color-white" style="width: 300px">
        <template #append>
          <el-input v-model="item.newAttrValue" style="width: 150px" placeholder="添加新属性值 如：蓝色">
            <template #append> <el-button link @click="addAttrValue(item)">添加</el-button></template>
          </el-input>
          <base-delete-btn @ok="delAttr(item.attrKeyId)" />
        </template>
        <el-checkbox-group v-model="item.selectedAttrValueIdList" @change="handleTableColumn(true)">
          <el-checkbox v-for="valueItem in item.attrValueList" :key="valueItem" :label="valueItem.attrValueId">{{ valueItem.attrValueName }}</el-checkbox>
        </el-checkbox-group>
      </base-card>
    </div>

    <base-card title="sku列表" class="">
      <el-table :data="skuList" border height="350px" table-layout="auto">
        <!-- 额外添加的编号项（可删除） -->
        <el-table-column type="index" :label="'编号'" :width="55"></el-table-column>

        <!-- 自定义表项 -->

        <el-table-column v-for="column in columnList" :key="column.prop" align="center">
          <!-- 自定义表头 -->
          <template #header>
            <!-- 段落：show为true -->
            <p>{{ column.label }}</p>
          </template>
          <!-- 自定义单元格内容 -->
          <template #default="scope">
            <div v-if="column.isSpec">
              <!-- <div>{{ scope.row[column.prop] }}</div> -->
              <span>{{ scope.row[column.prop] }}</span>
            </div>
            <div v-else>
              <base-upload-single v-if="column.prop === 'coverImg'" v-model="scope.row[column.prop]" />
              <span v-else-if="column.prop === 'isShow'">{{ scope.row[column.prop] ? '是' : '否' }}</span>
              <span v-else-if="column.prop === 'useStock'">{{ scope.row[column.prop] }}</span>
              <!-- <span v-else-if="column.prop === 'usableStock'">{{ scope.row['totalStock'] - scope.row['useStock'] }}</span> -->
              <el-input v-else v-model="scope.row[column.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </base-card>
  </div>
</template>
<script setup>
const { proxy } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

// v-model的值还没回传过来时会导致页面数据显示不出来，如何取消计算属性换用手动传值方案
// let skuList = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(val) {
//     proxy.$emit('update:modelValue', val);
//   },
// });
let skuList = $ref([]); // sku数据
let attrDbList = $ref([]); // 属性数据
let attrKeyList = $ref([]); // 属性key
let newAttrKey = $ref(''); // 选择的属性key
// 表头，以键(prop)值(label)存储表头
let columnList = $ref([
  // { isSpec: true, prop: '商品规格', label: '规格1' },
  // { isSpec: true, prop: '颜色', label: '蓝色' },
  { isSpec: false, prop: 'sellPrice', label: '销售价（单位：元）' },
  { isSpec: false, prop: 'useStock', label: '已用库存' },
  // { isSpec: false, prop: 'usableStock', label: '剩余库存' },
  { isSpec: false, prop: 'totalStock', label: '总库存' },
  { isSpec: false, prop: 'coverImg', label: '封面图' },
  { isSpec: false, prop: 'isShow', label: '是否显示' },
]);

defineExpose({ init });

async function init(data) {
  skuList = data;
  if (skuList.length === 0) {
    return;
  }

  let keyIdList = []; // 拿到选中的属性key，value 对应的ids
  let valueIdList = []; // 拿到选中的属性value
  skuList.forEach((item) => {
    item.sellPrice = item.sellPrice / 100; // 金额一类 分转元
    item.specList.forEach((specItem) => {
      keyIdList.push(specItem.attrKeyId);
      valueIdList.push(specItem.attrValueId);
    });
  });
  keyIdList = Array.from(new Set(keyIdList)); // 去重
  valueIdList = Array.from(new Set(valueIdList));

  let res = await proxy.$api.pms_attr.listByKeyIdList({ idList: keyIdList.join() });
  attrDbList = res.data;
  // 设置选中的属性值
  attrDbList.forEach((item) => (item.selectedAttrValueIdList = valueIdList));

  handleTableColumn();
}

// 属性
async function getAttrKeyList(name, cb) {
  let res = await proxy.$api.pms_attr.listKey({ attrKeyName: name });
  attrKeyList = res.data;
  cb(res.data);
}
function addAttrKey() {
  newAttrKey = newAttr.replace(/\s/g, '');
  proxy.$api.pms_attr.addKey({ attrKeyName: newAttrKey });
}
function delAttr(id) {
  // proxy.$api.pms_attr.deleteKey({ id: id })
  // 移除列表中的数据
  attrDbList.splice(
    attrDbList.findIndex((item) => item.attrKeyId === id),
    1,
  );

  handleTableColumn(true);
}
function addAttrValue(attrKeyObj) {
  let attrKeyId = attrKeyObj.attrKeyId;
  let newAttrValue = attrKeyObj.newAttrValue.replace(/\s/g, '');
  proxy.$api.pms_attr.addValue({ attrKeyId: attrKeyId, attrValueName: newAttrValue });

  // 刷新
  attrDbList.forEach(async (item) => {
    if (item.attrKeyId == attrKeyId) {
      let attrValueList = await getAttrValueList(attrKeyId);
      item.attrValueList = attrValueList;
      item.newAttrValue = '';
      return;
    }
  });
}
// 选中属性时触发
async function selectAttrKey(keyObj) {
  let attrKeyName = keyObj.attrKeyName;
  let attrKeyNameList = attrDbList.map((attr) => attr.attrKeyName);
  if (attrKeyNameList.includes(attrKeyName)) {
    newAttrKey = '';
    return;
  }
  let attrValueList = await getAttrValueList(keyObj.id);
  attrDbList.push({ attrKeyId: keyObj.id, attrKeyName: attrKeyName, attrValueList: attrValueList });
  newAttrKey = '';
}
async function getAttrValueList(id) {
  let res = await proxy.$api.pms_attr.listValue({ attrKeyId: id });
  return res.data;
}

// 动态表格项数据
function handleTableColumn(isClickSelectedAttr) {
  if (attrDbList.length === 0 || (attrDbList.length === 1 && attrDbList[0].selectedAttrValueIdList.length === 0)) {
    skuList = [];
    return;
  }
  let specList = [];

  if (isClickSelectedAttr) {
    // 说明是选择属性时触发的，这里就需要重新计算表头数据
    columnList = columnList.filter((item) => !item.isSpec);
    attrDbList.forEach((item) => {
      if (item.selectedAttrValueIdList.length > 0) {
        item.selectedAttrValueIdList.forEach((selectedValueId) => {
          item.attrValueList.forEach((valueItem) => {
            if (valueItem.attrValueId === selectedValueId) {
              specList.push({
                attrKeyId: item.attrKeyId,
                attrKeyName: item.attrKeyName,
                attrValueId: valueItem.attrValueId,
                attrValueName: valueItem.attrValueName,
              });
            }
          });
        });
      }
    });
  } else {
    // 第一次初始化数据表头
    if (skuList.length > 0) {
      skuList.forEach((item) => {
        item.specList.forEach((specItem) => {
          specList.push(specItem);
        });
      });
      // 去重
      const unique = (arrs) => {
        const res = new Map();
        return arrs.filter((arr) => !res.has(arr.attrValueName) && res.set(arr.attrValueName, 1));
      };
      specList = unique(specList);
    }
  }

  // 处理表头
  let attrKeyList = Array.from(new Set(specList.map((item) => item.attrKeyName)));
  attrKeyList.forEach((attrKeyName) => {
    // 头部插入数据
    columnList.unshift({ isSpec: true, prop: attrKeyName, label: attrKeyName });
  });

  let attrList = getGroupObject(specList, 'attrKeyName');
  handleSkuCartesian(attrList);
}

// sku 笛卡尔积  -- 支持数组和对象
function handleSkuCartesian(attrList) {
  const attrValueList = Object.values(attrList).map((attr) => attr);
  const cartesianSku = (...arrays) => arrays.reduce((acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])), [[]]);
  const skuCombinationList = cartesianSku(...attrValueList);

  // 为每一个sku属性加上规格值
  let newSkuList = [];
  skuCombinationList.forEach((specList) => {
    let newSkuItem = {};

    let isExistOldSku = false;
    skuList.forEach((dbSkuItem) => {
      if (JSON.stringify(dbSkuItem.specList) == JSON.stringify(specList)) {
        isExistOldSku = true;
        newSkuItem = { ...dbSkuItem };
        return;
      }
    });

    specList.forEach((specItem) => {
      newSkuItem[`${specItem.attrKeyName}`] = specItem.attrValueName;
      newSkuItem.sort = 1;
      newSkuItem.specList = specList;
    });

    if (isExistOldSku) {
      // 一一对应
    } else {
      // 加入新sku数据
      newSkuItem.isShow = 1;
      newSkuItem.useStock = 0;
    }
    newSkuList.push(newSkuItem);
  });

  skuList = JSON.parse(JSON.stringify(newSkuList));
  proxy.$emit('update:modelValue', skuList);
}

// 其它的一些固定函数 ------------------------------
// 分组-对象
function getGroupObject(list, attr) {
  const map = new Map();
  list.forEach((item, index, arr) => {
    if (!map.has(item[attr])) {
      map.set(
        item[attr],
        arr.filter((a) => a[attr] == item[attr]),
      );
    }
  });
  return Object.fromEntries(Array.from(map).map((item) => [item[0], item[1]]));
}
</script>

<style lang="scss" scoped></style>
