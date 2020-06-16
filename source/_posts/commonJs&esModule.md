---
title: ES6模块和CommonJS模块有哪些差异
date: 2020-06-16 14:00:21
tags:
    - js
categories: js
---
CommonJS模块输出的是一个值的复制，ES6模块输出的是值的引用
CommonJS模块是运行时加载，ES6模块是编译时输出接口
第二个差异是因为CommonJS加载的是一个对象，即module.export属性，该对象只有在脚本运行结束时才会生成。而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

下面重点解释第一个差异。
CommonJS模块输出的是值的复制，一旦输出这个值，模块内部的变化就影响不到这个值。
```
//lib.js  一个commonJS模块
var counter = 3
function incCounter() {
    counter++
}
module.exports = {
    counter : counter,
    incCounter : incCounter,
}
//main.js 在这个函数里加载这个模块
var mod = require ('./lib')
console.log(mod.counter)
mod.incCounter()
console.log(mod.counter)
3
3
```
上面的代码说明，lib.js模块加载后，它的内部变化就影响不到输出的mod.counter 了。
这是因为mod.counter是一个原始类型，会被缓存。除非写成一个函数，否则得不到内部变动后的值。
```
//lib.js 
var counter = 3
function incCounter() {
    counter++
}
module.exports = {
    get counter(){ //输出的counter属性实际上是个取值器函数。
        return counter
    },
    incCounter: incCounter
}
main.js
var mod = require ('./lib')
console.log(mod.counter)
mod.incCounter()
console.log(mod.counter)//现在再执行就能正确读取内部变量counter的变动了。
3
4
```
ES6模块的运行机制与CommonJS不一样。JS引擎对脚本静态分析的时候，遇到模块加载命令import就会生成一个只读引用。等到脚本真正执行的时候，再根据这个只读引用到被加载的模块中取值。因此，ES6模块是动态引用，并且不会缓存值，模块里的变量绑定其所在的模块。
```
// lib.js
export let counter = 3
export function incCounter() {
    counter++
}

//main.js
import { counter, incCounter } from './lib'
console.log(counter)
incCounter()
console.log(counter)

3
4
```
上面的代码说明，ES6模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。
再如：
```
//m1.js
export var foo = 'bar'
setTimeout(()=>foo='baz',500)
//m2.js
import {foo} from './m1.js'
console.log(foo)
setTimeout(()=>console.log(foo),500)

bar
baz
```
上面的代码表明，ES6模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。
由于ES6输入的模块变量只是一个“符号连接”，所以这个变量是只读的，对它重新赋值会报错。
```
//lib.js
export let obj = {}

//main.js
import {obj} from './lib'
obj.prop=123 //OK
obj = {} //TypeError
```
main.js 从 lib.js 输入变量obj，可以对obj添加属性，但是重新赋值就会报错。因为变量obj指向的地址是只读的，不能重新赋值，这就好比main.js创造了一个名为obj的const变量。

```
//mod.js
function C(){
   this.sum = 0
   this.add = function(){
        this.sum += 1
  }
  this.show = function(){
       console.log(this.sum)
  }
}
export let c = new C()
//x.js
import {c} from './mod'
c.add()
//y.js
import {c} from './mod'
c.show()
//main.js
import './x'
import './y'

1
```
这就证明了x.js和y.js加载都是C的同一实例

exports 是指向的 module.exports 的引用
重新导出exports会覆盖之前
但如果未重新exports, 内部的变化不会响应

module.exports 指向新的对象时，exports 断开了与 module.exports 的引用

[https://cnodejs.org/topic/5231a630101e574521e45ef8](https://cnodejs.org/topic/5231a630101e574521e45ef8)
[https://github.com/YvetteLau/Step-By-Step/issues/43](https://github.com/YvetteLau/Step-By-Step/issues/43)


