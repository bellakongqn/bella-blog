---
title: Redux
tags:
    - Redux
categories: React
---

同步
1.创建store
  Provider 传入整个store,相当于未整个组件创建一个context,在组件内部引入context,即后面提到的connect
2.拆分reducers
  设置函数功能比如（增加一条备忘录，修改备忘录状态）
3.引入拆分actions
  页面按需要引入不同的actions，比如新增引入addTodo action type="" 与reducers中的case进行对比
4.容器组件
  
5.父组件(传入store)
  使得下面包含的所有组件均可以connect来连接store
  
6.组件connect(mapStateToProps,mapDispatchToProps)
  connect()来连接store 
  
  mapStateToProps
  mapStateToProps是一个函数，它接受state作为参数，返回一个对象(store中的部分值)
  connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。

  mapDispatchToProps 
  bindActionCreators 帮助dispatch出去方法
  mapDispatchToProps用于建立组件跟store.dispatch的映射关系,可以是一个object，也可以传入函数 
  如果mapDispatchToProps是一个函数，它可以传入dispatch,ownProps, 定义UI组件如何发出action，实际上就是要调用dispatch这个方法

异步
1.异步知道dispatch三种action (通知reducer开始请求 请求成功 请求失败)
  action内部调用接口
2.fetch方法调用接口




