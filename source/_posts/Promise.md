---
title: Promise
date: 2020-03-23 12:10:10
tags:
    - Promise
categories: Promise
thumbnail: '../assets/Promise-Face.png'
---
### 构造函数
Promise 是异步编程的一种解决方案，其实是一个构造函数，自己身上有all、race、reject、resolve这几个方法
原型上有then、catch等方法
<!-- more -->
![](/assets/Promise.png)
#### Promise对象有以下两个特点
（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

#### new Promise
```
let p = new Promise( function(resolve, reject) {
    setTimeout(function(){
        console.log('执行完成Promise');
        resolve('要返回的数据');
	}, 2000);
})
```
执行了一个异步操作，也就是setTimeout，2秒后，输出“执行完成”，并且调用resolve方法
🐖：只是new了一个对象，并没有调用它，传进去的函数就已经执行了，这是需要注意的一个细节。所以用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数
```
function runAsync(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;            
}
runAsync()
```
刷新页面的时候是没有任何反映的，但是点击后控制台会出现log

当放在函数里面的时候只有调用的时候才会被执行
1、为什么要放在函数里面
2、resolve是个什么鬼

我们包装好的函数最后，会return出Promise对象，也就是说，执行这个函数我们得到了一个Promise对象。接下来就可以用Promise对象上有then、catch方法了，这就是Promise的强大之处了，看下面的代码
```

runAsync().then(function(data){
    console.log(data);
    //后面可以用传过来的数据做些其他操作
    //......
});
```
控制台
>点击方法被调用
执行完成Promise
要返回的数据 hd

先是方法被调用执行了promise,最后执行了promise的then方法，then方法是一个函数接受一个参数是接受resolve返回的数据这时就输出了'要返回的数据'

原来then里面的函数就跟我们平时的回调函数一个意思，能够在promiseClick这个异步任务执行完成之后被执行。这就是Promise的作用了，简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。

Promise的优势在于，可以在then方法中继续写Promise对象并返回，然后继续调用then来进行回调操作

```
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return runAsync3();
})
.then(function(data){
    console.log(data);
});
```
log
>异步任务1执行完成
随便什么数据1
异步任务2执行完成
随便什么数据2
异步任务3执行完成
随便什么数据3

runAsync1,runAsync2,runAsync3代码
```
function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;            
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;            
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;            
}
```
在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中就可以接收到数据了，比如我们把上面的代码修改成这样
```

runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log(data);
)}
```
log
>异步任务1执行完成
随便什么数据1
异步任务2执行完成
随便什么数据2
直接返回数据

### reject的用法
```

function getNumber(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            if(num<=5){
                resolve(num);
            }
            else{
                reject('数字太大了');
            }
        }, 2000);
    });
    return p;            
}
 
getNumber()
.then(
    function(data){
        console.log('resolved');
        console.log(data);
    }, 
    function(reason){
        console.log('rejected');
        console.log(reason);
    }
);
```
getNumber函数用来异步获取一个数字，2秒后执行完成，如果数字小于等于5，我们认为是“成功”了，调用resolve修改Promise的状态。否则我们认为是“失败”了，调用reject并传递一个参数，作为失败的原因。   运行getNumber并且在then中传了两个参数，then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调。所以我们能够分别拿到他们传过来的数据。多次运行这段代码，你会随机得到下面两种结果
log
>resolved 
1

>rejected
数字太大了

### catch的用法
我们知道Promise对象除了then方法，还有一个catch方法，它是做什么用的呢？其实它和then的第二个参数一样，用来指定reject的回调，用法是这样
```
getNumber()
.then(function(data){
    console.log('resolved');
    console.log(data);
})
.catch(function(reason){
    console.log('rejected');
    console.log(reason);
});
```
效果和写在then的第二个参数里面一样。不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。请看下面的代码
```
getNumber()
.then(function(data){
    console.log('resolved');
    console.log(data);
    console.log(somedata); //此处的somedata未定义
})
.catch(function(reason){
    console.log('rejected');
    console.log(reason);
});
```
在resolve的回调中，我们console.log(somedata);而somedata这个变量是没有被定义的。如果我们不用Promise，代码运行到这里就直接在控制台报错了，不往下运行了。但是在这里，会得到这样的结果

log
>resolved
1
somedata is not defined

也就是说进到catch方法里面去了，而且把错误原因传到了reason参数中。即便是有错误的代码也不会报错了，这与我们的try/catch语句有相同的功能

### all 的用法
Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。我们仍旧使用上面定义好的runAsync1、runAsync2、runAsync3这三个函数，看下面的例子
```
Promise
.all([runAsync1(), runAsync2(), runAsync3()])
.then(function(results){
    console.log(results);
});
```
Promise.all来执行，all接收一个数组参数，这组参数为需要执行异步操作的所有方法，里面的值最终都算返回Promise对象。
这样，三个异步操作的并行执行的，等到它们都执行完后才会进到then里面。
那么，三个异步操作返回的数据都在then里面，all会把所有异步操作的结果放进一个数组中传给then
然后再执行then方法的成功回调将结果接收，结果如下：（分别执行得到结果，all统一执行完三个函数并将值存在一个数组里面返回给then进行回调输出）

log
>异步任务1执行完成
异步任务2执行完成
异步任务3执行完成
['随便什么数据1', '随便什么数据2' ,'随便什么数据3']

这样以后就可以用all并行执行多个异步操作，并且在一个回调中处理所有的返回数据，比如你需要提前准备好所有数据才渲染页面的时候就可以使用all,执行多个异步操作将所有的数据处理好，再去渲染

### race的用法
all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race方法，这个词本来就是赛跑的意思。race的用法与all一样，我们把上面runAsync1的延时改为1秒来看一下
```
Promise
.race([runAsync1(), runAsync2(), runAsync3()])
.then(function(results){
    console.log(results);
});
```
这三个异步操作同样是并行执行的。结果你应该可以猜到，1秒后runAsync1已经执行完了，此时then里面的就执行了。结果是这样的
log
>异步任务1执行完成
随便什么数据1
异步任务2执行完成
异步任务3执行完成

在then里面的回调开始执行时，runAsync2()和runAsync3()并没有停止，仍旧再执行。于是再过1秒后，输出了他们结束的标志。   这个race有什么用呢？使用场景还是很多的，比如我们可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作，代码如下
```
//请求某个table数据
    function requestTableList(){
        var p = new Promise((resolve, reject) => {
               //去后台请求数据，这里可以是ajax,可以是axios,可以是fetch 
                resolve(res);
        });
        return p;
    }
  //延时函数，用于给请求计时 10s
      function timeout(){
          var p = new Promise((resolve, reject) => {
              setTimeout(() => {
                  reject('请求超时');
              }, 10000);
          });
          return p;
      }
Promise.race([requestTableList(), timeout()]).then((data) =>{
    //进行成功回调处理
    console.log(data);
}).catch((err) => {
    // 失败回调处理
        console.log(err);
});
```
requestTableList函数会异步请数据，timeout函数是一个延时5秒的异步操作。我们把这两个返回Promise对象的函数放进race，于是他俩就会赛跑，如果5秒之内数据请求成功了，那么遍进入then方法，执行正常的流程。如果5秒钟数据还未成功返回，那么timeout就跑赢了，则进入catch，报出“请求超时”的信息