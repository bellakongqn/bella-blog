---
title: React 创建组件的三种方法
date: 2019-08-10 12:10:10
tags:
    - React
categories: React
---

React 创建组件存在三种方式
1. 函数式定义的无状态组件
2. es5原生方式React.createClass定义的组件
3. es6形式的extends React.Component定义的组件

<!-- more -->

无状态函数式组件
创建无状态函数式组件形式是从React 0.14版本开始出现的。它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到要state状态的操作。具体的无状态函数式组件，其官方指出：

> 在大部分React代码中，大多数组件被写成无状态的组件，通过简单组合可以构建成其他的组件等,这种通过多个简单然后合并成一个大应用的设计模式被提倡。

无状态函数式组件形式上表现为一个只带有一个render方法的组件类，通过函数形式或者ES6 箭头 function的形式在创建，并且该组件是无state状态的。具体的创建形式如下：

函数形式创建
```
import React from 'react'
function FunctionC(props){
    return(
         <div> Hello {props.name}</div>
    )
}

export default FunctionC;
```
ES6 箭头函数创建

```

import React from 'react'
const FunctionC =(props) =>{
    return(
                 <div> Hello {props.name}</div>
            )
}

export default FunctionC;
```

调用
```
 <FunctionC name="haha" />
```

无状态组件的创建形式使代码的可读性更好，并且减少了大量冗余的代码，精简至只有一个render方法，大大的增强了编写一个组件的便利，除此之外无状态组件还有以下几个显著的特点：

1. 组件不会被实例化，整体渲染性能得到提升
   因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。

2. 组件不能访问this对象
   无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：this.ref、this.state等均不能访问。若想访问就不能使用这种形式来创建组件

3. 组件无法访问生命周期的方法
   因为无状态组件是不需要组件生命周期管理和状态管理，所以底层实现这种形式的组件时是不会实现组件的生命周期方法。所以无状态组件是不能参与组件的各个生命周期管理的。

4. 无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用

🐅:无状态组件被鼓励在大型项目中尽可能以简单的写法来分割原本庞大的组件，未来React也会这种面向无状态组件在譬如无意义的检查和内存分配领域进行一系列优化，所以只要有可能，尽量使用无状态组件。

React.createClass是react刚开始推荐的创建组件的方式，目前不被推荐，不再赘述

React.Component是以ES6的形式来创建react的组件的，是React目前极为推荐的创建有状态组件的方式,React.Component形式如下:
```
import React, { Component } from 'react';

export default class Es6 extends Component {

    constructor(props) {
        super(props);
        // 设置 initial state
        this.state = {
            text: props.initialValue || 'placeholder'
        };
    }
    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange}
               value={this.state.text} />
            </div>
        );
    }
}

```

引用：
```
  <Es6  initialValue={'ejwrg'}/>
```

React.Component创建的组件，其成员函数不会自动绑定this，需要开发者手动绑定，否则this不能获取当前组件实例对象。
绑定this的四种方法:
1. 构造函数中绑定
```
// 调用
<input onChange={this.handleChange}
               value={this.state.text} />

// 绑定
constructor(props) {
   super(props);
   this.handleClick = this.handleClick.bind(this); 
}

// 定义
handleClick(){
    // ...
}
```

2. 使用bind来绑定
```
// 调用
<div onClick={this.handleClick.bind(this)}></div> 

// 定义
handleClick(){
    // ...
}
```

3. 使用箭头函数绑定
```
// 调用绑定
<div onClick={()=>this.handleClick()}></div> 

// 定义
handleClick(){
    // ...
}
```

4. 箭头函数定义

```
// 调用绑定
<div onClick={his.handleClick}></div> 

// 定义
handleClick =() =>{
    // ...
}
```

组件定义方式
1、只要有可能，尽量使用无状态组件创建形式。
2、否则（如需要state、生命周期方法等），使用`React.Component`这种es6形式创建组件

参考博客:
[https://www.cnblogs.com/soyxiaobi/p/9573767.html](https://www.cnblogs.com/soyxiaobi/p/9573767.html)
