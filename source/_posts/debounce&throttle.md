---
title: 防抖和节流?有什么区别?如何实现?
date: 2020-04-29 13:15:00
tags:
    - js
categories: js
---
### 防抖
> 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
> 每次触发事件时都取消之前的延时调用方法
<!-- more -->
```
function debounce(fn){
    let timeout = null
    return function(){
        clearTimeout(timeout); 
        timeout = setTimeout(()=>{
            fn.apply(this, arguments);
        }, 500)
    }
}

function sayHi() {
    console.log('防抖成功');
}

var inp = document.getElementById('inp');
inp.addEventListener('input', debounce(sayHi)); // 防抖
```

### 节流
> 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
> 每次触发事件时都判断当前是否有等待执行的延时函数
```
function throttle(fn){
    let canRun = true;
    return function(){
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun =  false;
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
          fn.apply(this, arguments);
          // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
          canRun = true;
        }, 500);
    }
}

function sayHi(e) {
    console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi));
```

