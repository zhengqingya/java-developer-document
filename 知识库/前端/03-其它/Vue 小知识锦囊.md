# Vue 小知识锦囊

### vscode运行本地环境时 窗口自动打开 -> 在`package.json`中配置` --open`

ex:

```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "dev": "vue-cli-service serve --mode development --open"
}
```

### 数组转字符串 以 `,` 分割

```javascript
数组.join(',')
``` 

### 字符串转数字

```javascript
this.roleId = parseInt(this.roleId);// 转换成数字类型
```

### vue定时器 - setInterval()方法

> 在mounted()函数里边使用setInterval(),qqLogin()这个方法在methods里边写，在mounted钩子函数里边调用就可以，刚开始先调用一遍，加载。然后使用setInterval()
> ,第一个参数，调用方法的时候，不加括号，第二个参数是时间。

```javascript
export default {
    mounted() {
      // 定时器
      setInterval(this.qqLogin, 3000);
    },
    methods: {
      qqLogin(){
         // ...
      }
    }
}
```

### vue设置定时器，页面离开时清除定时器

```javascript
export default {
      data() {
          return {
             timer: null  // 定时器名称  
          }
      },
      destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
          // 通过$once来监听定时器
          // 在beforeDestroy钩子触发时清除定时器
          this.$once('hook:beforeDestroy', () => {
              clearInterval(this.timer);
          })
      },
      mounted() {
          // 定时器
          this.timer = setInterval(this.qqLogin, 3000);
      },
      methods: {
         qqLogin(){
             // ...
         }
      }
}
```

### 监听选择栏或状态栏是否改变，改变的触发事件

```html

<el-form-item label="当前城市:" prop="currentCity">
    <template>
        <el-radio v-model="currentCity" label="1" @change="handleCurrentCityChange(1)">是</el-radio>
        <el-radio v-model="currentCity" label="0" @change="handleCurrentCityChange(0)">否</el-radio>
    </template>
</el-form-item>


// 监听当前城市是否改变
handleCurrentCityChange(type) {
alert(type)
},
```

### js拷贝对象数据

```html
this.form = Object.assign({}, {}); // 清空

this.form = Object.assign({}, row);// 拷贝row中属性名与前者form数组中属性名相同值到form中
```

### 格式化时间

1. 单页面使用

```javascript
import moment from 'moment'

export default {
 methods: {
   test(){
       this.form.deadline = moment(data.deadline).format('YYYY-MM-DD HH:mm')
   }
 }
}
```

2. 全局使用

```javascript
//  src/filters/index.js 中
import moment from 'moment'

/**
 * 年月日
 * @param {str} data
 */
export const dateFilter = (data) => {
  if (data !== null) {
    return moment(data).format('YYYY-MM-DD')
  } else {
    return ''
  }
}
export const calendarFilter = (data) => {
  if (data !== null) {
    return moment(data).format('D')
  } else {
    return ''
  }
}
export const monthFilter = (data) => {
  if (data !== null) {
    return moment(data).format('YYYY年MM月')
  } else {
    return ''
  }
}
export const yearFilter = (data) => {
  if (data !== null) {
    return moment(data).format('YYYY')
  } else {
    return ''
  }
}
export const seasonFilter = (data) => {
  if (data) {
    let season = ''
    switch (data) {
      case '1':
        season = '一'
        break
      case '2':
        season = '二'
        break
      case '3':
        season = '三'
        break
      case '4':
        season = '四'
        break
      default:
        season = '无'
        break
    }
    return season
  } else {
    return ''
  }
}
/**
 * 年月日时分秒
 * @param {str} data
 */
export const dateTimeFilter = (data) => {
  if (data !== null) {
    return moment(data).format('YYYY-MM-DD HH:mm')
  } else {
    return ''
  }
}
```

### 时间组date[]

```html

<el-date-picker
        style="width:218px"
        v-model="listQuery.date"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
/>
```

### vue.js a标签href里变量，函数拼接问题

```html

<el-table-column label="附件" prop="attach" align="center">
    <template slot-scope="scope">
      <span v-for="(value, key, index) in scope.row.attachList">
        <a style="color:#20a0ff" :href="value.fileUrl" target="_blank">{{ value.fileName }}, </a>
      </span>
    </template>
</el-table-column>
```

### vue 移除数组指定元素

```javascript
this.list.splice(this.list.indexOf(id),1); // id为list中对象的id字段值
```

### js 排序

```
function sortValue(a, b) {
    return a.value - b.value;
}
export default {
    methods: {
        async getSandSaleAnalysis() {
            let res = await this.$_server["statistics-sand-sale-analysis"](this.queryParams);
            this.sandSaleAnalysisInfo = res;
            this.sandSaleAnalysisInfo.productSaleStaticItemList = this.sandSaleAnalysisInfo.productSaleStaticItemList.sort(sortValue);
        }
    }
}
```
