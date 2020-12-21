1. 文字超出
2. flex
3. Array.proptype.equals
```
Array.prototype.equals = function(other){
    if(this.length !== other.length) {
        return false
    }
    return Array.prototype.every((x, i) =>{ 
        x=== other[i]
    })
}   
console.log([1,2,3].equals([1,2,3,4]))
```
Array.prototype.reduce
```
Array.prototype.myReduce = function(fn, initValue){
  // 没有初始值并为空数组 报错
  if(initValue === undefined && !this.length) {
    throw new Error('myReduce of empty array with no initial value');
  }
  let res = initValue ? initValue : this[0]
  let i = initValue ? 0 : 1
  for(i; i< this.length ; i++) {
    res = fn(res, this[i], i, this)
  }
  return res
}
```
```
Array.isArray = function(arg){
    return Object.prototype.toString().call(arg) === '[object Array]'
}
```
4. 数组最大元素
5. border-radius 后 radius 部分会执行吗？

6. 箭头函数
 - 箭头函数无arguments 可以用rest代替
 - 箭头函数无prototype
    ```
    const F = () => {}
    console.log(F.prototype) // undefined
    ```
 - 箭头函数this会从自己的作用域链的上一层继承this
 - 由于箭头函数无this, 通过call, apply方法调用一个函数时，第一个参数将被忽略
 - 单行 可不加{} 多行 {return ...}
 ```
    var func = x => x * x;                  
    // 简写函数 省略return
    var func = (x, y) => { return x + y; }; 
    //常规编写 明确的返回值
 ```
 什么时候不可以使用箭头函数
  - 定义字面量方法
  ```
   const a ={
      array: [1, 2, 3],
      sum: () =>  {
        console.log(this === window);  // true
        return this.array.reduce((result, item) => result + item); //error
      }
      // 改为
      sum(){
        console.log(this === calculator); // => true
        return this.array.reduce((result, item) => result + item);
      }
  }
  ```
  - 定义原型方法
  ```
    function Cat(name){
      this.name = name
    }
    Cat.prototype.sayCatName = () => {
      console.log(this === window); // => true
      return this.name; // undefined
    }
    // 改为
    Cat.prototype.sayCatName() {
      console.log(this === cat); // => true
      return this.name; // undefined
    }
    const cat = new Cat('Mew');
    cat.sayCatName(); // => 'Mew'
  ```
  - 定义事件回调函数 
  ```
  const button = document.getElementById('myButton');
  button.addEventListener('click', () => {
      console.log(this === window); // => true
      this.innerHTML = 'Clicked button';
  });
  // 改为
  button.addEventListener('click', function() {
    console.log(this === button); // => true
    this.innerHTML = 'Clicked button';
  });
  ```



https://juejin.cn/post/6844903567967387656
https://segmentfault.com/a/1190000018017796
https://blog.fundebug.com/2019/09/16/anomalies-in-javascript-arrow-functions/
https://zhuanlan.zhihu.com/p/26540168
7. setTimeout 原理
8. Promise 捕获
9. generator
10. socket 原理
11. 闭包
12. 面向对象编程 工厂..模式
13. react 生命周期
14. react 创建组件的方法
15. this


