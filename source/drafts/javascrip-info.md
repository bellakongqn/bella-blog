### 函数进阶内容

#### 递归和堆栈
自调用
```
function dealData(data){
    for(let i=0; i< data.length; i+=1){
        // 处理数据
        if(data[i].children!==null){
            dealData(data[i].children)
        }
    }
    return data
}
```
#### Rest 参数 与 Spread 语法
rest 必须放到参数结尾
```
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName );
  // 剩余的参数被放入 titles 数组中
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}
showName("Julius", "Caesar", "Consul", "Imperator");
```
arguments 该对象按参数索引包含所有参数
arguments 是一个类数组且可遍历的变量，但它终究不是数组。它不支持数组方法，因此我们不能调用 arguments.map(...) 等方法
```
function showName() {
  alert( arguments.length );
  // 它是可遍历的
  // for(let arg of arguments) alert(arg);
}

showName("Julius", "Caesar");
showName("Ilya");
```
Spread
```
let arr = [3, 5, 1];
alert( Math.max(...arr) );

Object.assign([], arr) === [...arr]
Object.assign({}, obj) === {...obj}
```
Rest 参数用于创建可接受任意数量参数的函数。
Spread 语法用于将数组传递给通常需要含有许多参数的列表的函数。
“旧式”的 arguments（类数组对象）能够帮助我们获取函数调用中的所有参数。
#### 闭包
外部可以访问函数内部的变量（通过函数内部返回一个方法）
```
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```
#### var
var 存在变量提升，声明会被提升，但是赋值不会。用 var 声明的变量，不是函数作用域就是全局作用域，不存在块级作用域
#### 全局对象
全局对象提供可在任何地方使用的变量和函数。在浏览器中，使用 var（而不是 let/const！）声明的全局函数和变量会成为全局对象的属性。
```
var gVar = 5;
alert(window.gVar); // 5（成为了全局对象的属性）
```
#### 函数对象
name： 函数的名字
length:  函数定义时的入参的个数。Rest 参数不参与计数。
自定义属性
```
function sayHi() {
  alert("Hi");
  // 计算调用次数
  sayHi.counter++;
}
sayHi.counter = 0; // 初始值
sayHi(); // Hi
sayHi(); // Hi
alert( `Called ${sayHi.counter} times` ); // Called 2 times
```
属性不是变量| 函数属性有时会用来替代闭包
命名函数表达式
```
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // 现在一切正常
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest（嵌套调用有效）

// 但这不工作：
func(); // Error, func is not defined（在函数外不可见）
```
为什么不直接用sayHi?
```
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not a function
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error，嵌套调用 sayHi 不再有效！
```
#### new Function
此类函数无法访问外部（outer）变量，只能访问全局变量。
```
function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}
getFunc()();  // error: value is not defined
```
#### setTimeOut|setInterval
```
/** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);
```
```
let delay = 5000;
let timerId = setTimeout(function request() {
  ...发送请求...

  if (request failed due to server overload) {
    // 下一次执行的间隔是当前的 2 倍
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```
#### call/apply
```
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // 现在 "this" 被正确地传递了
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // 现在对其进行缓存

alert( worker.slow(2) ); // 工作正常
alert( worker.slow(2) ); // 工作正常，没有调用原始函数（使用的缓存）
```
在经过装饰之后，worker.slow 现在是包装器 function (x) { ... }。
因此，当 worker.slow(2) 执行时，包装器将 2 作为参数，并且 this=worker（它是点符号 . 之前的对象）。
在包装器内部，假设结果尚未缓存，func.call(this, x) 将当前的 this（=worker）和当前的参数（=2）传递给原始方法。
```
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // works
alert( "Again " + worker.slow(3, 5) ); // same (cached)
```
可以使用 func.apply(this, arguments) 代替 func.call(this, ...arguments)
```
func.call(context, ...args); // 使用 spread 语法将数组作为列表传递
func.apply(context, args);   // 与使用 call 相同
```

```
let wrapper = function() {
  return func.apply(this, arguments);
};
```
#### bind
```
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000);  // Hello, undefined!

等价于
let f = user.sayHi;
setTimeout(f, 1000);
```
改进一：
```
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```
问题：
```
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ……user 的值在不到 1 秒的时间内发生了改变
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
```
改进二： bind
```
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// 将 this 绑定到 user
let funcUser = func.bind(user);

funcUser("Hello"); // Hello, John（参数 "Hello" 被传递，并且 this=user）
```
#### 箭头函数
箭头函数没有this,如果访问this,则会从外部获取。
```
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();
```
头函数没有 “arguments”
```
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // 2 秒后显示：Hello, John
```
### 原型，继承

### 类
#### class 基本语法
```
class User {
  constructor(name) {
    // 调用 setter
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}
let user = new User("John");
alert(user.name); // John
user = new User(""); // Name is too short.
```
#### 类继承
1.class Child extends Parent：
这意味着 Child.prototype.__proto__ 将是 Parent.prototype，所以方法会被继承。
2.重写一个 constructor：
在使用 this 之前，我们必须在 Child 的 constructor 中将父 constructor 调用为 super()。
3.重写一个方法：
我们可以在一个 Child 方法中使用 super.method() 来调用 Parent 方法。
```
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
  stop() {
    super.stop(); // 调用父类的 stop
    this.hide(); // 然后 hide
  }
}
let rabbit = new Rabbit("White Rabbit");
rabbit.run(5); // White Rabbit 以速度 5 奔跑
rabbit.stop(); // White Rabbit 停止了。White rabbit hide 了！
```
#### 静态属性和静态方法
```
class Animal {
  static planet = "Earth";
  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }
  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}

// 继承于 Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compare);
rabbits[0].run(); // Black Rabbit runs with speed 5.
alert(Rabbit.planet); // Earth
```
#### 私有的和受保护的属性和方法
1.受保护的字段是自然可被继承的。_waterCount
2.无法从外部或从继承的类中访问它,只能从类的内部访问它们。私有字段不能通过 this[name] 访问 #waterLimit
```
class CoffeeMachine {
  _water = 0;
  #waterAmount = 0;
  get waterAmount() {
    return this.#waterAmount;
  }
  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this.#waterAmount = value;
  }

  setWater(value) {
    if (value < 0) throw new Error("Negative water");
    this._water = value;
  }
  getWater() {
    return this._water;
  }
}

new CoffeeMachine().setWaterAmount(100);
let machine = new CoffeeMachine();
machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```
### 扩展内建类
内建类它们相互间不继承静态方法。
```
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```
#### 类检查："instanceof"
instanceof 操作符用于检查一个对象是否属于某个特定的 class。同时，它还考虑了继承。
使用 Object.prototype.toString 方法来揭示类型
#### Mixin 模式
```
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// 用法：
class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以打招呼了
new User("Dude").sayHi(); // Hello Dude!
```