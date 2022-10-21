# Redis - 其他数据类型

## HyperLogLog：基数统计，超小内存唯一值计数，本质是string

使用场景：计算日活、7日活、月活数据

```shell
# 添加任意元素，有变化返回1，无变化返回0
pfadd ip_zq1 "192.168.0.1" "192.168.0.2" "192.168.0.3"
pfadd ip_zq2 "192.168.0.1" "192.168.0.2" "192.168.0.5"
# 查看元素个数
pfcount ip_zq1
# 查看元素总的不重复个数
pfcount ip_zq1 ip_zq2
# 合并ip_zq1和ip_zq2到ip_zq3中
pfmerge ip_zq3 ip_zq1 ip_zq2
```
