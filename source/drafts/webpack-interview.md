1. loader 与 plugins 区别
While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。
plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。loader不能做的都由它来实现，以此增强webpack的功能。plugin作用于整个过程。

2. webpack 构建流程
初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

3. 文件指纹
文件指纹是打包后输出的文件名的后缀。

Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
Chunkhash：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

Entry： 入口。webpack 执行构建第一步将从Entry开始，可抽象成输入。
Module: 模块，在webpack 里一切皆模块，一个模块对应着一个文件。webpack会从配置的entry开始递归找出所有依赖的模块。
Chunk：代码块，一个chunk由多个模块组合而成，用于代码合并与分割。
Loader: 模块转换器，用于把模块原内容按照需求转换成新内容。
Plugin：扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或者做你想要做的事情。
Output: 输出结果，在webpack经过一系列处理变并得出最终想要的代码后输出结果。

webpack启动后会从entry里配置的Module开始递归解析entry依赖的所有module。每找到一个module,就会根据配置的loader去找出对应的转换规则，对module进行转换后，再解析出当前module依赖的module，这些模块会以entry为单位进行分组，一个entry和其所依赖的module被分到一个组也就是一个chunk。最后webpack会把所有的chunk转换成文件输出。在整个流程中webpack会在恰当的时机执行plugin里定义的逻辑。

```
resolve:{
  alias:{
    components: './src/components/'
  }
}
```

有哪些常见的Loader？你用过哪些Loader？
有哪些常见的Plugin？你用过哪些Plugin？
那你再说一说Loader和Plugin的区别？
Webpack构建流程简单说一下？
使用webpack开发时，你用过哪些可以提高效率的插件？
source map是什么？生产环境怎么用？
模块打包原理知道吗？
文件监听原理呢？
说一下 Webpack 的热更新原理吧？
如何对bundle体积进行监控和分析？
文件指纹是什么？怎么用？
在实际工程中，配置文件上百行乃是常事，如何保证各个loader按照预想方式工作？
如何优化 Webpack 的构建速度？
那代码分割的本质是什么？有什么意义呢？
是否写过Loader？简单描述一下编写loader的思路？
是否写过Plugin？简单描述一下编写Plugin的思路？
聊一聊Babel原理吧？
https://webpack.wuhaolin.cn/
https://juejin.im/post/5e6f4b4e6fb9a07cd443d4a5