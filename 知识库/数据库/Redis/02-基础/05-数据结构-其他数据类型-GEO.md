# Redis - 其他数据类型

## GEO：地理信息定位，使用有序集合实现

使用场景：求最近的附近人

```shell
# 添加地理位置的坐标
geoadd Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
# 获取地理位置的坐标
geopos Sicily Palermo Catania NonExisting
# 计算两个位置之间的距离
geodist Sicily Palermo Catania
# 根据用户给定的经纬度坐标来获取指定范围内的地理位置集合
georadius Sicily 15 37 200 km
# 根据储存在位置集合里面的某个地点获取指定范围内的地理位置集合
georadiusbymember Sicily Palermo 100 km
# 返回一个或多个位置对象的 geohash 值
geohash Sicily Palermo Catania
```
