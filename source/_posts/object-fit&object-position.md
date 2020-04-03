---
title: oject-fit & object-position & background-size & background-position
date: 2020-04-03 11:01:10
tags:
    - CSS
categories: CSS
thumbnail: '../assets/object-fit&background-size.png'
---
object-fit 指定可替换元素的内容对象在元素盒区域中的填充方式 有些类似于 background-size
object-position 指定可替换元素的内容对象在元素盒区域中的位置 类似于 background-position 
[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)
<!-- more -->

### object-fit: fill | contain | cover | none | scale-down;
fill: 默认值。被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。

contain: 被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，框会出现空白。

cover： 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。

none: 被替换的内容将保持其原有的尺寸。

scale-down: 内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。也就是内容框比替换内容实际尺寸小的时候，效果跟contain一致，因为此时contain的实际展示尺寸比none小。当内容框比换内容实际尺寸还大的时候，则效果跟none一致，因为此时none的实际展示尺寸比contain小。


### object-position
object-position 规定了可替换元素的内容，在其内容框中的位置。
使用 1 到 4 个值来定义该元素在它所处的二维平面中的定位。可以使用相对或绝对偏移。

### background-size
规定背景图像的尺寸
background-size: length|percentage|cover|contain;

length: 背景图像的高度和宽度.第一个值设置宽度，第二个值设置高度.如果只设置一个值，则第二个值会被设置为 "auto"
percentage: 父元素的百分比来设置背景图像的宽度和高度.
cover: 宽高比不变填充父元素
contain: 扩充至充满父元素，不保证宽高比

### background-position
设置背景图像的起始位置

top left|top center|top right....: 如果只规定了一个关键词，那么第二个值将是"center".默认值：0% 0%.

x% y%: 第一个值是水平位置，第二个值是垂直位置。左上角是 0% 0%。右下角是 100% 100%。如果只规定了一个值，另一个值将是 50%。

xpos ypos: 第一个值是水平位置，第二个值是垂直位置. 左上角是 0 0。单位是像素 (0px 0px) 或任何其他的 CSS 单位.如果您仅规定了一个值，另一个值将是50%.您可以混合使用 % 和 position 值.

### background-repeat

background-repeat: repeat|no-repeat|repeat-x|repeat-y|inherit

repeat: 默认 背景图像将在垂直方向和水平方向重复

no-repeat: 背景图像将仅显示一次

repeat-x|repeat-y: 背景图像将在水平|垂直方向重复

inherit: 从父元素继承 background-repeat 属性的设置

### background-attachment
设置背景图像是否固定或者随着页面的其余部分滚动

background-attachment: scroll | fixed | inherit

scroll:默认值。背景图像会随着页面其余部分的滚动而移动

fixed: 当页面的其余部分滚动时，背景图像不会移动

inherit: 从父元素继承 background-attachment 属性的设置