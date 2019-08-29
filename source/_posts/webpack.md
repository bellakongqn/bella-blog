---
title: webPack
tags:
    - webPack
categories: webPack
---

webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

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