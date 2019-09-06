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

12.treeShaking
概念：一个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打包到bundle里面去，treeShaking 就是只把用到的方法打入bundle,没有的方法会在uglify阶段被擦除掉

webpack mode:production默认开始treeShaking

要求必须是Es6的语法，即通过import  export引用导出

DCE（Dead Code Elimination)
-代码不会被执行，不可到达
-代码执行的结果不会被用到
代码只会影响死变量（只写不读）

13.多页面打包构建
多页面应用概念：
每一次页面跳转的时候，后台服务器会返回一个新的html文档，这种类型的网站也就是多页网站，也叫做多页应用

多页面打包基本思路：
每个页面对应一个entry,一个html-webpack-plugin
缺点：每次新增或者删除页面需修改webpack配置

多页面打包通用方案
动态获取entry和设置html-webpack-plugin数量

利用glob.sync
const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))

const setMPA = () => {

    const entry = {};
    const htmlWebpackPlugins =[];

    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))

    

    Object.keys(entryFiles).map(( index ) => {
        const entryFile = entryFiles[index]
        // D:/My/webpack-pro/src/index/index.js
        // D:/My/webpack-pro/src/search/index.js
        const match = entryFile.match(/src\/(.*)\/index\.js/)
        const pageName = match && match[1]
        // index
        // search
        entry[pageName] = entryFile

        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template:path.join(__dirname,`src/${pageName}/index.html`),
                filename:`${pageName}.html`,
                chunks:[pageName],
                inject:true,
                minify:{
                    html5:true,
                    collapseWhitespace:true,
                    preserveLineBreaks:false,
                    minifyCSS:true,
                    minifyJS:true,
                    removeComments:true,
                }
            }),
        )
        
    })

    return {
        entry,
        htmlWebpackPlugins
    }

}

14.devtool source-map
使用source-map 定位到源代码 便于开发中debugger
关键字：
eval:使用eval包裹模块代码
source-map:产生.map文件
cheap:不包含列信息
inline:将.map文件作为DataURL嵌入，不单独生成.map文件
module:包含loader的sourcemap

15.scopeHoisting
现象：构建后代码存在大量闭包代码
会导致大量函数闭包包裹代码，导致体积增大（模块越多越明显）
运行代码时创建的函数作用域变多，内存开销变大
模块转换时 被webpack转换后的代码会带上一层包裹
import 会被转换成_webpack_require

scopeHoisting原理：
将所有模块代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以繁殖变量名冲突

通过scopeHoisting可以减少函数声明代码和内存开销

production下自动开启






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