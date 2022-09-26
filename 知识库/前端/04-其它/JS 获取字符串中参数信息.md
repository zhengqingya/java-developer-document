# JS 获取字符串中参数信息

```javascript
// import { getUserInfo } from "@/utils/auth";

// 获取参数信息
function getParam(str, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = str.split("?")[1].match(reg); //匹配目标参数
    if (r != null) {
     return decodeURIComponent(r[2]);
    }
    return null; //返回参数值
}


// ex： 
getParam("http://localhost:8081/#/login?redirect=dashboard&ifThirdpartOauth=true&token=xx", "token");
```