16. Websocket 与 轮询 对于前端的区别
17. 遇到的难点 如何解决
查资料 -> 总结规律 -> 应用
18. 
[
   ['year', [2019,2020]],
   ['game', ['大话西游','阴阳师', '梦幻西游']],
   ['use',['bella','waytt']]
]
=> 
[
  'year=2019&game=大话西游&use=bella',
  'year=2020&game=大话西游&use=bella',
  'year=2019&game=阴阳师&use=bella',
  'year=2020&game=阴阳师&use=bella',
  'year=2019&game=梦幻西游&use=bella',
  'year=2020&game=梦幻西游&use=bella',const addParam = (res, param) => {
    const len = res.length
    const [ key, values ] = param
    if(len === 0) {
        return values.map(v => `${key}=${v}`)
    }else {
       return values.reduce((pre, cur)=>
            pre.concat(res.map(r => `${r}&${key}=${cur}`))
       ,[])
    }
} 

const generateURLs = (params) => {
    let res  = []
    params.forEach(param => {
        res = addParam(res ,param)
        console.log(res)
    })
}

generateURLs(
    [
        ['year', [2019,2020]],
        ['game', ['大话西游','阴阳师', '梦幻西游']],
        ['use', ['bella','waytt']]
    ]
)
  'year=2019&game=大话西游&use=waytt',
  'year=2020&game=大话西游&use=waytt',
  'year=2019&game=阴阳师&use=waytt',
  'year=2020&game=阴阳师&use=waytt',
  'year=2019&game=梦幻西游&use=waytt',
  'year=2020&game=梦幻西游&use=waytt'
]
```
const addParam = (res, param) => {
    const len = res.length
    const [ key, values ] = param
    if(len === 0) {
        return values.map(v => `${key}=${v}`)
    }else {
       return values.reduce((pre, cur)=>
            pre.concat(res.map(r => `${r}&${key}=${cur}`))
       ,[])
    }
} 

const generateURLs = (params) => {
    let res  = []
    params.forEach(param => {
        res = addParam(res ,param)
        console.log(res)
    })
}

generateURLs(
    [
        ['year', [2019,2020]],
        ['game', ['大话西游','阴阳师', '梦幻西游']],
        ['use',['bella','waytt']]
    ]
)
```
------------
1. hooks实现class 生命周期

  constuctor() => useState

  componentDidMount:
  ```
  useEffect(()=>{

  },[])
  ```

  ```
  componentDidUpdate:
  const mounted = useRef();
  useEffect(()=>{
    if(!mounted.current) {
      mounted.current = true;
    }else{
      console.log('I am didUpdate')
    }
  })
  ```
  componentWillUnmount: 
  ```
   useEffect(()=>{
     return ()=>{

     }
   },[])
  ```

2. 深拷贝 对象
```
JSON.parse(JSON.stringy(obj))
loadsh.deepclone
```
3. 排序 复杂度
4. 遍历二叉树 时间复杂度
5. 元素垂直居中
6. url 统一资源定位符 uri 统一资源标识符
7. bind call apply
call 与 apply 都可以改变函数执行时的上下文， 调用call 和 apply的对象 必须是一个函数， 区别是写法不太一样
call 第一个参数是一个对象， 不传默认window 
第二个参数开始， 可以接受任意个参数
function func(a,b,c){}
func.call(obj, 1,2,3) => 接受到的参数是1，2，3
func.call(obj, [1,2,3]) => 接受到的参数是[1,2,3] undefined undefined

apply 接受两个参数 第一个与call 一样，第二个必须是数组或者类数组
func.apply(obj, [1,2,3]) =>接受到的参数是1，2，3
func.apply(pbj, {
  0:1,
  1:2,
  2:3,
  length：3
}) => 参数是 1， 2，3

apply 妙用 Math.max.apply(null, array)

bind 创建一个新的函数，在调用是设置this关键字为提供的值
bind与call apply区别是bind的返回值是函数，并且需要稍后调用，才会执行 call apply是立即调用
function add(a, b) {
  return a+b
}
function sub(a,b) {
  return a-b
}
add.bind(sub, 5, 3)
add.bind(sub, 5, 3)() // 调用


401 403
401:未登录
403：没有权限

301 302
301：永久重定向
302：临时重定向
https://blog.csdn.net/ai2000ai/article/details/80242193
301 意味着客户端可以对结果进行缓存， 搜索引擎或者浏览器都可以把跳转后的地址缓存下来，下一次不必发送这个请求。
302 就是客户端必须请求原链接。

NAN === NAN
typeof NAN  // number
NAN 代表的是not a number 每个非数字值是不同的


实现一个new
```
/** 构造函数 */
function Person(name, age){
    console.log('2--------------')
    this.name = name
    this.age = age
}

function _new(contructor, ...args){
    // 继承构造函数的prototype
    const obj = Object.create (contructor.prototype)
    console.log('1--------------')
    // 执行构造函数 并绑定this到创建的对象
    contructor.apply(obj, args)
    console.log('3--------------')
    // 返回创建的对象 即实例
    return obj
}

_xm = _new(Person, 'xiaoming', 18)
console.log(_xm)
```

实现call
```
Function.prototype.myCall =  function(context) {
    if(typeof this !== 'function'){
        throw new TypeError('not function')
    }
    context = context || window
    // this 指函数 将this 作为context的属性
    context.fn = this
    const arg = [...arguments].slice(1)
    context.fn(...arg)
    delete context.fn
}

const name = 'bella';
const obj = {
    name: 'wyatt'
};

function fn() {
    console.log(this.name);
};
```

实现apply
```
```

