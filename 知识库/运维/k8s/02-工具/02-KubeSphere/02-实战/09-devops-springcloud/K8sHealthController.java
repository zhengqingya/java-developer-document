package com.zhengqing.common.web.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * <p> 容器探针接口 </p>
 *
 * @author zhengqingya
 * @description 探测服务是否注册进入注册中心 => k8s健康检查使用
 * @date 2022/11/11 11:50
 */
@Slf4j
@RestController
@RequestMapping("nacos")
@RequiredArgsConstructor
public class K8sHealthController {
    private final DiscoveryClient discoveryClient;

    @Value("${spring.application.name}")
    private String serviceName;

    /**
     * http://localhost:端口/nacos/health
     */
    @GetMapping("health")
    public ResponseEntity<Object> health() {
        List<ServiceInstance> instanceList = this.discoveryClient.getInstances(this.serviceName);
        Map<String, Integer> ipMap = instanceList.stream()
                .collect(Collectors.toMap(
                        ServiceInstance::getHost,
                        ServiceInstance::getPort,
                        (oldData, newData) -> newData
                ));
        // 获取本机IP地址
        String hostAddress = "127.0.0.1";
        try {
            InetAddress localHost = InetAddress.getLocalHost();
            hostAddress = localHost.getHostAddress();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        // 查看本机服务是否已经注册到nacos中
        if (ipMap.containsKey(hostAddress)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}