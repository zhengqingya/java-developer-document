package com.zhengqing.demo.api;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;


/**
 * <p> 测试api </p>
 *
 * @author zhengqingya
 * @description
 * @date 2022/9/04 18:30
 */
@Slf4j
@RestController
@RequestMapping("api/profiler")
@Api(tags = "test-profiler")
public class ProfilerController {

    /**
     * curl http://127.0.0.1:666/api/profiler/test
     */
    @GetMapping("test")
    @ApiOperation("test")
    public String test() {
//        this.handleData();
        while (true) {
            System.out.println("666");
        }
//        return "66";
    }

    private void handleData() {
        new Thread(() -> {
            System.out.println("线程1...");
            this.handleDataBase();
        }, "线程1").start();
    }

    @SneakyThrows
    private void handleDataBase() {
        // 睡3秒
        TimeUnit.SECONDS.sleep(3);
    }

}
