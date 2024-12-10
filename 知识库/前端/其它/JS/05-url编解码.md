# url编解码

```js
let url = '/pages/index/detail?id=1&xx=123&code=小郑';

// 加密
const encodedUrl = encodeURIComponent(url);
console.log(encodedUrl); // %2Fpages%2Findex%2Fdetail%3Fid%3D1%26xx%3D123%26code%3D%E5%B0%8F%E9%83%91

// 解密
const decodedUrl = decodeURIComponent(encodedUrl);
console.log(decodedUrl); // /pages/index/detail?id=1&xx=123&code=小郑
```