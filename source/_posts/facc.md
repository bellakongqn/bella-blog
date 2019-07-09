---
title: react 函数作为子组件
tags:
    - react
categories: react
thumbnail: '../assets/post-img/css.jpg'
---

### 函数作为子组件

“函数作为子组件” (Function as Child Component) 是一个组件，这个组件接收一个函数作为其子组件。由于 React 的属性(property) 类型，该模式可以简单地实现并且值得推广。

<!-- more -->

"函数作为子组件" 组件代码
```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// prop-types 定义参数类型限制

//  "函数作为子组件"是一个组件
class Facc extends Component {
    render() {
        return (
            <div>
                {this.props.children('Scuba Steve')}
                // 将'Scuba Steve'值赋给传入的函数从而再父组件内进行展示
            </div>
        );
    }
}

Facc.propTypes = {
    children: PropTypes.func.isRequired,
    // 传入的children必须为一个函数
  };

export default Facc;
```

引用该组件代码：
```
<Facc>
    {(name) => (
        <div>{name}</div>
    )}
</Facc>
```