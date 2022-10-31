class Person {
    name: string = '小郑'
    age = 18
    static sex: number = 1
    // 只读属性 => 无法修改
    readonly password: number = 123456
    // 静态只读属性
    static readonly password2: number = 123456

    // 实例方法
    sayHi() {
        console.log('hi');
    }

    // 静态方法
    static sayHi() {
        console.log('hhh');
    }
}

const person = new Person()

console.log(person);
person.name = '修改了...';
console.log(person.name);
// person.password = 666;
console.log(person.password);
// console.log(person.sex);
console.log(Person.password2);
console.log(person.sayHi);
console.log(Person.sayHi);