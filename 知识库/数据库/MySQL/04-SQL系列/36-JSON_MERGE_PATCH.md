# JSON_MERGE_PATCH

`JSON_MERGE_PATCH` 是一个用于合并 JSON 对象的函数，通常用于更新 JSON 文档。
它根据 JSON Merge Patch 标准（RFC 7396）来合并两个 JSON 对象。

下面是一些使用 `JSON_MERGE_PATCH` 的例子。

### 示例 1: 基本合并

假设我们有两个 JSON 对象，一个原始对象和一个补丁对象，我们希望将补丁应用到原始对象上。

**原始 JSON 对象:**
```json
{
  "name": "Alice",
  "age": 30,
  "address": {
    "city": "Wonderland",
    "zipcode": "12345"
  }
}
```

**补丁 JSON 对象:**
```json
{
  "age": 31,
  "address": {
    "city": "New Wonderland"
  },
  "email": "alice@example.com"
}
```

**合并后的 JSON 对象:**
```json
{
  "name": "Alice",
  "age": 31,
  "address": {
    "city": "New Wonderland",
    "zipcode": "12345"
  },
  "email": "alice@example.com"
}
```

### 示例 2: 删除字段
如果补丁对象中的某个字段值为 `null`，则该字段将从目标 JSON 对象中删除。

**原始 JSON 对象:**
```json
{
  "name": "Bob",
  "age": 25,
  "email": "bob@example.com"
}
```


**补丁 JSON 对象:**
```json
{
  "age": null
}
```


**合并后的 JSON 对象:**
```json
{
  "name": "Bob",
  "email": "bob@example.com"
}
```


### 示例 3: 数组合并
`JSON_MERGE_PATCH` 不会合并数组，而是直接替换数组。

**原始 JSON 对象:**
```json
{
  "name": "Charlie",
  "hobbies": ["reading", "swimming"]
}
```


**补丁 JSON 对象:**
```json
{
  "hobbies": ["cycling", "hiking"]
}
```


**合并后的 JSON 对象:**
```json
{
  "name": "Charlie",
  "hobbies": ["cycling", "hiking"]
}
```


### SQL 示例
假设我们有一个表 `users`，其中有一列 `profile` 存储 JSON 数据。我们想更新某个用户的 `profile` 列。

**原始表数据:**
```sql
SELECT * FROM users WHERE id = 1;
```
```json
{
  "name": "David",
  "age": 40,
  "address": {
    "city": "Somewhere",
    "zipcode": "67890"
  }
}
```


**补丁 JSON 对象:**
```json
{
  "age": 41,
  "address": {
    "city": "Anywhere"
  },
  "email": "david@example.com"
}
```


**SQL 更新语句:**
```sql
UPDATE users
SET profile = JSON_MERGE_PATCH(profile, '{"age": 41, "address": {"city": "Anywhere"}, "email": "david@example.com"}')
WHERE id = 1;
```


**更新后的表数据:**
```json
{
  "name": "David",
  "age": 41,
  "address": {
    "city": "Anywhere",
    "zipcode": "67890"
  },
  "email": "david@example.com"
}
```


通过这些例子，你可以看到 `JSON_MERGE_PATCH` 是如何用于合并和更新 JSON 数据的。

