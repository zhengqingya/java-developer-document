class User {
    // 公共属性
    public _name: string
    // 私有属性
    private _age: number
    // 当前类和子类才能访问
    // protected _sex: number

    constructor(name: string, age: number) {
        this._name = name
        this._age = age
    }

    // setAge(age: number) {
    //     this._age = age
    // }
    // getAge() {
    //     return this._age
    // }

    get age() {
        return this.age
    }
    set age(age: number) {
        this._age = age
    }

}

const user = new User('小郑', 18)
user._name = 'hhh'
// user.setAge(11)
user.age = 11
console.log(user);



class Simple {
    constructor(public name: string) { }
}

const s = new Simple('hhh')
console.log(s);
