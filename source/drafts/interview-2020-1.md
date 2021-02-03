1. let const var 区别
   var 声明的范围是函数作用域
   定义的变量会成为包含它的函数的局部变量，在函数调用后自动销毁。
   在函数内部定义时省略var操作符，可以创建一个全局变量
   var存在变量提升，会自动提升到函数作用域顶部。可多次声明同一个变量

   let声明的范围是块作用域
   不允许在同一个作用域内重复声明同一个变量
    ·暂时性死区- let 声明的变量不会在作用域内被提升
    ·全局声明- let在全局作用域中声明的变量不会成为window对象的属性， var声明的变量则会
    ·条件声明-  let 不能依赖条件声明
    ·for循环中的let 声明
   const 声明
    与let 基本相同，唯一重要区别是用它声明变量是必须同时初始化变量，且尝试修改const 声明的变量会导致错误

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

8. 判断js数据类型的方法
   typeof '' => string ❌: typeof null typeof [] => object
   instanceof 判断A 是否为B的实例 A instanceof B 检测的是原型
   constructor [].constructor === Array
   toString => Object.prototype.toString.call('') => "[object String]"

9. 防抖和节流
   防抖在事件被触发n秒后再执行回调, 如果在这n秒内又被触发,曾重新计时
   查询时, 用户不断输入, 用防抖来节约请求资源

   
   节流规定在一个单位时间内,只能触发一次.如果这个单位时间内触发多次,只有一次生效
   鼠标不断点击触发, 单位时间内只执行一次

10. React.component React.PureComponet React.memo 
   React.component 没有做任何渲染优化，在state/props/setState 均会render
   React.PureComponent 重写了shouldComponentUpdate， 对props 和state 做了浅层比较，当两者都没有发生变化时，不会触发render, 仅在类组件
   React.memo 为高阶组件， 如果你的组件在相同props的情况下渲染相同的结果，可以讲其包装在React.memo中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React将跳过渲染组件的操作并直接复用最近一次渲染的结果。 React.memo仅检查props变更。默认情况下其会对复杂对象做浅层对比，如果想要控制对比过程， 可以将自定义的比较函数通过第二个参数传入实现。
   ```
   function MyComponent(props) {
   /* 使用 props 渲染 */
   }
   function areEqual(prevProps, nextProps) {
      /*
      如果把 nextProps 传入 render 方法的返回结果与
      将 prevProps 传入 render 方法的返回结果一致则返回 true，
      否则返回 false
      */
   }
   export default React.memo(MyComponent, areEqual);
   ```
   与 class 组件中 shouldComponentUpdate() 方法不同的是，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反。

11. 三次握手/四次挥手
第一次SYN=1, seq=x
client发送一个SYN,指名client打算连接server的端口，以及初始序列号为x,发送完毕后，client进入SYN_SEND状态
第二次SYN=1, ACK=1, seq=y, ackNum = x+1
server发回确认包(ACK)应答。即 SYN 标志位和 ACK 标志位均为1。server端选择自己 ISN 序列号，放到 Seq 域里，同时将确认序号ackNum设置为客户的 ISN 加1，即X+1。 发送完毕后，server端进入 SYN_RCVD 状态。

第三次握手(ACK=1，ACKnum=y+1)
client再次发送确认包(ACK)，SYN 标志位为0，ACK 标志位为1，并且把server发来 ACK 的序号字段+1，放在确定字段中发送给对方，并且在数据段放写ISN的+1发送完毕后，client进入 ESTABLISHED 状态，当server端接收到这个包时，也进入 ESTABLISHED 状态，TCP 握手结束

四次挥手：
第一次 FIN=1 seq=x
client发送一个FIN，表示自己没有数据可以发送了，但是仍然可以接受数据。发送完毕后，client进入FIN_WAIT_1状态
第二次挥手 ACK=1 ackNum= x+1
server确认client的FIN包，发送一个确认包，表示自己已经接收到了client关闭连接的请求，但是还没有准备好关闭连接。发送完毕后，server进入CLOSE_WAIT状态，client接收到这个确认包之后，进入FIN_WAIT_2状态，等待server关闭连接。
第三次 FIN=1 seq=y
server 准备好关闭连接，向client发送结束请求，FIN置为1 发送完毕后，server进入LAST_ACK状态，等待来自client的最后一个ACK
第四次 ACK=1 ackNum= y+1
client收到server的关闭请求，发送一个确认包，并进去TIME_WAIT状态，等待可能出现的要求重传的ACK.server接收到这个确认包之后，关闭连接，进入CLOSED状态。 client等待了2MSL之后，没有收到server的ACK,认为server已经正常关闭连接，于是自己也关闭连接，进入CLOSES状态。

建立连接时，被动方服务器端结束CLOSED阶段进入“握手”阶段并不需要任何准备，可以直接返回SYN和ACK报文，开始建立连接。
释放连接时，被动方服务器，突然收到主动方客户端释放连接的请求时并不能立即释放连接，因为还有必要的数据需要处理，所以服务器先返回ACK确认收到报文，经过CLOSE-WAIT阶段准备好释放连接之后，才能返回FIN释放连接报文。

12. webscoket连接
先发送一个Upgrade  的请求， 收到101 Switching Protocols 切换协议

13. canvas svg
canvas js
svg html SVG更适合用来做动态交互

滴滴一面
闭包
react-diff
为什么会产生卡顿 js和浏览器渲染互斥
fiber requestIdeCallback 改变diff 树-> 链表
一帧 16ms
setState 同步还是异步
new做了哪些操作
css animation transition 区别
webpack loader plugin 区别
let const 暂时性死区
虚拟dom 与真实dom区别
react 新旧生命周期
ts 优缺点
hooks 为什么不能在判断里进行set hooks 顺序调用 会改变数据
是否看react 源码
```
function fun(n,o) { 
  console.log(o) 
  return {   
    fun:function(m){     
      return fun(m,n);   
    } 
  }
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3)
// undefined
// 0
// 0
// 0

```
https://segmentfault.com/a/1190000004187681




   
