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
