interface myInterface {
    name: string
    age: number
}

/**
 * 接口中的所有属性都不能有实际值
 * 接口只是定义对象结构’
 * 所有方法都是抽象方法
 */
interface myInterface {
    sex: number
    sayHi(): void
}

const obj: myInterface = {
    name: 'aoo',
    age: 18,
    sex: 1,
    sayHi() { }
}

class MyInterfaceClass implements myInterface {
    name: string
    age: number
    sex: number
    constructor(name: string, age: number, sex: number) {
        this.name = name
        this.age = age
        this.sex = sex
    }
    sayHi() {
        console.log('hi');

    }

}