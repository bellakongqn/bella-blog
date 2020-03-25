---
title: EventLoop & Microtask & Macrotask
date: 2020-03-24 12:10:10
tags:
    - EventLoop
categories: EventLoop
thumbnail: '../assets/tasks.png'
---
### EventLoop
JS主线程不断的循环往复的从任务队列中读取任务，执行任务，其中运行机制称为事件循环（event loop）

### 任务队列
顺序执行任务队列中的任务
<!-- more -->

### Microtask & Macrotask （微任务 & 宏任务）
------
Macrotask
一些异步任务的回调会依次进入<b>macro task queue</b>，等待后续被调用，这些异步任务包括：
- setTimeout
- setInterval
- setImmediate (Node独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

Microtask
另一些异步任务的回调会依次进入<b>micro task queue</b>，等待后续被调用，这些异步任务包括：
- process.nextTick (Node独有)
- Promise
- Object.observe  (废弃)
- MutationObserver

🐖：
1. 一个 event loop 都有一个 microtask queue
2. 每个 event loop 会有一个或多个macrotask queue ( 也可以称为task queue )
3. 一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue中
4. 每一次event loop，会首先执行 microtask queue， 执行完成后，会提取 macrotask queue 的一个任务加入 microtask queue， 接着继续执行microtask queue，依次执行下去直至所有任务执行结束。

### JS 主线程拥有一个 执行栈（同步任务） 和 一个 任务队列（microtasks queue），主线程会依次执行代码，

- 当遇到函数（同步）时，会先将函数入栈，函数运行结束后再将该函数出栈；
- 当遇到 task 任务（异步）时，这些 task 会返回一个值，让主线程不在此阻塞，使主线程继续执行下去，而真正的 task 任务将交给 浏览器内核 执行，浏览器内核执行结束后，会将该任务事先定义好的回调函数加入相应的**任务队列（microtasks queue/ macrotasks queue）**中。
- 当JS主线程清空执行栈之后，会按先入先出的顺序读取microtasks queue中的回调函数，并将该函数入栈，继续运行执行栈，直到清空执行栈，再去读取任务队列。
- 当microtasks queue中的任务执行完成后，会提取 macrotask queue 的一个任务加入 microtask queue， 接着继续执行microtask queue，依次执行下去直至所有任务执行结束

通过例子解析
```
// 今日头条面试题
async function async1() {
    console.log('async1 start') // 4. log : script start-> async1 start
    await async2()              // 5. 执行 async(2)  结束后 让出主线程
    console.log('async1 end')   // 12 . log : script start-> async1 start -> async2 -> promise1 -> script end -> async1 end ---task结束
}
async function async2() {  // 6. 执行async(2) 
    console.log('async2')  // 7. log : script start-> async1 start -> async2
}
console.log('script start') // 1. log： script start
setTimeout(function () {  // 2. 入macrotasks [setTimeout] 等后续进入任务队列
    console.log('settimeout')
    // 14.读取macrotasks  script start-> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> settimeout
})
async1()   // 3. 执行async1()
new Promise(function (resolve) {   // 8. Promise 
    console.log('promise1')  // 9. log : script start-> async1 start -> async2 -> promise1
    resolve()
}).then(function () {   // 10. 进入 microtasks [resolve]  
                        // 13. 读取microtasks  log : script start-> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2
    console.log('promise2')
})
console.log('script end') // 11. log : script start-> async1 start -> async2 -> promise1 -> script end

// script start-> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> settimeout
```

未完....