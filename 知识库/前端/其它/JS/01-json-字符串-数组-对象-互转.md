### json对象或数组 转 字符串

```
let data = {"name":"test"}
JSON.stringify(data);
```

### json单对象 转 数组

```
let json = {"name":"test","age":"18"};
console.log(Object.values(json)) // ["test","18"]
```

### 字符串 转 json对象

```
let data = '{"name":"test"}'
console.log(JSON.parse(data))
```

### 数组 转 字符串

```
let arr = [1,2,3,4];
let str = arr.join();
```

### 字符串 转 数组

```
let str = '1,2,3,4';
let arr = str.split(',');
console.log(arr)
```

### 将对象数组中的某属性值转换成逗号分隔的字符串

```
let list=[
    {id: "1",  name: "java"},
    {id: "2",  name: "go"}
];
// let str = list.map((obj) => {return obj.name}).join(",");
let str = list.map((obj) => obj.name).join(",");
console.log(str) // java,go
```
