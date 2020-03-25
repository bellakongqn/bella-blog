---
title: Redux
date: 2019-06-10 12:10:10
tags:
    - Redux
categories: React
---
#### Redux 学习笔记(二)  [git地址](https://github.com/bellakongqn/react-dnd-drag-demo.git)

Redux 断断续续学了好几天了，今天总算是学完了吧。

<!-- more -->

利用中间件进行异步请求，我的方法是从大框架开始搭起，然后慢慢的补全所需要的东西

1. 首先搭建一个容器组件

#### ReduxThunk.js

```
import React, { Component } from 'react';
import {Provider} from 'react-redux'
import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './Reducer';
import AsyncApp from './Index'

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
    )

class ReduxThunk extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        );
    }
}

export default ReduxThunk;
```
reducer采用的是外部引入的方式，所以接下来需要定义reducer，同时要用到异步请求，所以引用中间件redux-thunk,所以接下来就需要定义reducer和UI组件

2. 定义reducer

#### Reducer.js

```
import { combineReducers } from 'redux'
function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
  case "Select":
    return action.subreddit
  default:
    return state
  }
}


function posts( state = {items: []} , action) {
    switch (action.type) {
      case 'RECEIVE_POSTS':
        return Object.assign({}, state, {
          items: action.posts,
          lastUpdated: action.receivedAt
        })
      default:
        return state
    }
  }

const reducer = combineReducers({
    posts,
    selectedSubreddit
  })
  
  export default reducer
```

由于定义了两个reducer,所以引入了combineReducers(),将两个reducer合成一个reducer

reducer定义同样可以采用以下方式

```
const selectedSubreddit= (state = 'reactjs', action) => {
    switch (action.type) {
        case "Select":
        return action.subreddit
        default:
        return state
    }
}
```
3. UI组件

#### Index.js

```
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {fetchPosts} from './Actions'
 
class Index extends Component {
    render() {   
        const {selectedSubreddit,posts,fetchPosts } = this.props
        console.log(posts)
        return (
            <div>
                {selectedSubreddit}
                <a href='#'
                    onClick={()=>fetchPosts(selectedSubreddit)}>
                    Refresh
                    </a>
                <ul>
                    {posts.items.map(item => (
                        <li key={item.id}>{item.data.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        selectedSubreddit: state.selectedSubreddit,
        posts:state.posts
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchPosts,
        // ....其它action
    },dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Index);
```

bindActionCreators()是为了从引入多个action,将UI组件与容器组件挂载起来，引入connet,利用mapStateToProps() 和 mapDispatchToProps() 来链接store

展示：
![](/assets/post-img/display.png)

采用从外界引入action,所以接下来需要action

4. Action

#### Action.js

```
import fetch from 'cross-fetch'
// https://www.reddit.com/r/${subreddit}.json


// 异步请求关键代码
export function fetchPosts(subreddit) {

    // dispatch(requestPosts(subreddit)); 异步操作开始，可写可不写 根据需要
    return dispatch => {
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
          .then(response => response.json())
          .then(json => dispatch(receivePosts(subreddit, json)))
      }
  }

  function receivePosts(subreddit, json) {
    return {
      type: 'RECEIVE_POSTS',
      subreddit,
      posts: json.data.children,
      receivedAt: Date.now()
    }
  }
```
结果
![](/assets/post-img/result.png)

目录结果
![](/assets/post-img/redux-thunk.png)









