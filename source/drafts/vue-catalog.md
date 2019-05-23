---
title: Vue 项目结果解析
tags:
    - Vue
categories: Vue
thumbnail: '../assets/post-img/vue-catalog.png'
---

#### Vue项目结构

-----------

├── build --------------------------------- 项目构建(webpack)相关配置文件，配置参数，一般不用动 
│   ├── build.js -------------------------- webpack打包配置文件
│   ├── check-versions.js ------------------------------ 检查npm,nodejs版本
│   ├── utils.js --------------------------------------- 配置资源路径，配置css加载器
│   ├── vue-loader.conf.js ----------------------------- 配置css加载器等
│   ├── webpack.base.conf.js --------------------------- webpack基本配置
│   ├── webpack.dev.conf.js ---------------------------- 用于开发的webpack设置
│   ├── webpack.prod.conf.js --------------------------- 用于打包的webpack设置
├── config ---------------------------------- 配置目录，包括端口号
│   ├── dev.env.js -------------------------- 开发环境变量
│   ├── index.js ---------------------------- 项目配置文件
│   ├── prod.env.js ------------------------- 生产环境变量
├── node_modules ---------------------------- npm 加载的项目依赖模块
├── src ------------------------------------- 开发目录
│   ├── assets ------------------------------ 静态文件，放置一些图片
│   ├── components -------------------------- 组件目录，存放组件文件
│   ├── main.js ----------------------------- 主js
│   ├── App.vue ----------------------------- 项目入口组件
│   ├── router ------------------------------ 路由
├── static ---------------------------- 静态资源目录
├── .babelrc--------------------------------- babel配置文件
├── .editorconfig---------------------------- 编辑器配置
├── .gitignore------------------------------- 配置git可忽略的文件
├── index.html ------------------------------ 	首页入口文件，你可以添加一些 meta 信息或统计代码啥的。
├── package.json ---------------------------- node配置文件，记载着一些命令和依赖还有简要的项目描述信息 
├── .README.md------------------------------- 项目的说明文档，markdown 格式。想怎么写怎么写，不会写就参照github上star多的项目，看人家怎么写的

