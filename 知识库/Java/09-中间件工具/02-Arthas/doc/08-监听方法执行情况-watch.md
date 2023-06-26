### watch

> 监听方法执行情况: 返回值、抛出异常、入参

```shell
# 监听提交参数 & 返回对象值
watch com.zhengqing.demo.api.TestController test1 "{params[0],returnObj}"

# 监听第一个提交参数 & 返回对象中的name字段值
watch com.zhengqing.demo.api.TestController test2 "{params[0],returnObj.obj.name}"

# 监听第一个提交参数 & 指定输出结果的属性遍历深度(默认为1)
watch com.zhengqing.demo.api.TestController test2 "{params[0],returnObj}" -x 3

# 监听异常 -n：只执行2次
watch com.zhengqing.demo.api.TestController test2 "{params[0],returnObj,throwExp}" -x 3 -n 2
```

![watch.png](images/watch.png)

```java
package com.zhengqing.demo.api;

import cn.hutool.json.JSONUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("api")
@Api(tags = "测试api")
public class TestController {

    /**
     * curl http://127.0.0.1:666/api/test
     */
    @GetMapping("test")
    @ApiOperation("test")
    public String test() {
        return "66";
    }

    /**
     * curl http://127.0.0.1:666/api/test1
     */
    @GetMapping("test1")
    @ApiOperation("test1")
    public User test1(String str) {
        System.out.println("hello");
        return User.builder()
                .id(1)
                .name("zhengqingya")
                .obj(User.builder().id(2).name("玛卡巴卡").build())
                .build();
    }

    /**
     * curl http://127.0.0.1:666/api/test2
     */
    @PostMapping("test2")
    @ApiOperation("test2")
    public User test2(@RequestBody Map<String, String> map) {
        System.out.println(JSONUtil.toJsonStr(map));
        return User.builder()
                .id(1)
                .name("zhengqingya")
                .obj(User.builder().id(2).name("玛卡巴卡a").build())
                .build();
    }

    @Data
    @SuperBuilder
    @NoArgsConstructor
    @AllArgsConstructor
    static class User {
        Integer id;
        String name;
        User obj;
    }

}
```