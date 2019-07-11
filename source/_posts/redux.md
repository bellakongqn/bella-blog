---
title: Redux
tags:
    - Redux
categories: React
---
#### Redux 学习笔记
----------

Redux 学习笔记1

Redux 的存在让组件间通信变的更加容易，它应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 惟一改变 state 的办法是触发一个action，一个描述发生什么的对象。

 Redux三个特性：
 1. Signlie source of Truth 应用中所有数据都来源于store
 2. 可预测性 state + action = new state
 3. 纯函数更新state

Redux 学习笔记2

总体：Redux的基本概念 combineReducers bindActionCreators

首先要产生一个新的store,采用redux的createStore()方法来创建，createStore()方法接收一个参数，参数为一个reducer(后面介绍reducer)
const store = createStore(reducer)
它有三个方法
1. getState() 获取store里的值
2. dispatch(action) 将action dispatch 出去，给reducer使用
3. subscrible(listener) 监听store的变化

```
action:{
    type:'ADD_TODO',
    text:'new todo item'
}
```

reducer

```
function todoApp (state=initState,action){
    switch(action.type){
        case ADD_TODO :
        return Obiect.assign({},state,{
            todos:[
                ...state.todos,
                {
                    text:action.text,
                    compeleted:false
                }
            ]
        })
        break;
        default :
        return state;
    }
}
```

Redux 整体数据流

![](/assets/post-img/redux-dataSource.png)

Redux 的两个常用方法

1. combineReducers
2. bindActionCreators




