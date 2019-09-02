---
title: webPack
tags:
    - webPack
categories: webPack
---

webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

创建一个webpack配置

1.首先创建一个文件夹 （webpack-pro）
2.执行npm init -y (npm init 创建一个package.json文件 -y 全部选择默认项，当然也可以不写-y来进行设置)
3.npm install webpack webpack-cli --save-dev
(webpack 3版本之前webpack里集成了webpack-cli， 4之后的版本需要单独安装； --save-dev见注解)
4.在文件夹下新建一个文件名字必须叫 webpack.config.js（在里面进行配置）
5.webpack打包需要在webpack目录(node_modules/.bin/webpack)下允许，所以优化方式时在package.json里面script里面添加一行,因为package.json可以直接允许.bin,然后npm run dev 来进行打包
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack",
    //需要添加的一行dev...名字可以随便设置 即dev可以换成任意喜欢的，然后npm run (你设置的)
    // npm run dev 
  },


1.entry 
  入口 指定文件作为依赖图的开始
  单入口
  module.exports = {
    entry: './path/to/my/entry/file.js'
  };
  多入口
  module.exports = {
    entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    },
  };
2.output
  出口 告诉 webpack 在哪里输出它所创建的 bundles
  const path = require('path');
  // path Node.js用于操作文件路径
  module.exports = {
    entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    },
    output: {
            filename: '[name].js'
            path: path.resolve(__dirname, 'dist'),
            // 指定存放路径
        }
  };
3.loader
  loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块

  const config = {
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                        modules: true
                        //  对modules里的样式不会做出处理
                        }
                    }
                ]
            }
        ]
    }
   };

4.plugins 任何loaders无法做的都可以通过plugins
用于bundle文件的优化，资源管理和环境变量注入，作用于整个构建过程

5.mode 用来指定当前的构建环境




🐖：
npm install moduleName 命令
1. 安装模块到项目node_modules目录下。
2. 不会将模块依赖写入devDependencies或dependencies 节点。
3. 运行 npm install 初始化项目时不会下载模块。

npm install -g moduleName 命令
1. 安装模块到全局，不会在项目node_modules目录中保存模块包。
2. 不会将模块依赖写入devDependencies或dependencies 节点。
3. 运行 npm install 初始化项目时不会下载模块。

npm install -save moduleName 命令
1. 安装模块到项目node_modules目录下。
2. 会将模块依赖写入dependencies 节点。
3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
4. 运行npm install --production或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。

npm install -save-dev moduleName 命令
1. 安装模块到项目node_modules目录下。
2. 会将模块依赖写入devDependencies 节点。
3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
4. 运行npm install --production或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。

总结
devDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用的 gulp ，压缩css、js的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用 -save-dev 的形式安装。像 express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用 -save 的形式安装。