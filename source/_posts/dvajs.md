---
title: Dva.js
tags:
    - dva.js
categories: dva.js
thumbnail: '../assets/post-img/dva.jpg'
---
#### Dva.js的使用

dva 是dva 是 react 和 redux 的最佳实践，最核心的是提供了 app.model 

<!-- more -->
----------

dva初始化项目

1. 安装 dva-cli
npm install dva-cli -g

2. 创建项目：Dva-test项目名
dva new Dva-demo

3. 进入项目
cd Dva-test

4. 启动项目
npm  start

5. 启动界面
![](/assets/post-img/dva.png)


dva 目录结构

```
|── /mock/             # 数据mock的接口文件  
|—— /node_modules      # 安装的依赖
|── /src/              # 项目源码目录（我们开发的主要工作区域）   
|   |—— /assets/           # 项目的静态资源（图片之类的）
|   |── /components/   # 项目组件（用于路由组件内引用的可复用组件）   
|   |── /routes/       # 路由组件
|   |  |── route1.js  
|   |  |── route2.js   # 根据router.js中的设置，在不同的url下，加载不同的路由组件
|   |  └── route3.js    
|   |── /models/       # 数据模型（store，用于存储数据与方法）  
|   |  |── model1.js  
|   |  |── model2.js   # 选择分离为多个model模型
|   |  └── model3.js  
|   |── /services/     # 数据接口（处理前台页面的ajax请求，转发到后台）   
|   |── /utils/        # 工具函数   
|   |── router.js      # 路由配置（定义路由与对应的路由组件）  
|   |── index.js       # 入口文件  
|   |── index.less     # 样式
|   └── index.html     
```

抽离Model

功能都是以数据为基础，包括数据的展示以及操作：即查询、修改、删除、增加。