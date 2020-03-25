---
title: 数组操作
tags:
    - javascript
categories: javascript
thumbnail: '../assets/post-img/array.jpg'
---
数组操作
<!-- more -->
a = [1,2,3] b=[3,2,1]
1. push() 在当前数组的最后面添加插入的值，改变原数组
a.push("4") => 
a为 [1,2,3,4]
2. unshift() 在当前数组的最前面添加插入的值，改变原数组
b.push("4") => 
b为 [4,3,2,1]
3. pop() 删除当前数组的最后一位，改变原数组
a.pop() =>
a为 [1,2]
4. shift() 删除当前数组的第一位，改变原数组
b.shift() =>
b为 [2,1]
5. splice() 数组删除|添加|替换，改变原数组
  1. splice(删除开始位置，删除长度)
  a.splice(1,1) =>
  a为 [1]
  2. splice(插入开始位置，0(要删除的项数)，插入项)
  a.splice(1,0,'9') =>
  a为 [1,2,9,3]
  3. splice(替换开始位置，替换的项数，替换的值)
  a.splice(1,2,'9','10') =>
  a为 [1,9,10]
6. concat() 链接两个|多个数组，不改变原数组，返回新的数组
var c = a.concat(b) =>
c为 [1,2,3,3,2,1]
7. join() 将数组中的所有元素转换为一个字符串，不改变原数组
a.join() =>
返回值为 :  1,2,3
a.join('-') =>
返回值为 :  1-2-3
8. replace()方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。
模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数
方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。
[详情查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
```
var str = 'apple APPLE';
var newstr = str.replace(/apple/gi, 'banana');
console.log(newstr);  // banana banana

```
 g表示替换全部apple,i表示忽略大小写
9. map() 对数组元素进行装饰，不修改原数组
const c = a.map(x => x * 2);
console.log(c);
c为[2,4,6]
函数
10. filiter() 对数组元素进行删选，筛选出符合条件的元素，不改变原数组
const d = a.filter((item) => item >1);
console.log(d);
d为[2,3]
11. reduce() 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值,
它接受四个参数：Accumulator (acc) (累计器) 、Current Value (cur) (当前值) 、Current Index (idx) (当前索引) 、Source Array (src) (源数组)