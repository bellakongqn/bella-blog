1. let const var 区别
  const 常量
  let/const 块级作用域， 声明的变量仅在let命令在的代码块有效
  不存在‘变量提升’， 即变量在声明之前都不可以使用
  暂时性死区： 只要块级作用域内存在let 命令，它所声明的变量就绑定在这个区域， 不再受外部的影响
  不允许在相同作用域内，重复声明同一个变量

  为什么需要块级作用域？
  内层变量可能会覆盖外层变量
  用来计数的循环变量泄露为全局变量

2. 怎么创建一个bfc
   html根元素
   浮动元素：float 除 none 以外的值
   绝对定位元素：position（absolute, fixed)
   dispaly: inline-block、table-cell、table-caption、table、inline-table flex inline-flex grid inline-grid
   oveflow: hidden，auto，scroll

   约束规则：
   内部box会在垂直方向一个接一个的放置
   内部box垂直方向的距离有margin决定， 属于同一个bfc的两个相邻的box的margin会发生重叠， 不同bfc不会发生重叠
   每个元素的左外边距会与包含块的左边界想接触， 浮动元素也是如此。（bfc子元素不好超出他的包含块， 而position：absolute的元素可以超出他的包含块）
   bfc的区域不会与float的元素区域重叠
   计算bfc高度时，浮动子元素也参与计算

   作用： 
   bfc是页面上一个隔离的独立容器，容器内的子元素不会影响到外部元素

3. 手写Promise
   promise 有三个状态：pending, fulfilled, rejected
   new Promise时， 需传递一个executor()执行器
   executor 接受两个参数，resolve 和 reject
   Promise的默认状态是pending
   promise有一个value 保存成功状态的值
   promise有一个reason保存失败状态的值
   promise只能从pending->rejected或 从pending -> fufilled，状态一旦确认就不会更改
   promise必须有一个then方法， then接受两个参数， 分别是promise成功的回调onFufilled 和 promise失败的回调onRejected
   如果调用then时， promise已经成功，那么执行onFufilled, 参数是promise的value
   如果调用then时， promise已经失败，那么执行onRejected, 参数是promise的reason
   如果在then中抛出了异常， 那么会把这个异常作为参数， 传递给下一个then的失败的回调onRejected

4. reqestAnimationFrame 与 setTimeout 区别
   setTimeout 可以自己指定时间 rAf时浏览器刷新时间
              宏任务              主线程
5. 宏任务/微任务包含什么
   宏任务: setTimeout setInterval
   微任务: Promise
6. promise -> async -> generator
   解决地狱回调/使异步代码看起来像同步

7. flex:1 全写
   flex-grow / flex-shrink / flex-basis
