---
title: React fiber
date: 2020-06-12 16:41:21
tags:
    - React
categories: React
---
### React 15 的问题
在页面元素过多，频繁刷新的时候，会出现掉帧卡顿的现象
![](/assets/stack-example.gif)
原因：大量的同步计算任务阻塞了浏览器的 UI 渲染。默认情况下，JS 运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。当我们调用setState更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。
<!-- more -->
优化后：
![](/assets/fiber-example.gif)
### 解决
解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成。也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。

要把计算任务拆分，那就要有任务恢复和任务完成后提交等功能，普通的vDom并不具备记录这些信息的能力，因此React Fiber从虚拟节点衍生出了一套Fiber节点，来记录任务状态。每一个Fiber节点都会对应一个虚拟节点，这样计算任务就拆分成了一个个小块，会有一个对应关系.

旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。而Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式是使用了浏览器的requestIdleCallback这一 API。官方的解释是这样的
> requestIdleCallback回调的执行的前提条件是当前浏览器处于空闲状态。window.requestIdleCallback()会在浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这些延迟触发但关键的事件产生影响。函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。

### Fiber
React 框架内部的运作分为3层：
- Virtual Dom: 描述页面的样子
- Reconciler：调用生命周期方法，进行Diff运算
- Renderer：根据不同的平台，渲染出相应的页面，比较常见的是 ReactDOM 和 ReactNative
改动最大的是Reconciler层，新名字叫Fiber Reconciler。Fiber其实指的是一种数据结构
```
const fiber = {
    stateNode, // 节点实例
    child, // 子节点
    sibling, // 兄弟节点
    return, // 父节点
}
```
Stack Reconciler 执行过程是不能被打断的，必须一条道走到黑：
![](/assets/stack-reconciler.png)
而 Fiber Reconciler 每执行一段时间，都会将控制权交回给浏览器，可以分段执行
![](/assets/fiber-reconciler.png)
需要一个调度器调来进行任务分配,任务优先级：
- synchronous，与之前的Stack Reconciler操作一样，同步执行
- task，在next tick之前执行
- animation，下一帧之前执行
- high，在不久的将来立即执行
- low，稍微延迟执行也没关系
- offscreen，下一次render时或scroll时才执行

优先级高的任务（如键盘输入）可以打断优先级低的任务（如Diff）的执行，从而更快的生效。

Fiber执行过程分为两个阶段：
阶段一：生成Fiber树，得出需要更新的节点的信息。渐进的过程，可以被打断
阶段二：将需要更新的节点一次批量更新，不可以被打断。
阶段一可被打断的特性，让优先级更高的任务先执行，从框架层面大大降低了页面掉帧的概率。

在fiber任务执行完进行dom更新的时候，这块是没法做任务拆分的，如果遇到dom变化很大，更新耗时的情况也会造成卡顿，这个没法避免，如果此时有用户交互发生，造成卡顿会降低用户体验，Fiber针对这种情况也做了优化，将任务分成优先级，像用户输入，交互等行为属于高优先级，会优先处理，然后页面渲染，diff计算等属于次优先级。

简单描述下它的流程：
1.数据状态发生改变，即发生setState
2.开始diff算法
3.到达一个节点，生成对应的fiber节点，记录状态
4.查看当前是否有执行时间
5.有执行时间，计算完当前节点（节点的增删改），到下一个节点，继续这个步骤
6.到某个节点没有执行时间，则保存fiber状态，每个fiber都记录了下一个任务指向
7.重新获取到了执行时间，从当前记录的fiber节点开始往下继续
8.执行到最后的节点，将结果进行一级一级提交，这样直到根节点，组件就知道它已经完成了数据计算
9.最后一步，将最终确认的dom结果渲染到页面中

Fiber 树在首次渲染的时候会一次过生成。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程。

如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。

在构造 Fiber 树的过程中，Fiber Reconciler 会将需要更新的节点信息保存在Effect List当中，在阶段二执行的时候，会批量更新相应的节点。

requestIdleCallback 会告诉你现在是否是空闲时间，空闲时间有多久，它的用法
```
// 一窥它的行为
requestIdleCallback(function(){
    console.log('1');
    let a = 1000000000;
    while(a > 0){ a--; }
})
requestIdleCallback(function(){console.log('2')})
requestIdleCallback(function(){console.log('3')}, {timeout:10})


// 使用方式

const tasks = [...] // 任务队列

function taskHandler(deadline) {
  // deadline.timeRemaining() 可以获取到当前帧剩余时间
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    // do something
  }
  // 没时间了，但还有任务，继续注册一个，等到下次有时间了会执行
  if (tasks.length > 0){
    requestIdleCallback(taskHandler);
  }
}

requestIdelCallback(taskHandler);
```
参考博客：
[https://segmentfault.com/a/1190000018250127](https://segmentfault.com/a/1190000018250127)
[https://segmentfault.com/a/1190000014457824](https://segmentfault.com/a/1190000014457824)
[https://segmentfault.com/a/1190000017784309](https://segmentfault.com/a/1190000017784309)
[https://www.youtube.com/watch?v=ZCuYPiUIONs&list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0&index=6&t=0s](https://www.youtube.com/watch?v=ZCuYPiUIONs&list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0&index=6&t=0s)
[https://juejin.im/post/5ab7b3a2f265da2378403e57](https://juejin.im/post/5ab7b3a2f265da2378403e57)
