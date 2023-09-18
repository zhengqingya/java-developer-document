import { defineStore } from 'pinia';
import sys_province_city_area from '@/api/system/sys_province_city_area.js';
import sys_config from '@/api/system/sys_config';

export const useSystemStore = defineStore('system', () => {
  let provinceCityAreaList = ref([]); // 省市区数据
  let lbs_qq_key = ref(''); // 腾讯地图key

  // 初始化系统配置
  async function init() {
    initProvinceCityAreaList();
    initLbs();
  }

  // 初始化省市区数据
  async function initProvinceCityAreaList() {
    let res = await sys_province_city_area.tree();
    provinceCityAreaList.value = res.data;
  }

  async function initLbs() {
    let res = await sys_config.listByKey({ keyList: 'lbs_qq_key' });
    lbs_qq_key.value = res.data.lbs_qq_key.value;
    // 加载地图数据
    loadScript(lbs_qq_key.value);
  }

  // 异步加载地图 https://lbs.qq.com/webDemoCenter/glAPI/glMap/mapAsync
  function loadScript(key) {
    //创建script标签，并设置src属性添加到body中
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=' + key + '&libraries=service';
    document.body.appendChild(script);
  }

  return { init, provinceCityAreaList, lbs_qq_key };
});
