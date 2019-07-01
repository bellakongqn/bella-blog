---
title: 前端面试
tags:
    - HTML5
    - CSS
    - Javascript
categories: 面试
thumbnail: '../assets/post-img/interview.jpg'
---
#### CSS

----------

css隐藏元素的[方法](https://juejin.im/post/584b645a128fe10058a0d625#heading-9):

<!-- more -->
1.overflow:hidden 将溢出的部分进行隐藏

2.opacity:0 将元素的透明度设为0从而将元素进行隐藏，但该元素仍占据空间

3.visibility:hidden  visibility属性规定元素是否可见，占据空间不显示内容

4.display:none 最为常用的一种隐藏元素的方法，不占据空间不现实内容

5.position:absolute 将元素定位到不可见的位置，可以对元素进行一些交互设计

6.clip(clip-path):rect()/inset()/polygon() 将元素裁剪来（未使用过，想了解可以查看[clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path))

7.z-index:-1000 通过其他元素来覆盖元素实现不显示

8.transform:scaleY(0) 调整大小沿y轴（垂直方向）的元素的转变来隐藏元素

[flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

属性：
1.flex-direction 属性决定主轴的方向（即项目的排列方向）值可以为：
row(水平排列，开始点在左侧) | row-reverserow(水平排列，开始点在右侧) | column row(垂直排列，起点在上)| column-reverse(垂直排列，起点在下);

2.flex-wrap 如果一条轴线排不下，如何换行 值可以为：
nowrap(不换行)| wrap (换行，第一行在上方)| wrap-reverse(换行，第一行在下方)
3.flex-flow 属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

4.justify-content 属性定义了项目在主轴上的对齐方式 值可以为：
flex-start (左对齐)| flex-end (右对齐)| center (居中)| space-between(两端对齐，项目之间的间隔都相等) | space-around(每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。)

5.align-items 属性定义项目在交叉轴上如何对齐 值可以为：
具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。
flex-start(交叉轴的起点对齐) | flex-end(交叉轴的终点对齐) | center(交叉轴的中点对齐) | baseline(项目的第一行文字的基线对齐) | stretch(如果项目未设置高度或设为auto，将占满整个容器的高度)

6.align-content align-content属性
如果项目只有一根轴线，该属性不起作用。
flex-start(与交叉轴的起点对齐) | flex-end(与交叉轴的终点对齐) | center(与交叉轴的中点对齐) | space-between(与交叉轴两端对齐，轴线之间的间隔平均分布) | space-around(每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍) | stretch(轴线占满整个交叉轴)

行元素与块元素区别

> 1.行内元素会在一条直线上排列（默认宽度只与内容有关），都是同一行的，水平方向排列。
    块级元素各占据一行（默认宽度是它本身父容器的100%（和父元素的宽度一致），与内容无关），垂直方向排列。块级元素从新行开始，结束接着一个断行。
>
> 2.块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素，只能包含文本或者其它行内元素。
>
> 3.行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置width无效，height无效(可以设置line-height)，margin上下无效，padding上下无效

inline/block/inline-block 区别

display:block
> 1.block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
> 2.block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
> 3.block元素可以设置margin和padding属性。

display:inline
> 1.inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
> 2.inline元素设置width,height属性无效。
> 3.inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top,margin-bottom不会产生边距效果。

display:inline-block
> 1.简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。

盒子模型：标准盒模型+怪异盒模型
 1. 标准盒模型
 ![](/assets/post-img/content-box.png)
 盒子的总宽度为:一个块的总宽度= width + margin(左右) + padding(左右) + border(左右)
 2. 怪异盒模型
 ![](/assets/post-img/border-box.png)
 一个块的总宽度= width + margin(左右)（即width已经包含了padding和border值)
 通过box-sizing 属性来设置采用哪种盒子模型
 box-sizing : content-box || border-box || inherit;
 当为content-box时，将采取标准模式进行解析计算
 当为border-box时，将采取怪异模式解析计算
 当为inherit时，将从父元素来继承box-sizing属性的值


#### HTML5

-----------

HTML5新标签
1.更多语义化的标签 比如：<article> <dialog> <footer> <header>  <nav>等

2.用于绘画的 canvas 元素 以及SVG 用于媒介回放的 video 和 audio 元素

  拖拽(Drag 和 drop) 地理定位(Geolocation)

  对本地离线存储的更好的支持
3.圆角 、阴影、 渐变 、 伪元素 、 媒体查询 

#### Javascript

------------

js基本数据类型：
object/number/string/boolean/undefined/function

js对数组的操作
map() 对数组进行遍历，用法:
```
value.map((item, index) => (
            <span key={index}>item</span>
        ))
```
filter() 对数组进行过滤，输出满足条件的元素组成一个新数组，不会改变原数组
```
list: data.filter(
        ({ id }) => id !== 1,
    ),
```
forEach() 对数组进行遍历
reduce()  对数组的值进行累计

几种排序：
冒泡排序、插入排序、选择排序、归并排序、快速排序


