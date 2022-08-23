class P {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    sayHi() {
        console.log("hi");
    }
}

class UserA extends P {
    // 子类构造函数中需要调用super
    constructor(name: string, age: number) {
        super(name, age)
        this.name = name
        this.age = age
    }
    sayHi() {
        super.sayHi()
        console.log("hi userA ...");
    }
}

const userA = new UserA('小郑', 18)
userA.sayHi()
console.log(userA);