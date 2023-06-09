在运行 https://gitee.com/jeequan/jeepay-ui 项目时遇到如下问题：

> 以 `jeepay-ui-manager` 运营平台为例

```shell
D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager>npm i
npm ERR! code 1
npm ERR! path D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager\node_modules\deasync
npm ERR! command failed
npm ERR! command C:\Windows\system32\cmd.exe /d /s /c node ./build.js
npm ERR! gyp info it worked if it ends with ok
npm ERR! gyp info using node-gyp@9.1.0
npm ERR! gyp info using node@16.18.0 | win32 | x64
npm ERR! gyp info find Python using Python version 3.10.6 found at "D:\zhengqingya\soft\soft-dev\Python\Python310\python3.exe"
npm ERR! gyp http GET https://nodejs.org/download/release/v16.18.0/node-v16.18.0-headers.tar.gz
npm ERR! gyp http 200 https://nodejs.org/download/release/v16.18.0/node-v16.18.0-headers.tar.gz
npm ERR! gyp http GET https://nodejs.org/download/release/v16.18.0/SHASUMS256.txt
npm ERR! gyp http GET https://nodejs.org/download/release/v16.18.0/win-x86/node.lib
npm ERR! gyp http GET https://nodejs.org/download/release/v16.18.0/win-x64/node.lib
npm ERR! gyp http GET https://nodejs.org/download/release/v16.18.0/win-arm64/node.lib
npm ERR! gyp http 200 https://nodejs.org/download/release/v16.18.0/SHASUMS256.txt
npm ERR! gyp http 200 https://nodejs.org/download/release/v16.18.0/win-x64/node.lib
npm ERR! gyp http 200 https://nodejs.org/download/release/v16.18.0/win-x86/node.lib
npm ERR! gyp http 404 https://nodejs.org/download/release/v16.18.0/win-arm64/node.lib
npm ERR! gyp ERR! find VS
npm ERR! gyp ERR! find VS msvs_version not set from command line or npm config
npm ERR! gyp ERR! find VS VCINSTALLDIR not set, not running in VS Command Prompt
npm ERR! gyp ERR! find VS could not use PowerShell to find Visual Studio 2017 or newer, try re-running with '--loglevel silly' for more details
npm ERR! gyp ERR! find VS looking for Visual Studio 2015
npm ERR! gyp ERR! find VS - not found
npm ERR! gyp ERR! find VS not looking for VS2013 as it is only supported up to Node.js 8
npm ERR! gyp ERR! find VS
npm ERR! gyp ERR! find VS **************************************************************
npm ERR! gyp ERR! find VS You need to install the latest version of Visual Studio
npm ERR! gyp ERR! find VS including the "Desktop development with C++" workload.
npm ERR! gyp ERR! find VS For more information consult the documentation at:
npm ERR! gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
npm ERR! gyp ERR! find VS **************************************************************
npm ERR! gyp ERR! find VS
npm ERR! gyp ERR! configure error
npm ERR! gyp ERR! stack Error: Could not find any Visual Studio installation to use
npm ERR! gyp ERR! stack     at VisualStudioFinder.fail (D:\zhengqingya\soft\soft-dev\nvm\v16.18.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:122:47)
npm ERR! gyp ERR! stack     at D:\zhengqingya\soft\soft-dev\nvm\v16.18.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:75:16
npm ERR! gyp ERR! stack     at VisualStudioFinder.findVisualStudio2013 (D:\zhengqingya\soft\soft-dev\nvm\v16.18.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:364:14)
npm ERR! gyp ERR! stack     at D:\zhengqingya\soft\soft-dev\nvm\v16.18.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:71:14
npm ERR! gyp ERR! stack     at D:\zhengqingya\soft\soft-dev\nvm\v16.18.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:385:16
npm ERR! gyp ERR! stack     at D:\zhengqingya\soft\soft-dev\nvm\v16.18.0\node_modules\npm\node_modules\node-gyp\lib\util.js:54:7
npm ERR! gyp ERR! stack     at D:\zhengqingya\soft\soft-dev\nvm\v16.18.0\node_modules\npm\node_modules\node-gyp\lib\util.js:33:16
npm ERR! gyp ERR! stack     at ChildProcess.exithandler (node:child_process:410:5)
npm ERR! gyp ERR! stack     at ChildProcess.emit (node:events:513:28)
npm ERR! gyp ERR! stack     at maybeClose (node:internal/child_process:1100:16)
npm ERR! gyp ERR! System Windows_NT 10.0.18363
npm ERR! gyp ERR! command "D:\\zhengqingya\\soft\\soft-dev\\nodejs\\node.exe" "D:\\zhengqingya\\soft\\soft-dev\\nvm\\v16.18.0\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
npm ERR! gyp ERR! cwd D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager\node_modules\deasync
npm ERR! gyp ERR! node -v v16.18.0
npm ERR! gyp ERR! node-gyp -v v9.1.0
npm ERR! gyp ERR! not ok
npm ERR! Build failed

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\zhengqingya\AppData\Local\npm-cache\_logs\2023-06-08T08_54_09_485Z-debug-0.log
```

