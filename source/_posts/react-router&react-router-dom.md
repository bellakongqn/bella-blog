---
title: the Diff Between React-router And React-router-dom 
tags:
    - React-router 
categories: React
---

### react-router与react-router-dom使用时的区别
------

1、React-router与React-router-dom的API对比

React-router：提供了router的核心api。如Router、Route、Switch等，但没有提供有关dom操作进行路由跳转的api；

React-router-dom：提供了BrowserRouter、Route、Link等api，可以通过dom操作触发事件控制路由。
<!-- more -->
2、React-router与React-router-dom的功能对比

React-router：实现了路由的核心功能

React-router-dom：基于React-router，加入了一些在浏览器运行下的一些功能，

例如：Link组件会渲染一个a标签，

　　 BrowserRouter使用 HTML5 提供的 history API可以保证你的 UI 界面和 URL 保持同步，

　　 HashRouter使用 URL 的 hash 部分保证你的 UI 界面和 URL 保持同步

3、React-router与React-router-dom的写法对比

React-router不能通过操作dom控制路由，此时还需引入React-router-dom

import {Switch, Route, Router} from 'react-router';
import {HashHistory, Link} from 'react-router-dom';
React-router-dom在React-router的基础上扩展了可操作dom的api

import {Swtich, Route, Router, HashHistory, Link} from 'react-router-dom';
 
4、React-router与React-router-dom的路由跳转对比

React-router：router4.0以上版本用this.props.history.push('/path')实现跳转；

　　　　　　　router3.0以上版本用this.props.router.push('/path')实现跳转

React-router-dom：直接用this.props.history.push('/path')就可以实现跳转

总结：

　　在使用React的大多数情况下，我们会想要通过操作dom来控制路由，例如点击一个按钮完成跳转，这种时候使用React-router-dom就比较方便。


参考博客：
[https://www.cnblogs.com/menggirl23/p/10288477.html](https://www.cnblogs.com/menggirl23/p/10288477.html)
[https://blog.csdn.net/weixin_37242696/article/details/80738392](https://blog.csdn.net/weixin_37242696/article/details/80738392)