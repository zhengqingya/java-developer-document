// 抽象类，无法new
abstract class AbsParent {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    // 抽象方法
    abstract sayHi(): void
}

class AbsChild extends AbsParent {
    sayHi() {
        console.log("hi child ...");
    }
}

const absChild = new AbsChild('小郑', 18)
absChild.sayHi()