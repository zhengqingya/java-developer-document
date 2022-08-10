# Java - json字符串、json对象互转

```
// json字符串转list对象
List<FileDTO> fileList = JSONObject.parseArray(jsonStr, FileDTO.class);

// list对象转json字符串
String jsonStr = JSON.toJSONString(fileList)

// json对象转java对象
SandAnalysisResponseDTO.SaleStaticInfo saleStaticInfo = JSONObject.parseObject(JSON.toJSONString(saleStaticInfoMap.get("result")), SandAnalysisResponseDTO.SaleStaticInfo.class);

// map-value list对象数据 转 list java对象
List<SandSaleInfoResponseDTO.SandSaleItem> result = JSONArray.parseArray(JSON.toJSONString(map.get("result")), SandSaleInfoResponseDTO.SandSaleItem.class);

// java对象转json字符串
String diffTextJson = JSONObject.toJSONString(diffTextInfoObject);

// json字符串转java对象
DiffTextInfoBO diffTextInfoBO = JSON.parseObject(diffTextJson, DiffTextInfoBO.class);
```
