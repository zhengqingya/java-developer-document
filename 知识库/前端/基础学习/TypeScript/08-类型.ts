// boolean
let a: boolean = true
// a = "1"
console.log(a);


// string
let b: string
b = "1"
console.log(b);


// number
let c: number
c = 1
console.log(c);


// 字面量进行类型声明
let d: 1
d = 1
console.log(d);
// | 标识多个类型
let dd: boolean | string
dd = true
dd = "true666"
console.log(dd);


// any：任意类型
let e: any
let ee // 隐式的any
e = true
e = 1
e = "666"
console.log(e);


// unknown：未知类型
let f: unknown
f = true
f = 1
f = "666"
console.log(f);


// any和unknown区别
let s: string
s = e // any类型可赋值给任意变量
// s = f // unknown则会报错  => 一个类型安全的any

// 解决unknown提示问题
// 法1：
if (typeof f === 'string') {
    s = f
}
// 法2：类型断言：告诉编译器变量的实际类型
s = f as string // 语法1
s = <string>f   // 语法2
console.log(s);


function fn(): number | string {
    return 11
}
// void：无返回值
function fn2(): void { }
// never：表示永远不会返回结果
function fn3(): never {
    throw new Error('报错了...')
}


// object：表示一个js对象
let g: object
g = {}
g = function () { }
console.log(g);
/**
 * {}：指定对象中可以包含哪些属性     
 * {属性名1:属性值1,属性名2:属性值2 ...}
 * 属性名后面加上? 表示该属性是可选的
 */
let gg: { name: string, age?: number }
gg = { name: '小郑', age: 1 }
gg = { name: '小郑' }
console.log(gg);
let ggg: { name: string, [propName: string]: any } // [propName: string]: any  =>  任意类型的属性
ggg = { name: '小郑', age: 1, sex: '男' }
console.log(ggg);

// 定义函数类型
let gggg: (a: number, b: number) => number
gggg = function (p1, p2): number {
    return p1 + p2
}


// array
let h: string[] // 语法1
let hh: number[]
let hhh: Array<number> // 语法2
h = ['a', 'b']
console.log(h);


// 元组：固定长度的数组
let i: [string, string]
i = ['a', 'c']
console.log(i);


// 枚举
enum Sex {
    man = 0,
    men = 1
}
// let j: { name: string, sex: 0 | 1 | 2 }
let j: { name: string, sex: Sex }
j = {
    name: '小郑',
    sex: Sex.man
}
console.log(j);
console.log(j.sex === Sex.man);


// &：表示同时满足条件
let k: { name: string } & { age: number }
k = { name: '小郑', age: 18 }


// 类型别名 => 简化类型的使用
// type myType = string
type myType = 1 | 2 | 3
let l: 1 | 2 | 3
let m: myType