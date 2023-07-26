package com.zhengqing.demo.api;


import cn.hutool.core.date.DateTime;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.RandomUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;


/**
 * <p> 测试api </p>
 *
 * @author zhengqingya
 * @description
 * @date 2022/9/04 11:00
 */
@Slf4j
@RestController
@RequestMapping("api/bak/")
@Api(tags = "测试api")
public class AppController {

    public static int LOCAL_NUM = 0;


    /**
     * curl http://127.0.0.1:666/api/time?key=666
     */
    @GetMapping("time")
    @ApiOperation("time")
    public Map<String, Object> time(@RequestParam String key) {
        // log.info(".......")    ???
        LOCAL_NUM += 1;
        // 处理业务1...
        this.handleBusiness1();
//        int a = 1 / 0;
        Assert.notBlank(key, "key not blank !");
        // 处理业务2...
        this.handleBusiness2();
        // 处理业务3...
        this.handleBusiness3();
        return new HashMap<String, Object>(3) {{
            this.put("time", DateTime.now().toString());
            this.put("randomNum", RandomUtil.randomLong());
            this.put("obj", new HashMap<String, Object>(2) {{
                this.put("time", DateTime.now().toString());
                this.put("randomNum", RandomUtil.randomLong());
            }});
        }};
    }

    @SneakyThrows(Exception.class)
    private void handleBusiness1() {
        TimeUnit.MICROSECONDS.sleep(0);
    }

    @SneakyThrows(Exception.class)
    private void handleBusiness2() {
        TimeUnit.SECONDS.sleep(0);
    }

    @SneakyThrows(Exception.class)
    private void handleBusiness3() {
        TimeUnit.SECONDS.sleep(0);
    }

}
