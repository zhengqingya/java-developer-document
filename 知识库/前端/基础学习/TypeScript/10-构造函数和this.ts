class User {
    name: string
    age: number

    // 构造函数，对象创建时调用
    constructor(name: string, age: number) {
        console.log("xx:", this);
        this.name = name
        this.age = age
    }

    sayHi() {
        console.log("hi");
    }

}

const user = new User('小郑', 18)
user.sayHi()
console.log(user);