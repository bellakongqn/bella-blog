---
title: react 高阶组件
date: 2019-06-12 12:10:10
tags:
    - react
categories: react
thumbnail: '../assets/post-img/css.jpg'
---

### 高阶组件定义
> a higher-order component is a function that takes a component and returns a new component.
<!-- more -->
高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。
它存在的意义就是避免重复写书写代码：

比如：一个项目中很多处需要获取当前时间，我们没有必要在每一个组件内书写一个计数器函数，因为可以采用高阶组件来解决
讲需要添加计时器功能的组件作为参数传给高阶组件，从而给该组件添加一个计数器功能
具体代码实现（注释详）封装一个计数器的高阶组件
```
import React from 'react';

// 高阶组件就是一个纯函数
export default function withTimer(PropsComponent){
    // PropsComponent 下一行可见 该函数返回一个组件
    return class extends React.Component{
        state= {
            time:new Date()
        };
        componentDidMount(){
            this.timerId = setInterval(()=>this.tick(),1000);
        }
        componentWillUnmount(){
            clearInterval(this.timerId);
        }
        tick(){
            this.setState({
                time:new Date()
            })
        }

        render(){
            // 该高阶组件render()函数内没有做任何操作
            // 只是给传入的组件增加了一个计时器属性
            //   {...this.props} 为传入组件接受外界传入的参数
            return <PropsComponent time={this.state.time} {...this.props} />
        }
    }
}
```
调用该高阶组件
```
import React, { Component } from 'react';
import withTimer from './WithTimer'
// 引入高阶组件

class Chat extends Component {
    render() {
        return (
            <div>
                <div>dhgcwkuy</div>
                {this.props.time.toLocaleString()}
            </div>
        );
    }
}

// 不单纯单出组件， 而是采用withTimer(Chat)，用高阶组件将组件包裹导出
export default withTimer(Chat);
```



