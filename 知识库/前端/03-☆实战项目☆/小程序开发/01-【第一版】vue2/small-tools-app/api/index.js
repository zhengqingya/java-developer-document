// 拿到所有api
const modulesFiles = import.meta.globEager('./*/*.*')
const modules = {}
for (const key in modulesFiles) {
  const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
  const value = modulesFiles[key]
  if (value.default) {
    // 兼容js
    modules[moduleName] = value.default
  } else {
    // 兼容ts
    modules[moduleName] = value
  }
}
// console.log(666, modules);
export default modules
