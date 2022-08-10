# Vue - 常用rules校验规则

```vue
1、是否合法IP地址
export function validateIP(rule, value,callback) {
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的IP地址'));
    } else {
      callback();
    }
  }
}
2、是否手机号码或者固话
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'));
    } else {
      callback();
    }
  }
}
3、是否固话
export function validateTelphone(rule, value,callback) {
  const reg =/0\d{2,3}-\d{7,8}/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的固定电话）'));
    } else {
      callback();
    }
  }
}
4、是否手机号码
export function validatePhone(rule, value,callback) {
  const reg =/^[1][3-9][0-9]{9}$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
  }
}
5、是否身份证号码
export function validateIdNo(rule, value,callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的身份证号码'));
    } else {
      callback();
    }
  }
}
6、是否邮箱
export function validateEMail(rule, value,callback) {
  const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('请输入正确的邮箱'));
    } else {
      callback();
    }
  }
}
7、合法url
export function validateURL(url) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(url);
}
8、验证内容是否包含英文数字以及下划线
export function isPassword(rule, value, callback) {
  const reg =/^[_a-zA-Z0-9]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  } else {
    if (!reg.test(value)){
      callback(new Error('仅由英文字母，数字以及下划线组成'));
    } else {
      callback();
    }
  }
}
9、自动检验数值的范围
export function checkMax20000(rule, value, callback) {
  if (value == '' || value == undefined || value == null) {
    callback();
  } else if (!Number(value)) {
    callback(new Error('请输入[1,20000]之间的数字'));
  } else if (value < 1 || value > 20000) {
    callback(new Error('请输入[1,20000]之间的数字'));
  } else {
    callback();
  }
}
10、验证数字输入框最大数值
export function checkMaxVal(rule, value,callback) {
  if (value < 0 || value > 最大值) {
    callback(new Error('请输入[0,最大值]之间的数字'));
  } else {
    callback();
  }
}
11、验证是否1-99之间
export function isOneToNinetyNine(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[1-9][0-9]{0,1}$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数，值为【1,99】'));
      } else {
        callback();
      }
    }
  }, 0);
}
12、验证是否整数
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 0);
}
13、验证是否整数,非必填
export function isIntegerNotMust(rule, value, callback) {
  if (!value) {
    callback();
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 1000);
}
14、 验证是否是[0-1]的小数
export function isDecimal(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入[0,1]之间的数字'));
    } else {
      if (value < 0 || value > 1) {
        callback(new Error('请输入[0,1]之间的数字'));
      } else {
        callback();
      }
    }
  }, 100);
}
15、 验证是否是[1-10]的小数,即不可以等于0
export function isBtnOneToTen(rule, value, callback) {
  if (typeof value == 'undefined') {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数，值为[1,10]'));
    } else {
      if (!(value == '1' || value == '2' || value == '3' || value == '4' || value == '5' || value == '6' || value == '7' || value == '8' || value == '9' || value == '10')) {
        callback(new Error('请输入正整数，值为[1,10]'));
      } else {
        callback();
      }
    }
  }, 100);
}
16、验证是否是[1-100]的小数,即不可以等于0
export function isBtnOneToHundred(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入整数，值为[1,100]'));
    } else {
      if (value < 1 || value > 100) {
        callback(new Error('请输入整数，值为[1,100]'));
      } else {
        callback();
      }
    }
  }, 100);
}
17、验证是否是[0-100]的小数
export function isBtnZeroToHundred(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入[1,100]之间的数字'));
    } else {
      if (value < 0 || value > 100) {
        callback(new Error('请输入[1,100]之间的数字'));
      } else {
        callback();
      }
    }
  }, 100);
}
18、验证端口是否在[0,65535]之间
export function isPort(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (value == '' || typeof(value) == undefined) {
      callback(new Error('请输入端口值'));
    } else {
      const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入在[0-65535]之间的端口值'));
      } else {
        callback();
      }
    }
  }, 100);
}
19、验证端口是否在[0,65535]之间，非必填,isMust表示是否必填
export function isCheckPort(rule, value, callback) {
  if (!value) {
    callback();
  }
  setTimeout(() => {
    if (value == '' || typeof(value) == undefined) {
      //callback(new Error('请输入端口值'));
    } else {
      const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入在[0-65535]之间的端口值'));
      } else {
        callback();
      }
    }
  }, 100);
}
20、小写字母
export function validateLowerCase(val) {
  const reg = /^[a-z]+$/;
  return reg.test(val);
}
22、两位小数验证
const validateValidity = (rule, value, callback) => {
  if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)) {
    callback(new Error('最多两位小数！！！'));
  } else {
    callback();
  }
};
23、是否大写字母
export function validateUpperCase(val) {
  const reg = /^[A-Z]+$/;
  return reg.test(val);
}
24、是否大小写字母
export function validatAlphabets(val) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(val);
}
25、密码校验
export const validatePsdReg = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
    callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
  } else {
    callback()
  }
}
26、中文校验
export const validateContacts = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入中文'))
  }
  if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
    callback(new Error('不可输入特殊字符'))
  } else {
    callback()
  }
}
27、身份证校验
export const ID = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('身份证不能为空'))
    }
    if (! /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
      callback(new Error('请输入正确的二代身份证号码'))
    } else {
      callback()
    }
}
28、 账号校验
export const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入账号'))
  }
  if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
    callback(new Error('账号必须为6-20位字母和数字组合'))
  } else {
    callback()
  }
}
29 、纯数字校验
export const validateNumber = (rule, value, callback) => {
    let numberReg = /^\d+$|^\d+[.]?\d+$/
    if (value !== '') {
        if (!numberReg.test(value)) {
            callback(new Error('请输入数字'))
        } else {
            callback()
        }
    } else {
        callback(new Error('请输入值'))
    }
}
30、最多一位小数
const onePoint = (rule, value, callback) => {
  if (!/^[0-9]+([.]{1}[0-9]{1})?$/.test(value)) {
    callback(new Error('最多一位小数！！！'));
  } else {
    callback();
  }
};
使用方法：
在使用地方直接 import 引入，然后在 rules 校验中加入即可。
```
