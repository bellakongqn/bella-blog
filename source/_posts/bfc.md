---
title: BFC的概念和应用
date: 2020-04-29 13:15:00
tags:
    - css
categories: css
---
Formatting context(格式化上下文)
BFC：Block Formatting Contexts (块级格式化上下文)
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性

触发BFC
只要元素满足下面任一条件即可触发 BFC 特性：
- body 根元素
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

1. 同一个 BFC 下外边距会发生折叠
```
<div style="width:100px;height:100px;background:red;margin:20px;"></div>
<div style="overflow:auto">
    <div style="width:100px;height:100px;background:blue;margin:20px;"></div>
</div>
```
2. BFC 可以包含浮动的元素（清除浮动）
```
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```
3. BFC 可以阻止元素被浮动元素覆盖
```
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```
