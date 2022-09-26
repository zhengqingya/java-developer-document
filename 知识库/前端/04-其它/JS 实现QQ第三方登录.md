# JS 实现QQ第三方登录

### 法一：

```html

<script type="text/javascript"
        src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js"
        data-callback="true"
        data-appid="xx"
        data-redirecturi="http://127.0.0.1:9527/demo/login"
        charset="utf-8"></script>  <!-- 注意：vue项目在入口index.html中头部引入qq的sdk，在其他页面钩子函数中即可使用qqskd的函数-->

<script type="text/javascript">
    // 打开QQ授权登录界面，授权成功后会重定向
    QC.Login.showPopup({
      appId:"xxx",
      redirectURI:"http://127.0.0.1:9527/demo/login"  //登录成功后会自动跳往该地址
    });
    
    // 下面在授权回调的另外一个页面进行登录跳转到后端处理，如果不跳转到一个新的页面去接受这个回调 则无法判断是否登录
    if (QC.Login.check()) {//检查是否登录
      console.log("已经登录");
      QC.Login.getMe(function(openId, accessToken) {//该处的openId，accessToken就是后台需要的参数了，后台通过这些参数拿取临时登录凭证，然后就是自己的逻辑了<br>          console.log("登录回调");
        that.openId = openId;
        that.accessToken = accessToken;
        that.loginByQQ();
      });
    } else {
      console.log('登录失败！！')
      this.submitFail("登录失败");
    }

</script>
```

###### vue 项目在 `index.html` 中引入如下js sdk

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>项目demo</title>
    <script type="text/javascript"
            src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js"
            data-callback="true"
            data-appid="xxx"
            data-redirecturi="http://127.0.0.1:9527/demo/login"
            charset="utf-8"></script>
</head>
<body>
<script src=<%= BASE_URL %>/tinymce4.7.5/tinymce.min.js></script>
<div id="app"></div>
<!-- built files will be auto injected -->
</body>
</html>
```

### 法二：

```javascript
 tencentHandleClick(thirdpart){
    var _self = this;// 注：将先将vue这个对象保存在_self对象中
    // _self.$store.commit('SET_AUTH_TYPE', thirdpart)
    const client_id = 'xxx'
    const redirect_uri = "http://127.0.0.1:9527/demo/login"
    const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
    // 打开QQ授权登录界面，授权成功后会重定向
    openWindow(url, thirdpart, 540, 540)

    //检查是否登录
    if (QC.Login.check()) {
      //该处的openId，accessToken就是后台需要的参数了，后台通过这些参数拿取临时登录凭证，然后就是自己的逻辑了
      QC.Login.getMe(function(openId, accessToken) {
        // 传参给后台进行登录验证
        _self.$store.dispatch('LoginByUsername', {accessToken: accessToken}).then(() => {
          _self.$router.push({ path: this.redirect || '/' })
        })
      })
    } else {
      _self.submitFail('授权失败!')
    }
  }
```