解决：node换成14版本

```shell
nvm install 14.21.3
nvm use 14

npm install cnpm@7.1.0 -g --registry=https://registry.npm.taobao.org
cnpm i
cnpm run serve
```

运行时候又遇到问题

```shell
D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager>cnpm run serve

> jeepay-ui-manager@1.10.0 serve D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager
> vue-cli-service serve

 ERROR  Error loading D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager\vue.config.js:
 ERROR  ValidationError: Invalid options object. Ignore Plugin has been initialized using an options object that does not match the API schema.
 - options should be one of these:
   object { resourceRegExp, contextRegExp? } | object { checkResource }
   Details:
    * options misses the property 'resourceRegExp'. Should be:
      RegExp
      -> A RegExp to test the request against.
    * options misses the property 'checkResource'. Should be:
      function
      -> A filter function for resource and context.
ValidationError: Invalid options object. Ignore Plugin has been initialized using an options object that does not match the API schema.
 - options should be one of these:
   object { resourceRegExp, contextRegExp? } | object { checkResource }
   Details:
    * options misses the property 'resourceRegExp'. Should be:
      RegExp
      -> A RegExp to test the request against.
    * options misses the property 'checkResource'. Should be:
      function
      -> A filter function for resource and context.
    at validate (D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager\node_modules\_schema-utils@3.2.0@schema-utils\dist\validate.js:141:11)
    at D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager\node_modules\_webpack@5.86.0@webpack\lib\util\create-schema-validation.js:16:17
    at new IgnorePlugin (D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager\node_modules\_webpack@5.86.0@webpack\lib\IgnorePlugin.js:28:3)
    at Object.<anonymous> (D:\zhengqingya\code\workspace-other\jeepay-ui\jeepay-ui-manager\vue.config.js:28:7)
    at Module._compile (internal/modules/cjs/loader.js:1114:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)
    at Module.load (internal/modules/cjs/loader.js:979:32)
    at Function.Module._load (internal/modules/cjs/loader.js:819:12)
    at Module.require (internal/modules/cjs/loader.js:1003:19)
    at require (internal/modules/cjs/helpers.js:107:18)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! jeepay-ui-manager@1.10.0 serve: `vue-cli-service serve`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the jeepay-ui-manager@1.10.0 serve script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\zhengqingya\AppData\Roaming\npm-cache\_logs\2023-06-08T09_47_13_900Z-debug.log
```

解决： 修改`vue.config.js`配置

将其中的

```shell
plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require("./package.json").version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate,
      }),
],
```

修改为

```shell
plugins: [
      // Ignore all locale files of moment.js
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      // new webpack.DefinePlugin({
      //   APP_VERSION: `"${require("./package.json").version}"`,
      //   GIT_HASH: JSON.stringify(getGitHash()),
      //   BUILD_DATE: buildDate,
      // }),
],
```
