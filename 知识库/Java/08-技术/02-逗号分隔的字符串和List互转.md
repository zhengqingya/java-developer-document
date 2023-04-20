# 逗号分隔的字符串和List互转

#### 将逗号分隔的字符串转换为List

```
// 字符型
String str = "a,b,c";
List<String> strList = Arrays.asList(str.split(","));
System.out.println(strList); // [a, b, c]

// 数字型
String ids = "1,2,3,4,5,6";
List<Long> idList = Arrays.stream(ids.split(",")).map(s -> Long.parseLong(s.trim())).collect(Collectors.toList());
System.out.println(Arrays.toString(idList.toArray())); // [1, 2, 3, 4, 5, 6]
```

#### 将List转换为逗号分隔的字符串

```
List<Integer> numList = Lists.newArrayList(1, 2, 3, 4, 5, 6);
String numStr = Joiner.on(",").join(numList);
System.out.println(numStr); // 1,2,3,4,5,6

// 1、利用Guava的Joiner
List<String> list = Lists.newArrayList("a", "b", "c");
String str1 = Joiner.on(",").join(list);
System.out.println(str1); // a,b,c

// 2、利用Apache Commons的StringUtils
String str2 = org.apache.commons.lang3.StringUtils.join(list.toArray(), ",");
System.out.println(str2); // a,b,c

// 3、java8
String str3 = list.stream().collect(Collectors.joining(","));
System.out.println(str3); // a,b,c

// 4、
String str4 = String.join(",", list);
System.out.println(str4); // a,b,c
```