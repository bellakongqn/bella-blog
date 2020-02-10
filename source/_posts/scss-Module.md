---
title: scss
tags:
    - scss
categories: scss
thumbnail: '../assets/scss.jpg'
---

一、嵌套写法
```
.page{
    .content{
        .left-side{
            .profile{
                .name{
                    font-size: 2rem;
                }
                .age{
                    color: red;
                }
            }
        }
    }
}
```
二、属性值的复用——定义变量
```
$success-color: #dff0d8;
.success-bg{
    background: $success-color;
}
.success-panel{
    .panel-heading{
        background: $success-color;
    }
    .panel-body{
        border: 1px solid $success-color;
    }
}
```
三、文件级的复用——模块系统
```
@import "common";
@import "popup";
```
四、展示层的复用——混合指令
```
@mixin grey-border-radius{
    border: 1px solid #e3e3e3;
    border-radius: 2px;
}
.description{
    @include grey-border-radius;
    color: red;
}
.article{
    @include grey-border-radius;
    color: #444;
}
```
# 语义层的复用——继承机制
```
.msg{
    border: 1px solid #e3e3e3;
    background: #dff0d8;
}
.msg-success{
    @extend .msg;
    color: #4cae4c;
}
.msg-error{
    @extend .msg;
    color: #d43f3a;
}
```
--------
@mixin和@extend该如何选择
1.向Mixin传递样式片段
```
@mixin button {  
    font-size: 1em;  
    padding: 0.5em 1.0em;  
    text-decoration: none;  
    color: #fff;  
    @content;  
}

.button-green {  
    @include button {  
        background: green  
    }
}
```
2.变量作用域 和 内容片段
当一个内容片段传进mixin的时候，它的作用域是在定义它的地方，而不是在mixin里面。也就是说，传进去的内容片段不能使用在mixin中定义的变量。

```
$color: green;

@mixin button($color: #fff) {  
    color: $color;  
    @content;  
    border: 1px solid $color;  
}

.button-green {  
    @include button {background: $color;}  
}
```
在mixin中，$color变量的值是#fff。在传递给.button-green的内容片段中，$color将会使用在最外层定义的green值。

3.应该使用 @mixin 还是 @extend
```
.button {  
    background: green;  
}

.button-1 {  
    @extend .button;  
}

.button-2 {  
    @extend .button;  
}
```
编译结果
```
.button, 
.button-1, 
.button-2 {  
    background: green;  
}
```

```
@mixin button {  
    background-color: green;  
}
.button-1 {  
    @include button;  
} 
.button-2 {  
    @include button;  
}
```
编译结果
```
.button {  
    background-color: green;  
}

.button-1 {  
    background-color: green;  
}

.button-2 {  
    background-color: green;  
}
```
在大作数情况下@mixin会比@extend更好，但是它们俩都有自己的一席之地。当样式和选择器之间的关系在某些方面比较紧密的时候，使用@extend。除此之外，你可以使用@mixin在任何地方。

-------
# 用于复杂计算的函数
```
$baseFontSize: 20;
@function px2rem($val) {
  @return $val/$baseFontSize + rem;
}

.big-text{
    font-size: px2rem(30);
}
```