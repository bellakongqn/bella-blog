---
title: import
tags:
    - import
categories: javascript
thumbnail: '../assets/post-img/css.jpg'
---

### import 与 import {} 区别

import 与 import {} 区别
// export default A.js
export default A.js

// export 
export const A=2
import
不使用{}来引用模块的情况下，import模块时的命名是随意的，即如下三种引用命名都是正确的；
它总是会解析到A.js中默认的export default。
其余文件中引用A.js
import A from './A'
import MyA from './A'
import Something from './A'

import {}
import使用花括号{},下面代码生效的前提是，只有在模块A.js中有命名导出为A的export A的代码

import { A } from './A'                 
// 正确，因为A.js中有命名为A的export
import { myA } from './A'               
// 错误！因为A.js中没有命名为myA的export
import { Something } from './A'         
// 错误！因为A.js中没有命名为Something的export

注：
1.export与export default均可用于导出常量、函数、文件、模块等

2.在一个文件或模块中，export  、import可以有多个，export default仅有一个

3.通过export方式导出，在导入时要加{ }，export default则不需要

4.export能直接导出变量表达式，export default不行

5.export default 导出的文件import时可以更换名称，export导出的文件import时必须保证名称相同


