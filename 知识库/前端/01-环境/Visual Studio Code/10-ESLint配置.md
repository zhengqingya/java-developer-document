目的：代码在保存或者代码变动的时候自动进行ESLint的fix过程

1. 安装`ESLint`插件
2. `文件` -> `首选项` -> `设置` -> `settings.json`配置

```json
{
  // 是否开启vscode的eslint
  "eslint.enable": true,
  // 是否在保存的时候自动fix eslint
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    // 指定vscode的eslint所处理的文件的后缀
    "extensions": [
      ".js",
      ".vue",
      ".ts",
      ".tsx"
    ]
  },
  // 确定校验准则
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```