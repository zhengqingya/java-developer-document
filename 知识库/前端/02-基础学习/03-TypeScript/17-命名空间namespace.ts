namespace One {
    export let name: string
}
namespace Two {
    let name: string
}
One.name = 'hi'
console.log(One.name);


namespace Parent {
    export namespace Child {
        export let name: string
    }
}
Parent.Child.name = 'hi'
console.log(Parent.Child.name);
