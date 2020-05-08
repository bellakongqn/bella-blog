---
title: 原型与原型链
date: 2020-05-08 10:56:00
tags:
    - js
categories: js
---

### 原型与原型链->崩溃的我
在我哥的帮助下和我自己的努力哈哈哈哈哈哈哈,终于恍然大明白哈哈哈哈哈哈哈哈哈

### 构造函数&实例
> 构造函数：即是函数的本身，是函数的一个用法，可以通过 new 关键字来创建对象。
>实例：通过 new 和构造函数创建的对象就是实例。通过\_\_proto\_\_指向原型 prototype，通过 constructor 指向构造函数。

```
function Animal(name){
    this.name = name
}

const animal1 = new Anilmal('小汪🐶')
```
Animal 方法就是构造函数，animal1 就是一个实例。
<!-- more -->
### prototype&\_\_proto\_\_
prototype 就是原型->（做月饼的模子）
prototype 是函数特有的属性，普通对象没有
```
var a = {}
function b () {}

console.log(a.prototype) // undefined
console.log(b.prototype) // { constructor: ƒ }
```

#### prototype 用处
多个实例之间共享属性-> 通过构造函数的prototype
```
function Animal(name){
    this.name = name
}

// 构造函数的原型prototype 属性 home
Animal.prototype.home = 'love house'

const animal1 = new Animal('小汪🐶')
const animal2 =  new Animal('小孔🐰')

// 两个实例都继承了原型中的home 属性
console.log(animal1.home) // love house
console.log(animal2.home) // love house
```
#### what is \_\_proto\_\_?
多个实例间共享属性->共享原理->\_\_proto\_\_
通过构造函数创造出来的每个实例都有一个\_\_proto\_\_指针指向构造函数原型prototype
```
function Animal(){}

Animal.prototype.home = 'love house'

const animal1 = new Animal('小汪🐶')

console.log(Animal.prototype) // { home: 'love house', constructor: ƒ }
console.log(animal1.__proto__) // { home: 'love house', constructor: ƒ }
console.log(Animal.prototype === animal1.__proto__) // true
```
### cpnstructor
原型中的 constructor 指向构造函数，谁创造这个实例的，那么这个实例的 constructor 就是谁

实例.\_\_proto\_\_ === 构造函数.prototype
prototype.constructor =  构造函数
原型 === 构造函数.prototype
实例.constructor = 构造函数
```
function a () {}
var b = new a()
console.log(b.constructor) // ƒ a () {}
console.log(b.__proto__.constructor) // ƒ a () {}
console.log(b.constructor === a) // true
```
### 原型链
> 原型链 顾名思义就是由多个原型对象组成。每个原型对象都有 __proto__ 属性并指向创建该原型对象的构造函数 prototype 原型，多个原型之间通过 __proto__ 连接形成原型链，这就是JavaScript实现继承和共享属性的方式。

```
function Animal(){}
Animal.prototype.home = 'love house'
Animal.prototype.sing = function(){
    console.log(`can sing in ${this.home}`)
}

// Dog
function Dog(){}
Dog.prototype = new Animal()
Dog.prototype.category = 'Dog'
Dog.prototype.bar = function(){
    console.log(`${this.category} can 汪汪汪`)
}

const dog1 = new Dog()
console.log(dog1.home) // love house
dog1.sing() // can sing in love house
dog1.bar() // Dog can 汪汪汪
```
打印dog1实例
![](/assets/prototype.png)
可以看出dog1 的结构
\_\_proto\_\_ 内部又有 \_\_proto\_\_
第一层的 \_\_proto\_\_ 实际上是 Dog 的 prototype
再继续下去一层是 Animal 的 prototype
到了最底层就是 Object，这个说明了"Object 是原型链的最顶层原型对象"

#### Dog 继承 Animal 的时候发生了什么
```
// 继承Animal
// Dog.prototype = new Animal()

// JavaScript干了下面这些事
Dog.prototype = {}
Dog.prototype.__proto__ = Animal.prototype
Animal.apply(Dog.prototype)
```
#### 继承前后Dog的原型链
![](/assets/before&after.png)
继承前，Dog的原型链是 Dog — Object的，继承之后就变成了 Dog — Animal — Object
```
Dog.prototype.__proto__ === Animal.prototype
Animal.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null
```
> 原型链的属性查找机制：当查找对象的属性时，如果在对象中找不到该属性时，会沿着该对象的原型链上的原型继续寻找，即对象的 \_\_proto\_\_ 和 构造函数的 prototype，若在原型链中的某一处原型找到则会返回该属性并停止寻找，若直到原型链的最顶层的原型对象 Object.prototype 都找不到则返回 null

### 判断实例的类型
> 在创建实例之后，通过 instanceof 来判断类型的时，若右侧的类型在该实例的原型链上存在，判断的结果都会是 true，所以在使用 instanceof 来判断类型时要注意一下

```
function Animal(){}
function Dog(){}
Dog.prototype = new Animal()

let animal1 = new Animal()
let dog1 = new Dog()

console.log(animal1 instanceof Animal)// true
console.log(animal1 instanceof Dog) // false
console.log(animal1 instanceof Object) // true
console.log(dog1 instanceof Animal) // true
console.log(dog1 instanceof Dog) // true
console.log(dog1 instanceof Object) // true
```

参考博客：
[https://juejin.im/post/5de488aa6fb9a0718f68c2f1](https://juejin.im/post/5de488aa6fb9a0718f68c2f1)
[https://juejin.im/post/5de9ba966fb9a0164f29354c](https://juejin.im/post/5de9ba966fb9a0164f29354c)