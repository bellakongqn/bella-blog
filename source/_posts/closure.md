---
title: 闭包
date: 2020-02-14 15：05：00
tags:
    - js
categories: js
---

> 闭包是指那些能够访问独立(自由)变量的函数 (变量在本地使用，但定义在一个封闭的作用域中)。换句话说，这些函数可以“记忆”它被创建时候的环境。

#### 要理解函数闭包，就要先知道这两条特性：

1. 函数外部的代码无法访问函数体内部的变量，而函数体内部的代码可以访问函数外部的变量。
2. 即使函数已经执行完毕，在执行期间创建的变量也不会被销毁，因此每运行一次函数就会在内存中留下一组变量。（js当然会有垃圾回收机制，不过如果它发现你正在使用闭包，则不会清理可能会用到的变量）
<!-- more -->
```
function outter() {
  var private= "I am private";
  function show() {
    console.log(private);
  }
  return show;
}

var ref = outter();
// console.log(private); // 尝试直接访问private会报错：private is not defined
ref(); // 打印I am private
```
我们调用了一次outter函数，产生了一组变量：private和show。要不是我们在outter最后一句返回了show，这两个变量就永远没办法被访问到了（因为函数外部的代码无法访问函数体内部的变量）。但是我们现在返回了show，并且ref是show的引用，这样我们就可以在函数体外部调用show了，而show又可以访问到private。

- 定义中的“独立(自由)变量”其实就是我们刚才说的私有成员，它们是独立（自由）的，是因为定义它的函数已经执行完毕！
- “变量在本地使用，但定义在一个封闭的作用域中”的意思是，自由变量可以在闭包函数中使用，但是自由变量并不是在闭包中定义的。
- “闭包函数可以“记忆”它被创建时候的环境”的意思是，outter执行的过程产生了一组变量，这些变量就是show被声明时候的环境。show可以记住这个环境（变量private），即使show离开了outter（被return到外部），它依然记得如何访问这个环境里的变量。

```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
这一次，makeAdder创建了一个闭包结构，传入的参数x就是执行期间创建的临时变量，它就相当于是私有成员（自由变量）。而公有成员是一个匿名函数，这个函数接受一个参数y，并将这个参数与闭包的私有成员x相加，返回结果。

这个例子有意思的地方在于：makeAdder调用了两次！每运行一次makeAdder就会在内存中产生一组变量（也就是一个“环境”），每一个“环境”虽然结构相同，都有私有成员x和公有成员函数，但是这两个“环境”是互不干涉的。在这个例子中，第一个环境中x=5，第二个环境中x=10。

利用闭包的特性，可以实现模块模式。用一个闭包函数包裹模块的代码，将不需要暴露的变量隐藏起来（好处是不会污染全局变量空间），将别人要调用的方法return出去，就可以实现模块化了

##### 常见的错误：在循环中创建闭包
```
...
<ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
    <li>第四项</li>
</ol>
...
window.onload = function() {  //  函数1
    var lis = document.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function() {  //  函数2
            alert(i);
        }
    }
}
```
不管我们点击哪一个li元素，都会显示3，而不是分别显示0到3的数字。这是为什么呢？
这是因为，函数2被声明了4次没错，但它们是在同一个环境中被声明的（都是在执行函数1的环境）！因此这四个函数2“记住”的是同一个i！当我们点击li元素时，循环早已完成，i停在了3。因此，我们不管点击哪一个li元素，总是会显示3。

既然我们已经知道了错误的原因，那么修改的思路也很明确了：四个onclick函数必须有自己“声明环境”！既然要产生4个“环境”，那么就说明必须有一个函数在for循环内运行，总共运行4次，每次的环境中都有一个变量private_i，分别等于0、1、2、3。
```
...
<ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
    <li>第四项</li>
</ol>
...
window.onload = function() {  //  函数1
    var lis = document.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = (function(private_i) {  //  函数2
            return function() {  //  函数3
                alert(private_i);
            }
        })(i);  //  这里将i作为参数，调用函数2
    }
}
```
注意赋值给onclick的并不是函数2，而是函数2的执行结果，也就是函数3。函数3内的private_i是函数2调用时所产生的，而函数2总共调用了4次，为4个函数3都分别留下了一个“环境”private_i，四个private_i分别是0、1、2、3。因此，点击4个li元素就会显示出4个不同的数字了

```
for (var i = 1; i <= 10; i++) {
	(function (j) {
		setTimeout(function () {
			console.log(j);
		}, 1000);
	})(i);
}
```

##### 闭包的应用
闭包的应用比较典型是定义模块，我们将操作函数暴露给外部，而细节隐藏在模块内部
```
function module() {
	var arr = [];
	function add(val) {
		if (typeof val == 'number') {
			arr.push(val);
		}
	}
	function get(index) {
		if (index < arr.length) {
			return arr[index]
		} else {
			return null;
		}
	}
	return {
		add: add,
		get: get
	}
}
var mod1 = module();
mod1.add(1);
mod1.add(2);
mod1.add('xxx');
console.log(mod1.get(2));
```

参考:
[https://www.jianshu.com/p/d7fbf97a0316](https://www.jianshu.com/p/d7fbf97a0316)
[https://juejin.im/post/5b081f8d6fb9a07a9b3664b6](https://juejin.im/post/5b081f8d6fb9a07a9b3664b6)