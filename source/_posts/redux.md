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


Redux 学习笔记3 

基本概念+++

1. Store 

保存数据的地方，一个应用只能有一个store,Redux 提供createStore这个函数，用来生成 Store。

```
import { createStore } from 'redux';
const store = createStore(fn);
```

createStore它接收一个函数作为参数，返回新生成的 Store 对象。

2. State 

> Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。当前时刻的 State，可以通过store.getState()拿到。

```
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
```

3. Action

State 改变会导致 View 变化 ，用户通过触发 View 上的 Action 来改变 state, action 是一个对象，必须包括type属性
```
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

4. Action Creator

用来生产action的一个函数

```
function addTodo(text){
   type:'ADD_TODO',
   payload:{text}
}
```

5. store.dispatch()

store.dispatch()是 View 发出 Action 的唯一方法。

```
store.dispatch(addTodo('Learn Redux'));
```

6. Reducer

> Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```
const initState = { count:0 };
// reducer
const counter = (state = initState,action) =>{
    switch (action.type) {
        case "PLUS_ONE":
            return{count: state.count+1};
        case "MINUS_ONE":
                return{count: state.count-1};
        case "CUSTOM_COUNT":
                return { counter: state.count+ action.payload.count };
        default:
            break;
    }
    return state
}
```

store.dispatch方法会触发 Reducer 的自动执行,因此 Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。

```
const store = createStore(counter)
```

7. 纯函数 reducer 是一个纯函数

Reducer 函数里面不能改变 State，必须返回一个全新的对象

8. store.subscribe()
 
可以直接监听到state的变化 ，unsubscribe()来接触监听

Redux 学习笔记4

1. Store 的实现

它提供了三个方法
  - store.getState()  
  - store.dispatch()
  - store.subscribe()

2. Reducer 的拆分 combineReducers

Reducer 函数负责生成 State，数据多的时候 reducer 变的十分庞大，可以使用 combineReducers 进行将reducer 拆分

(下面写法前提 State 的属性名必须与子 Reducer 同名)

```
import { combineReducers } from 'redux';

const userName = (state={},action) =>{
    ....
}

const avatar = (state={},action)=>{
    ...
}

const password = (state={},action) =>{
    ...
}

const store = createStore( combineReducers({
        userName,
        avatar,
        password,
}))

```

你可以把所有子 Reducer 放在一个文件里面，然后统一引入。


import { combineReducers } from 'redux'
import * as reducers from './reducers'

const reducer = createStore( combineReducers(reducers))

![](/assets/post-img/redux-data-flow.png)

Redux 学习笔记5

react-redux 

> React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

React-Redux 提供connect() 方法来将UI组件与容器组件连接起来

```
import { connect } from 'react-redux'
const ConnectdCounter = connect(mapStateToProps,mapDispatchToProps)(Counter);
```
Counter 是UI组件， ConnectdCounter是由 React-Redux 通过connect方法自动生成的容器组件。

connect 接收两个参数mapStateToProps  mapDispatchToProps

mapStateToProps 建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。

```
function mapStateToProps(state){
    return{
        count: state.count
    }
}
```

mapDispatchToProps() 用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。

```
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        plusOne,
        minusOne
    },dispatch)
}
```

bindActionCreators() 使用 dispatch 把每个 action creator 包围起来，这样可以直接调用它们。

```
plusOne();
minusOne()
```

<Provider> 组件

```
import { connect,Provider } from 'react-redux';
<Provider store={store}>
    <ConnectdCounter />
</Provider>
```
这样Provider包裹的所有子组件都可以使用store里面的数据,原理类似contextApi














