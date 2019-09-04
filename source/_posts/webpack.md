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

6.文件指纹 主要用于做版本管
文件指纹就是文件打包输出文件名的后缀 Hash，Chunkhash，Contenthash
Hash:和整个项目的构建有关，只要项目文件有修改，整个项目的Hash就会更改
ChunkHash:和webpack打包的chunk有关，不同的entry会生成不同的chunkHash
ContentHash:根据文件内容来定义hash,文件内容不变，则contentHash不变

js指纹设置采用chunkHash 设置output的filename   filename: '[name]_[chunkHash:8].js'

css指纹设置采用contentHash 设置MiniCssExtractPlugin的 filename 
new MiniCssExtractPlugin({
            filename:'[name]_[contentHash:8].css'
}),
{test:/.css$/, use:[MiniCssExtractPlugin.loader, 'css-loader']},

图片指纹设置采用hash 设置file-loader的name
 {test:/.(png|jpg|svg|gif)$/, use:[
                {loader:'file-loader',
                 options:{
                     name:'[name]_[hash:8].[ext]'
                 }}
  ]}


7.代码压缩
js压缩const uglify = require('uglifyjs-webpack-plugin');
webpack内置uglifyjs-webpack-plugin来压缩js文件

html压缩const HtmlWebpackPlugin = require('html-webpack-plugin')
new HtmlWebpackPlugin({
    template:path.join(__dirname,'src/search.html'),  // 模板地址
    filename:'search.html',  //文件名
    chunks:['search'],  引入的js
    inject:true,  //将js文件插入body的底部 "body" == true "head"：表示将js文件插入在head标签内 false 不插入。
    // minify的作用是对生成的html文件进行压缩，其值是一个object或者false。默认是false，表示不对html文件进行压缩。如果赋值为object，用于对压缩方式进行配置
    minify:{
        html5:true,
        collapseWhitespace:true,
        preserveLineBreaks:false,
        minifyCSS:true,
        minifyJS:true,
        removeComments:true,
    }
})

css压缩const MiniCssExtractPlugin = require('mini-css-extract-plugin');
new OptimizeCssAssetsWebpackPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: require('cssnano')
})

8.打包前清理源目录文件 clean-webpack-plugin
每次打包，都会生成项目的静态资源，随着某些文件的增删，我们的 dist 目录下可能产生一些不再使用的静态资源，webpack并不会自动判断哪些是需要的资源，为了不让这些旧文件也部署到生产环境上占用空间，所以在 webpack 打包前最好能清理 dist 目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// webpack4.0以上需要这么引用 不然会报错 CleanWebpackPlugin is not a constructor 
  module.exports = {
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ]
};

9.postCss插件autoprefixer自动补齐css前缀 npm i postcss-loader autoprefixer -D
postcss-loader 执行顺序必须保证在 css-loader 之前，建议还是放在 less或者 sass 等预处理器之后更好。即 loader 顺序：
less-loader -> postcss-loader -> css-loader -> style-loader 或者 MiniCssExtractPlugin.loader。其实 postcss-loader 放在 less-loader 之前问题也不大，平时使用的 less 里面的语法基本不会和 autoprefixer 处理产生冲突的
{
  test: /.less$/,
  use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'less-loader',
      {
          loader: 'postcss-loader',
          options: {
              plugins: () => [
                  require('autoprefixer') ({
                      overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']   // last 2 version为兼容浏览器最后两个版本。
                  })
              ]
          }
      }
  ]
}

10.移动端css px自动转换成rem rem: font-size of the root element  
rem是相对单位 px是绝对单位
安装lib-flexible(动态计算根元素数值），px2rem-loader（转换为rem)
{
    loader:'px2rem-loader',
    options:{
        remUnit: 75,
        // x2rem-loader 的 remUnit 选项意思是 1rem=多少像素，
        // 结合 lib-flexible 的方案，我们将 px2remLoader 的 options.remUnit 
        // 设置成设计稿宽度的 1/10，这里我们假设设计稿宽为 750px
        remPrecesion:8
        // px-rem小数点后面的位数
    }
}
引入lib-flexible计算根元素

之前处理方式 ：css媒体查询实现响应式布局
@media screen and (max-width: 700px) {
    body {
        background-color:lightblue;
    }
}

11.资源内联
代码层面：页面框架初始化脚本；上报相关打点；css内联避免页面闪动（rem需要页面一加载就开始计算）
请求层面 减少HTTP网络请求数（小图片或者字体内联）（url-loader limit)
raw-loader@0.5.1
在文件内引入所需资源
<!DOCTYPE html>
<html lang="en">
<head>
    ${require("raw-loader!./meta.html")}
    <title>Document</title>
    <script>${require("raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js")}</script>
</head>
<body>
    
</body>
</html>




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