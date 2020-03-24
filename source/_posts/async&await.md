---
title: async&await
tags:
    - async&await
categories: async&await
thumbnail: '../assets/async&await.png'
---
### async & await

async 是 异步（asynchronous）的简写 | await 是 async wait 的简写
So...
async 用于申明一个 function 是异步的 | await 是等一个异步方法执行完成

Interesting ！！！！
await 只能出现在 async 函数中 

Question？？？
async 的作用到底是什么呢？？？？

Let's Find Out 👀

<!-- more -->

### async 的作用👌
关键在于：async 函数是怎么处理它的返回值的！🐷
```
async function testAsync() {
    return "hello async";
}

const result = testAsync();
console.log(result);
```
结果： Promise {<resolved>: "hello async"} 
💎💎💎💎💎输出的是一个 Promise 对象！！！！

So: async 函数返回的是一个 Promise 对象, 如果在函数中返回一个任意值，async 会通过  Promise.resolve() 将其包装成一个 Promise

Promise 的特点是：立即执行-无等待🍓，所以在没有 await 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。

### await 在等什么🤔
> 通常，await 是在等一个async 函数完成,不过按语法说明，await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）

因为 async 函数返回一个 Promise, 所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数。但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。
```
function getSomething() {
    return "something";
}

async function testAsync() {
    return "hello async";
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();
```

### await 等到之后....💨
await 等到了它要等的东西，一个 Promise 对象，或者其它值，然后呢？我不得不先说，await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。

如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。

如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

> 看到上面的阻塞一词，心慌了吧……放心，这就是 await 必须用在 async 函数中的原因。async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。

### async/await 的优势在于处理 then 链👍
单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）

假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。我们用 setTimeout 来模拟异步操作：
```
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}

// Promise 方式
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

// async/await 方式
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();
````
### Attention...🎈
await 后面的Promise 对象, 结果可能是reject😭，所以最好将await 放在try...catch...之中
```
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
```
Promise.all 并发请求🍕
```
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}
```

参考博客[https://segmentfault.com/a/1190000007535316](https://segmentfault.com/a/1190000007535316)