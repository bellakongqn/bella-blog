---
title: 深拷贝
date: 2020-05-25 15:02:21
tags:
    - js
categories: js
---
实现深拷贝 (不用lodash)
<!-- more -->
### 浅拷贝
1. shallowClone
```
function(o){
    const obj ={}
    for(let i in o){
        obj[i] = o[i]
    }
    return obj
}
```
2. Object.assign()
```
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```
### 深拷贝
1. Json.parse(Json.stringify(...))
```
const oldObj = {
  a: 1,
  b: [ 'e', 'f', 'g' ],
  c: { h: { i: 2 } }
};

const newObj = JSON.parse(JSON.stringify(oldObj));
console.log(newObj.c.h, oldObj.c.h); // { i: 2 } { i: 2 }
console.log(oldObj.c.h === newObj.c.h); // false
newObj.c.h.i = 'change';
console.log(newObj.c.h, oldObj.c.h); // { i: 'change' } { i: 2 }
```
bug 
 - 他无法实现对函数 、RegExp等特殊对象的克隆
 - 会抛弃对象的constructor,所有的构造函数会指向Object
 - 对象有循环引用,会报错
2. deepclone
```
function isArray(arr){
    return Object.prototype.toString.call(arr) === '[object Array]'
}

function deepClone(obj){
    if(typeof obj!== 'function' && typeof obj!== 'object')
        return obj
    const o  = isArray(obj) ? []: {}
    for(let i in obj){
       o[i]= typeof obj[i] === 'object' ? deepClone(obj[i]):obj[i]
    }
    return o;
}
```
3. 
```
const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};
```
参考博客：[https://juejin.im/post/5abb55ee6fb9a028e33b7e0a](https://juejin.im/post/5abb55ee6fb9a028e33b7e0a)
lodash[http://lodash.think2011.net/cloneDeep](http://lodash.think2011.net/cloneDeep)

