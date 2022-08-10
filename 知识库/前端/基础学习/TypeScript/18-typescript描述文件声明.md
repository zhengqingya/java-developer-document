在项目中有一些第三方的js库，虽然可以直接引入使用，但无法使用ts的类型检查等特性功能。
解决：声明文件`.d.ts`

`declare` 保留声明，去掉方法体

```
declare let my_host: string
declare const my_host2: string

declare function sayHi(): void

declare class Cat {
    name: string
}
```

---

网上别人已经写好的声明文件

1. https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
2. https://www.typescriptlang.org/dt/search?search=

![typescript-declare.png](images/typescript-declare.png)