# Java - json字符串、json对象、java对象互转

- `com.alibaba.fastjson`
- `cn.hutool.json`

### json字符串转list对象

```
List<User> list = JSONObject.parseArray(jsonStr, User.class);

List<User> list = JSONUtil.toList(JSONUtil.parseArray(jsonStr), User.class);
```

### list对象转json字符串

```
String jsonStr = JSON.toJSONString(list) 

String jsonStr = JSONUtil.toJsonStr(list);
```

### java对象转json字符串

```
String json = JSONObject.toJSONString(user);

String json = JSONUtil.toJsonStr(user);
```

### json字符串转java对象

```
User user = JSONObject.parseObject(json, User.class);

User user = JSONUtil.toBean(json, User.class);

// 泛型 -- ex: 用上面的方式应该也可，看情况选择吧
User<User> user = JSONObject.parseObject(jsonObj, new TypeReference<User<User>>() {});
```
