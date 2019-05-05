---
title: let|var
tags:
    - let var
categories: Javascript
thumbnail: '../assets/post-img/git downloads.png'
---

起源是晚上在家看视频，然后看到一代码。一直觉着不要写id也可以实现，就跟我哥打赌，结果真的是我输惨啦！
html代码：
```
<ul id="test">
  <li>哈哈哈</li>
  <li>嘻嘻嘻</li>
  <li>嘿嘿嘿</li>
  <li>七七七</li>
  <li>八八八</li>
</ul>
```
想要实现的效果是鼠标滑过文字变色,通过for循环遍历来实现
js代码
```
const lis = document.querySelectorAll('#test li')
for (let i=0; i< lis.length; i++){
    lis[i].onmouseover = function(){
        lis[i].style.color = 'red'
    }
}
```
可以实现鼠标划过变色
let声明的变量拥有块级作用域,然后在for循环外打印i,发现i的值为undifined
let在每次迭代时都为i创建新的绑定，可以实现效果
![](/assets/post-img/let.png)

---------------------

使用var来进行循环
```
const lis = document.querySelectorAll('#test li')
for (var i=0; i< lis.length; i++){
    lis[i].onmouseover = function(){
        lis[i].style.color = 'red'
    }
}
```
发现无法实现鼠标划过变色，然后在for循环外打印i,发现i的值一直为5
因为var定义的变量为全局变量,for循环内部的i与for循环外部的i共享一个值，
for循环结束i的值为5

修改方法同样可以实现效果
第一种方法：for循环内为立即执行函数

```
const lis = document.querySelectorAll('#test li')
for (var i=0; i< lis.length; i++){
    (funciton(index){
        lis[i].onmouseover = function(){
         lis[i].style.color = 'red'
     }
    })(i)
}
```
第二种方法：为li增加一个属性并将i赋值给新属性,然后用id来定位Li
```
const lis = document.querySelectorAll('#test li')
for (var i=0; i< lis.length; i++){
    lis[i].id=i;
    lis[i].onmouseover = function(){
         lis[this.id].style.color = 'red'
}
```
