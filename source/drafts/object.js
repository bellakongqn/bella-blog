// Object.assign() 用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
// 目标对象中的属性具有相同的键，后面的属性将覆盖前面的源对象的属性
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }
const source1 = { d: 2 }
const returnedTarget = Object.assign(target, source, source1) // returnedTarget: { a: 1, b: 4, c: 5, d: 2 }  taget: { a: 1, b: 4, c: 5, d: 2 }

// 复制一个对象
const obj = { a: 1 }
const copy = Object.assign({}, obj) // { a: 1 }

// 深拷贝 Object.assign() 如果原值是一个对象的引用的话 那它只会复制引用
// Object.assign() 浅拷贝
const obj1 = { a: 0, b: { c: 0 } }
const obj2 = Object.assign({}, obj1) 
// console.log(obj2) // { a: 0, b: { c: 0 } }
// obj1.b.c = 2
// console.log(obj2) // { a: 0, b: { c: 2 } }

// deep clone
const objDeepClone = JSON.parse(JSON.stringify(obj1))
// console.log(objDeepClone) // { a: 0, b: { c: 0 } }
// obj1.b.c = 2
// console.log(objDeepClone) // { a: 0, b: { c: 0 } }

// Object.create 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
  }
}

const me = Object.create(person)
me.name = "bella"
me.isHuman = true
// me.printIntroduction()

// ❓❓❓❓❓❓❓ 为什么打印改对象依旧为 {}
// Object.defineProperties() 在一个对象上定义新的属性或修改现有属性，并返回该对象
const objDefineProperties = {}
Object.defineProperties(objDefineProperties, {
  'property1':{
    value:true,
    writable: true,
  },
  'property2':{
    value:'Hello',
    writable: false,
  },
})
console.log(objDefineProperties)

// Object.defineProperty()  接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
const objDefineProperty = {}
Object.defineProperty(objDefineProperty, 'property1', {
  value: 42,
  writable: false
})
console.log(objDefineProperty.property1)

// ❓❓❓❓❓❓ for...in for..of for...
//  in 键名 of 键值
// https://www.cnblogs.com/rogerwu/p/10738776.html

// Object.entries() 返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致
// Object.entries()返回一个数组，
// 其元素是与直接在object上找到的可枚举属性键值对相对应的数组。属性的顺序与通过手动循环对象的属性值所给出的顺序相同
const objEnteries = {
  a: 'somestring',
  b: 42
}

for( const [key, value] of Object.entries(objEnteries)){
  console.log(`${key}: ${value}`);
}

Object.entries(objEnteries).forEach(([key, value])=>{
  console.log(`${key}:${value}`)
})

// Object- Array
const array =  Object.entries(objEnteries)
console.log(array)

// Object -> Map
const map = new Map(Object.entries(objEnteries))
console.log(map)

// Object.freeze() 冻结一个对象
const objFreeze = {
  a:1
}
Object.freeze(objFreeze)
objFreeze.a = 10 // {a:1 }

// 冻结数组
let a = [0];
Object.freeze(a);
// a.push(1)  error

// deepFreeze
const deepFreeze = (obj) => {
  // 拿到所有属性名
  const propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach(item=> {
    const prop = obj[item]
    if(typeof prop === 'object' && prop !== null) {
      deepFreeze(prop)
    }
  })
  return Object.freeze(obj)
}
objDeepFreeze = {
  internal: {}
};

deepFreeze(objDeepFreeze);
objDeepFreeze.internal.a = 'anotherValue';
objDeepFreeze.internal.a; // undefined { internal: {} }

// Object.fromEntries()
//  map 转换为 object
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);
const mapFormEnteries = Object.fromEntries(entries); // { foo: "bar", baz: 42 }

// array 转换为 object
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const arrFromEnteries = Object.fromEntries(arr) // { 0: "a", 1: "b", 2: "c" }

// Object.getOwnPropertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符
const objGetOwnPropertyDescriptor = {
  property1: 42
};
const descriptor1 = Object.getOwnPropertyDescriptor(objGetOwnPropertyDescriptor, 'property1');
console.log(descriptor1)

// Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述符
const objGetOwnPropertyDescriptors = {

}

// Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组
const arrProperty = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arrProperty))

// Object.getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组


// Object.getPrototypeOf() 方法返回指定对象的原型
const prototype1 = {};
const object1 = Object.create(prototype1);
console.log(Object.getPrototypeOf(object1) === prototype1);

// Object.is() 方法判断两个值是否为同一个值

// Object.isExtensible() 方法判断一个对象是否是可扩展的

// Object.isFrozen()方法判断一个对象是否被冻结。

// Object.isSealed() 方法判断一个对象是否被密封

// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致

// Object.prototype.hasOwnProperty()