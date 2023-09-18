<template>
  <div id="container" class="w-full h-full"></div>
</template>
<script setup>
import axios from 'axios';
const { proxy } = getCurrentInstance();
let { lbs_qq_key } = toRefs(proxy.$store.system.useSystemStore());
const props = defineProps({
  width: {
    type: String,
    default: '600px',
  },
  height: {
    type: String,
    default: '300px',
  },
});

defineExpose({
  initMap,
  addressToLocation,
});

// let address = ref('四川省成都市武侯区天府四街');
let map = null;

// { lat: 30.56079, lng: 104.07483 }
async function initMap(location) {
  if (!location) {
    // 获取当前ip地址 https://www.ipify.org/
    let ipRes = await axios.get('http://api.ipify.org?format=json');
    let ip = ipRes.data.ip;

    // 通过ip获取定位  https://lbs.qq.com/service/webService/webServiceGuide/webServiceIp
    await axios
      .get(`https://apis.map.qq.com/ws/location/v1/ip?ip=${ip}&key=${lbs_qq_key.value}`)
      // .get(`https://apis.map.qq.com/ws/location/v1/ip?key=${lbs_qq_key.value}`)
      .then((res) => {
        alert(1);
        console.log('111', res);
        location = res.result.location;
      })
      .catch((err) => {
        console.log('通过ip获取定位异常：', err);
        location = { lat: 30.56079, lng: 104.07483 };
      });
  }

  var center = new TMap.LatLng(location.lat, location.lng);
  // 初始化地图 https://lbs.qq.com/webDemoCenter/glAPI/glMap/createMap
  map = new TMap.Map(document.getElementById('container'), {
    rotation: 0, // 设置地图旋转角度
    pitch: 30, // 设置俯仰角度（0~45）
    zoom: 13, // 设置地图缩放级别
    center: center, // 设置地图中心点坐标
  });
}

// 地址转坐标 https://lbs.qq.com/webDemoCenter/glAPI/glServiceLib/geocoderGetLocation
async function addressToLocation(addressStr) {
  if (!addressStr) {
    proxy.submitFail('请先填写地址!');
    return;
  }
  var geocoder = new TMap.service.Geocoder(); // 新建一个正逆地址解析类
  var markers = new TMap.MultiMarker({ map: map, geometries: [] });
  markers.setGeometries([]);
  // 将给定的地址转换为坐标位置
  let locationObj;
  await geocoder.getLocation({ address: addressStr }).then((result) => {
    // 拿到坐标数值
    locationObj = result.result.location;
    // console.log('结果', locationObj);
    markers.updateGeometries([
      {
        id: 'main',
        position: locationObj, // 将得到的坐标位置用点标记标注在地图上
      },
    ]);
    map.setCenter(locationObj);
  });
  return locationObj;
}
</script>
<style lang="scss" scoped></style>
