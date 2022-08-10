// (function () {

class Animal {
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

class Dog extends Animal {
    sayHi() {
        console.log("hi dog ...");
    }
    eat() {
        console.log("eat dog ...");
    }
}

const dog = new Dog('小狗', 18)
dog.sayHi()
dog.eat()
console.log(dog);

// })