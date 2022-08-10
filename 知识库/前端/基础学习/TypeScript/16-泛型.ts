// function fn(a: any): any {
//     return a
// }

function fn<T>(a: T): T {
    return a
}

let result1 = fn(666) // 不指定泛型则自行判断
let result2 = fn<string>('hi') // 指定泛型


// 指定多个
function fn2<T, K>(a: T, b: K): T {
    return a
}


interface Inter {
    length: number
}
// 需为Inter子类
function fn3<T extends Inter>(a: T): T {
    return a
}
// fn3(666)
fn3("666") // 需有length属性
fn3({ length: 11 })


class MyC<T>{
    name: T
    constructor(name: T) {
        this.name = name
    }
}
const m = new MyC<string>('hi')