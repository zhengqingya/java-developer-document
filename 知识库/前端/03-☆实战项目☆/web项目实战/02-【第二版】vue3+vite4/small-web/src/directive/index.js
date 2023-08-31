// export { hasPerm, hasRole } from './btn-perm.js';

// 拿到当前目录下所有指令数据
const modulesFiles = import.meta.globEager('./*.js');
const result = {};
for (const fileKey in modulesFiles) {
  const value = modulesFiles[fileKey];
  Object.keys(value).forEach((key) => {
    result[key] = value[key];
  });
}
// console.log(666, result);
export default result;
