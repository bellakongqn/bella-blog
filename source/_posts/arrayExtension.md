---
title: 数组的扩展
tags:
    - es6
categories: es6
thumbnail: '../assets/post-img/differences.jpg'
---
#### 数组的扩展 es6
<!-- more -->
---------

1. 扩展运算符...,将一个数组转为用逗号分隔的参数序列。
   console.log(...[1,2,3])
   输出结果为1，2，3
   该运算符将将整个数组作为一个参变成参数序列进行传递，
   ```
   fruit=['apple','banana','orange']
   ```
   函数中调用数组
   ```
   function(...fruit){
   }
   //等价于
   function('apple','banana','orange'){
   }
   ```
   用于克隆数组
   ```
   const a = [...fruit]
   ```
2. Array.from方法用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象
   类似数组的对象,该方法主要应用于转换为数组，然后方便操作
   ```
   let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
   };
   let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
   ```
   本质特征只有一点，即必须有length属性，任何有length属性的对象，都可以通过Array.from方法转为数组
   ```
   Array.fron({length:4})=>[undifined,undifined,undifined,undifined]
   ```
   它还可以接受第二个参数，对转为数组之后的元素进行相关操作，比如：
   ```
   Array.from(arrayLike,item=>item*item)
   ```
   Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。
   ```
   Array.from('hello').length;
   ```
3. Array.of()方法用于将一组值，转换为数组
   ```
   Array.of(3, 11, 8) // [3,11,8]
   ```
4. copyWithin()在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组，会改变原数组的值
   它需要三个参数：
   target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
   start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
   end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
   ```
   [1, 2, 3, 4, 5].copyWithin(0, 3, 4) //[4,2,3,4,5]
   ```
5. find()||findIndex()
   find()用于找出第一个符合条件的数组成员
   [1, 4, -5, 10].find((n) => n < 0)   // -5
   findIndex()方法返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1
   ```
   [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
   }) // 2
   ```
   ```
   function f(v){
    return v > this.age;
   }  
   let person = {name: 'John', age: 20};
   [10, 12, 26, 15].find(f, person);    // 26
   ```

