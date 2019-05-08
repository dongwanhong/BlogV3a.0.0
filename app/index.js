import './styles/app.less'

function sayName (target) {
    console.log(target.name);
}

@sayName
class TestClass {
    constructor() {
        console.log('Hello world!')
    }
}

new TestClass()
