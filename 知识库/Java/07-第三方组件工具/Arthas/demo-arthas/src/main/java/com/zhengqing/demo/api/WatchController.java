package com.zhengqing.demo.api;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


/**
 * <p> 测试api </p>
 *
 * @author zhengqingya
 * @description
 * @date 2022/9/04 18:30
 */
@Slf4j
@RestController
@RequestMapping("api/watch")
@Api(tags = "test-watch")
public class WatchController {


    /**
     * curl http://127.0.0.1:666/api/watch/test
     */
    @GetMapping("test")
    @ApiOperation("test")
    public String test() {
        return "66";
    }

    /**
     * Arthas: 监听方法的执行情况  ex: 入参、返回值
     * curl http://127.0.0.1:666/api/watch/test1
     */
    @GetMapping("test1")
    @ApiOperation("test1")
    public User test1(String str) {
//        log.info("请求参数：{}", str);
        return User.builder()
                .id(1)
                .name("zhengqingya")
                .obj(User.builder().id(2).name("玛卡巴卡").build())
                .build();
    }

    /**
     * curl http://127.0.0.1:666/api/watch/test2
     */
    @PostMapping("test2")
    @ApiOperation("test2")
    public User test2(@RequestBody Map<String, String> map) {
//        log.info("请求参数：{}", JSONUtil.toJsonStr(map));
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
