<template>
  <div id="stlDom" ref="stlDom" />
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

// 这些参数需放外层，不然在vue3中会报错...  vue2中不会出现
var scene, // 场景
  group; // 组 -- 父对象中放模型数据
export default {
  data() {
    return {
      camera: null, // 相机
      controls: null, // 轨道控制器
      renderer: null, // 渲染
      // STL模型文件地址 -- 文件放public目录下测试 或 直接填写文件地址...
      stlFileList: ["test.stl"],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // ======================= ↓↓↓↓↓↓ 1、场景 ↓↓↓↓↓↓ =======================
      this.scene = new THREE.Scene(); // 创建场景对象Scene
      this.scene.background = new THREE.Color("#000"); // 设置场景的背景色 -- 黑色
      this.group = new THREE.Group();

      // ======================= ↓↓↓↓↓↓ 2、坐标轴 ↓↓↓↓↓↓ =======================
      this.scene.add(new THREE.AxesHelper(20));

      // ======================= ↓↓↓↓↓↓ 3、相机 ↓↓↓↓↓↓ =======================
      this.camera = new THREE.PerspectiveCamera(
        45, // 参数1：fov —  视场；垂直方向的观察角度，也就是眼睛上下俯视的观察角度
        window.innerWidth / window.innerHeight, //  参数2：aspect — （长宽比）是照相机水平方向和竖直方向长度的比值
        1, // 参数3：near — （近面距离）相机到视景体最近的距离
        10000 // 参数4：far — （远面距离）相机到视景体最远的距离
      ); // 透视相机（PerspectiveCamera）
      // 设置相机的位置
      this.camera.position.set(0, 30, 50);
      this.scene.add(this.camera);

      // ======================= ↓↓↓↓↓↓ 4、添加灯光 ↓↓↓↓↓↓ =======================
      // 1、环境光
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      // 2、半球光
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 1);
      // 开启castShadow生成动态的投影
      hemisphereLight.castShadow = true;
      // 设置灯光的位置
      hemisphereLight.position.set(200, 600, 200);
      // 将灯光添加到场景中
      this.scene.add(hemisphereLight);

      // ======================= ↓↓↓↓↓↓ 5、渲染器 ↓↓↓↓↓↓ =======================
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, // 默认为false。是否开启反锯齿
        alpha: true, // 默认为false。是否可以设置背景色透明
      });
      this.renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比
      this.renderer.setSize(window.innerWidth, window.innerHeight); // 输出canvas的大小
      document.getElementById("stlDom").appendChild(this.renderer.domElement);
      this.renderer.sortObjects = true; // 按层级先后渲染

      // ======================= ↓↓↓↓↓↓ 6、控制器 ↓↓↓↓↓↓ =======================
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); // 操作相机：可以使用鼠标控制相机围绕场景中心进行旋转和平移。
      this.controls.minDistance = 10; // 相机移动最近距离
      this.controls.maxDistance = 100; // 相机移动最远距离
      this.controls.addEventListener("change", this.render);

      // ======================= ↓↓↓↓↓↓ 7、添加STL模型 ↓↓↓↓↓↓ =======================
      this.addSTLModel();

      // ======================= ↓↓↓↓↓↓ 8、渲染 ↓↓↓↓↓↓ =======================
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera); // 渲染
    },
    // 加载模型
    addSTLModel() {
      let that = this;
      const loader = new STLLoader();
      this.stlFileList.forEach((stlFile) => {
        loader.load(stlFile, function (geometry) {
          // Phong网格材质 https://thre ejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial
          const material = new THREE.MeshPhongMaterial({
            color: "#" + Math.floor(Math.random() * 16777215).toString(16), // 材质的颜色 -- 随机颜色
            transparent: true, // 开启透明度
            opacity: 1, // 设置透明度
            specular: 0x111111, // 材质的高光颜色。默认值为0x111111（深灰色）
            shininess: 100, // 高亮的程度，越高的值越闪亮。默认值为 30。
            // wireframe: true  // 将几何体渲染为线框
          });
          // geometry.center(); // 适用于单个物体居中

          // 物体
          let mesh = new THREE.Mesh(geometry, material);
          mesh.name = stlFile;
          mesh.castShadow = true; // 物体可产生阴影
          mesh.receiveShadow = true; // 物体可接收阴影
          mesh.rotation.x = -0.5 * Math.PI; // 将模型摆正
          mesh.scale.set(0.1, 0.1, 0.1); // 缩放

          that.group.add(mesh); // 先加入一个父对象中
          that.scene.add(that.group); // 再将这一组模型加入场景

          that.handleSTLCenter(); // 让模型居中
          that.render(); // 渲染
        });
      });
    },
    // 多个模型对象居中
    handleSTLCenter() {
      let group = this.group;
      // 包围盒全自动计算：模型整体居中
      var box3 = new THREE.Box3();
      // 计算层级模型group的包围盒
      // 模型group是加载一个三维模型返回的对象，包含多个网格模型
      box3.expandByObject(group);
      // 计算一个层级模型对应包围盒的几何体中心在世界坐标中的位置
      var center = new THREE.Vector3();
      box3.getCenter(center);
      // 重新设置模型的位置 -- 居中
      group.position.x = group.position.x - center.x;
      group.position.y = group.position.y - center.y;
      group.position.z = group.position.z - center.z;
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#stlDom {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
