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
1. async内部如果没有主动return Promise，那么async会把函数的返回值用Promise包装。
2. await关键字必须出现在async函数中，await后面不是必须要跟一个异步操作，也可以是一个普通表达式。
3. 遇到await关键字，await右边的语句会被立即执行然后await下面的代码进入等待状态，等待await得到结果。
4. await后面如果不是 promise 对象, await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，把这个非promise的东西，作为 await表达式的结果。
5. await后面如果是 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果，然后把剩下的 async 函数中的操作放到 then 回调函数中。

await返回Promise
将后续代码放入then，等Promise.then()结束之后，将后续代码放入微任务
继续执行
```
setTimeout(function () {
  console.log('8')
}, 0)

async function async1() {
  console.log('1')
  const data = await async2()
  console.log('6')
  return data
}

async function async2() {
  return new Promise(resolve => {
    console.log('2')
    resolve('async2的结果')
  }).then(data => {
    console.log('4')
    return data
  })
}

async1().then(data => {
  console.log('7')
  console.log(data)
})

new Promise(function (resolve) {
  console.log('3')
  resolve()
}).then(function () {
  console.log('5')
})

1 - 2 - 3 -4 - 5 - 6 - 7 - async2的结果 - 8
```
await 未返回Promise
执行结束外部所有的微任务及同步任务， 然后回到Promise内部继续执行
```
async function async1() {
  console.log('2')
  await async2()
  console.log('7')
}

async function async2() {
  console.log('3')
}

setTimeout(function () {
  console.log('8')
}, 0)

console.log('1')
async1()

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('6')
})
console.log('5')
1 - 2 - 3 -4 - 5 - 6 - 7 - 8
```
await 后不是异步函数, 运行结束外部同步代码之后
回到async 内部继续执行
```
console.log('1')
async function async1() {
  console.log('2')
  await 'await的结果'
  console.log('5')
}

async1()
console.log('3')

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('6')
}
1 -  2 - 3 - 4 - 5 - 6
```
