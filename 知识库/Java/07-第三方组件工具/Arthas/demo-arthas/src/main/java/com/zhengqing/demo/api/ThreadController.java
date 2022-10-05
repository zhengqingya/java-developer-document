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
@RequestMapping("api/thread")
@Api(tags = "test-thread")
public class ThreadController {

    /**
     * 模拟死锁
     * curl http://127.0.0.1:666/api/thread/test
     */
    @SneakyThrows
    @GetMapping("test")
    @ApiOperation("test")
    public String test() {
        this.deadThread();
        return "OK";
    }

    /**
     * 死锁
     */
    private void deadThread() {
        // 创建资源
        Object resourceA = new Object();
        Object resourceB = new Object();
        // 创建线程
        Thread threadA = new Thread(() -> {
            synchronized (resourceA) {
                log.info(Thread.currentThread() + " get resourceA");
                try {
                    TimeUnit.SECONDS.sleep(3);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                log.info(Thread.currentThread() + "waiting get resourceB");
                synchronized (resourceB) {
                    log.info(Thread.currentThread() + " get resourceB");
                }
            }
        });
        Thread threadB = new Thread(() -> {
            synchronized (resourceB) {
                log.info(Thread.currentThread() + " get resourceB");
                try {
                    TimeUnit.SECONDS.sleep(3);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                log.info(Thread.currentThread() + "waiting get resourceA");
                synchronized (resourceA) {
                    log.info(Thread.currentThread() + " get resourceA");
                }
            }
        });
        threadA.start();
        threadB.start();
    }

}
