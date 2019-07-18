---
title: React-router 
tags:
    - React-router 
categories: React
---

[git地址](https://github.com/bellakongqn/react-dnd-drag-demo.git)

1. React-router与React-router-dom的对比

<!-- more -->
  React-router：提供了router的核心api。如Router、Route、Switch等，但没有提供有关dom操作进行路由跳转的api；

  React-router-dom：提供了BrowserRouter、Route、Link等api，可以通过dom操作触发事件控制路由。

  我们使用只需要安装react-router-dom 即可，因为它包括了react-router

2. 具体应用

  - 安装react-router-dom 
    npm install react-router-dom

  - 在页面进行引入
    ```
    import { BrowserRouter as Router, Route,Link,Switch } from 'react-router-dom';
    ```

  - 设置相关路由，用Router将整个应用包裹起来

    ```
        <div>
            <Router>
            </Router>
        </div>
    ```

    进行点击触发设置

    ```
    <div>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/chat">Chat</Link></li>
              <li>
              <Link to="/drag">drag</Link>
              </li>
              
              <li>
                <Link to="/facc">FACC</Link>
              </li>
              <li>
                <Link to="/contextApi">ContextApi</Link>
              </li>
              <li>
                 <Link to="changeTheme">ChangeTheme</Link>
              </li>
              <li>
                <Link to="pureRedux">PureRedux</Link>
              </li>
              <li>
                <Link to="counter">Counter</Link>
              </li>
              <li>
              <Link to="reduxThunk">ReduxThunk</Link>
              </li>
                   
            </ul>
    <div>
    ```

    引入页面,设置对应路由页面

    ```
    <div>
              {/* 保证下面的route，即使有多个与路径匹配，也只有第一个会显示 */}
            <Switch>
              <Route path="/chat" render={() => <Chat/>} />
              {/* <Route path="/chat/" Component={Chat} /> */}
              <Route path="/drag" render={() => <DragDemo/>}/>
              <Route path="/drag" render={() => <About/>}/>
              <Route path="/about" render={() => <About/>} />
              <Route path="/facc" render={() => <Facc/>}/>
              <Route path="/contextApi"  render={() => <ContextApi/>} />
              <Route path="/changeTheme" render={() => <ChangeTheme/>} />
              <Route path="/pureRedux" render={() => <PureRedux/>} />
              <Route path="/counter" render={() => <Counter/>}  />
              <Route path="/reduxThunk" render={() => <ReduxThunk/>}  />
              </Switch>
    </div>
    ```

    整体代码：
    ```
    import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link,Switch } from 'react-router-dom';
import Chat from './HigerOrderComponent/Chat';
import DragDemo from './DragNew/DragDemo';
import Facc from './Facc/Index';
import ContextApi from './ContextApi/ContextApi';
import ChangeTheme from './ChangeTheme/ChangeTheme'
import PureRedux from './Redux/PureRedux';
import Counter from './Counter/Counter';
import ReduxThunk from './ReduxThunk/ReduxThunk';
import About from './Page/About';
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/chat">Chat</Link></li>
              <li>
              <Link to="/drag">drag</Link>
              </li>
              
              <li>
                <Link to="/facc">FACC</Link>
              </li>
              <li>
                <Link to="/contextApi">ContextApi</Link>
              </li>
              <li>
                 <Link to="changeTheme">ChangeTheme</Link>
              </li>
              <li>
                <Link to="pureRedux">PureRedux</Link>
              </li>
              <li>
                <Link to="counter">Counter</Link>
              </li>
              <li>
              <Link to="reduxThunk">ReduxThunk</Link>
              </li>
                
                
               
              
            </ul>
            <div>
              {/* 保证下面的route，即使有多个与路径匹配，也只有第一个会显示 */}
            <Switch>
              <Route path="/chat" render={() => <Chat/>} />
              {/* <Route path="/chat/" Component={Chat} /> */}
              <Route path="/drag" render={() => <DragDemo/>}/>
              <Route path="/drag" render={() => <About/>}/>
              <Route path="/about" render={() => <About/>} />
              <Route path="/facc" render={() => <Facc/>}/>
              <Route path="/contextApi"  render={() => <ContextApi/>} />
              <Route path="/changeTheme" render={() => <ChangeTheme/>} />
              <Route path="/pureRedux" render={() => <PureRedux/>} />
              <Route path="/counter" render={() => <Counter/>}  />
              <Route path="/reduxThunk" render={() => <ReduxThunk/>}  />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
    ```

页面整体目录结构

![](/assets/post-img/react-router-dom.png)

待更新问题

```
<Route path="/chat" render={() => <Chat/>} />
{/* <Route path="/chat/" Component={Chat} /> */}
```
设置路由组件时，用第二行代码总是不能展示出相关页面，查了资料暂时没有找到原因,待后期更新



