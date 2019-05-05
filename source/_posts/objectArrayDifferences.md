---
title: 对象|数组区别 对象|Json区别
tags:
    - javascript
categories: javascript
thumbnail: '../assets/post-img/differences.jpg'
---
#### 对象|数组区别
<!-- more -->
--------------

1. 创建方式不同
   数组创建方式：
   ๑
   ```
   var fruit=new Array("apple","orange","pear");
   ```
   ๑
   ```
   var array= ['张三',20,'学生']; 
   ```
   对数组可以使用数组的操作方法[pop|shift|unshift|push|replace](https://blog.superbella.cn/2019/05/05/array/)

   对象创建方式：
   ๑
   ```
   var person = { 
                    name: "bella"; 
                    age : 22; 
                }
    ```
    ๑
    ```
    var person = new Object(); 
    person.name = 'bella';
    person.age = 22;
    ```
    删除对象属性 ：
    ```
    delete user.age;
    ```
2. 数组和对象最大的不同是，数组是有序的，对象是无序的，对象是一些{'key':value}键值对的组合，
   数组相对于对象多了length属性，它是通过index来索引，而对象是采用key的方式获取值
3. 遍历方式不同
   对象的遍历方式：
    ```
    var person = {'name':'bella','age':'22','sex':'女'};
    for(var i in person) {
        console.log(i,":",person[i]);
    }
    ```
    输出结果为：
    name: bella
    age: 22
    sex:女
    数组遍历方式：
    ```
    var person = ['bella','22','女'];
    for(var i=0;i<person.length;i++) {
        console.log(person[i]);
    }
    ```
    输出结果为：
    bella
    22
    女
4. 相互结合
   对象中包含数组
```
    var food={
        fruit:[{first:'apple'},{second:'banana'}],
        vegetables:[{first:'tomato'},{second:'potato'}]
    }
    console.log(food.fruit[0].first);
```
   数组中包含对象
```
   var number=[
    {a:'11',b:'1111'},
    {c:'111',d:'111'}
    ]
    console.log(number[1].a);
```
5. 相互转换
   对象转换为数组
   ```
   var person = { 
                    name: "bella",
                    age : 22, 
                };
  var arr = []
  for (let i in person) {
        arr.push(person[i]);
     }
    console.log(arr);
   ```
   输出结果为['bella',22]
   
   数组转换为对象
   ```
   var arr=['11111','222','333','3333']
   var obj={}
   for(var key  in arr){
        obj[key]=arr[key]
   }
   console.log(typeof(obj)
   ```

-------------------

#### 对象|Json区别
1. 格式不同
```
//对象的格式：
var people={ 
    name:'bella', 
    age:22 
}; 
//json的格式是： 
var people={ 
    "name":'bella', 
    "age":22 
}; 
```
Json是一种轻量级的数据交换格式，它是JavaScript的一个子集。它是一种严格的js对象的格式。
JSON本身的意思就是JavaScript对象表示法（JavaScript Object Notation），它用严格的JavaScript对象表示法来表示结构化的数据。
2. 键值对中的值表现不同
  对象中键值对的值可以是函数、对象、字符串、数字、布尔值等
  json中的键必须加双引号，同时值不能是函数，也不能是undefined|NaN
3. 可以相互转换
   json转换成js对象
   ```
   JSON.parse(json)
   ```
   js对象转换成json
   ```
   JSON.stringify(object)
   ```



   




