---
title: css3动画属性详解 
date: 2020-03-10 12:10:10
tags:
    - css
categories: css
---
### 关于CSS3制作动画的几个属性：变形(transform)、转换(transition)和动画(animation)

-----

### 一、transform

#### 属性：

旋转 rotate() 以中心为原点
扭曲|倾斜 skew( skewX(x), skewY(y), skew(x,y) )
缩放 scale( scaleX(x), scaleY(y), scale(x,y) )
移动 translate( translateX, translateY )
矩阵变形 matrix
<!-- more -->

#### 各个属性的用法：

transform: rotate() 旋转；其中“10deg”表示“10度”。
transform: rotate(10deg);

transform: skew() 倾斜;
transform: skew(20deg);

transform: scale() 比例；“1.5”表示以1.5的比例放大，如果要放大2倍，须写成“2.0”，缩小则为负“-”。
transform: scale(1.5);

transform: translate() 变动，位移；如下表示向右位移120像素，如果向上位移，把后面的“0”改个值就行，向左向下位移则为负“-”。
transform: translate(120px,0);

#### 综合在一起：(效果是动态)
```
.demo{ 
    -webkit-transition:all 1s ease-in-out;
    -moz-transition:all 1s ease-in-out
}
.demo:hover{
    -webkit-transform:rotate(360deg) skew(-20deg) scale(3.0) translate(100px,0);
    -moz-transform:rotate(360deg) skew(-20deg)scale(3.0) translate(100px,0)
}
```
### 二、transition

>- css的transition允许css的属性值在一定的时间区间内平滑地过渡。

#### 四个属性

1. transition-property : 用来指定当元素中的其中一个属性改变时执行的transition效果。
    其主要有以下几个值：none(没有属性改变)；all（所有属性改变）这个也是其默认值；indent（元素属性名）。
    当其值为none时，transition马上停止执行
    当指定为all时，则元素产生任何属性值变化时都将执行transition效果
    ident是可以指定元素的某一个属性值。
2. transition-duration : 用来指定元素转换过程的持续时间
3. transition-timing-function : 
    ![](/assets/transition.png)
4. transition-delay : 是用来指定一个动画开始执行的时间，也就是说当改变元素属性值后多长时间开始执行transition效果

综上所述，相对应的一个示例代码：
```
  a {
    transition: background 0.5s ease-in,color 0.3s ease-out;
    transition：transform .4s ease-in-out;
  }
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main>
        <section id="container">
            <div class="thumbnail"
                data-title="Bacon"
                data-description="Bacon ipsum dolor amet filet mignon alcatra short ribs, sausage shoulder tail biltong rump chicken ground round ham hock porchetta tri-tip. Boudin bresaola andouille, leberkas pork ball tip turducken beef ribs">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/meat.jpg" alt="Meat" width="300">
            </div>
        </section>
    </main>
</body>
<style>
    /* DEMO STYLING */
*, *:after, *:before {
    box-sizing: border-box;
}
html {
    height: 100%;
    font-size: 62.5%;
}
body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Lato, sans-serif;
    font-size: 1.8rem;
    background: radial-gradient(ellipse at center, #f5f5f5 0%,#ddd 100%);
    user-select: none;
}
h1 {
    font-family: Merriweather, serif;
    margin: 0 0 50px;
    cursor: default;
}
#container {
    width: 300px;
    margin: 0 auto;
}
.thumbnail {
    display: inline-block;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    background: #000;
    box-shadow: 0 15px 50px rgba(0,0,0,.5);
}
.thumbnail img {
    display: block;
    max-width: 100%;
    transition: opacity .2s ease-in-out;
}
.thumbnail:hover img {
    opacity: .5;
}
.thumbnail::after,
.thumbnail::before {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 50%;
    transition: transform .4s ease-out;
    color: #fff;
}
.thumbnail::after {
    content: attr(data-title);
    top: 0;
    padding-top: 55px;
    transform: translateY(-100%) scale(.8);
    background: rgba(0,0,0,.4);
    font-size: 3.5rem;
    font-weight: 300;
    font-family: Merriweather, serif;
    text-align: center;
}
.thumbnail::before {
    content: attr(data-description) "…";
    top: 50%;
    padding: 20px;
    transform: translateY(100%) scale(.8);
    background: rgba(107,38,68,.6);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    color: #f1f1f1;
    font-size: 1.5rem;
}
.thumbnail:hover::after,
.thumbnail:hover::before {
    transform: translateY(0%) scale(1);
}
</style>
</html>
```

### animation (@keyframes规则)
>-CSS3中添加的新属性animation是用来为元素实现动画效果的，但是animation无法单独担当起实现动画的效果。承载动画的另一个属性——@keyframes。使用的时候为了兼容可加上-webkit-、-o-、-ms-、-moz-、-khtml-等前缀以适应不同的浏览器。

- 创建动画的原理是，将一套 CSS 样式逐渐变化为另一套样式。
- 通过 @keyframes 规则，您能够创建动画。
- @keyframes定义一个动画，并定义具体的动画效果，比如是放大还是位移等等。
- @keyframes 它定义的动画并不直接执行，需要借助animation来运转。
- 在动画过程中，您能够多次改变这套 CSS 样式。
- 以百分比来规定改变发生的时间，或者通过关键词 "from" 和 "to"，等价于 0% 和 100%。
>百分比是指动画完成一遍的时间长度的的百分比 ，0% 是动画的开始时间，50%是动画完成一半的时间，100% 动画的结束时间。百分比后面的花括号写：在动画执行过程中的某时间点要完成的变化。
- 为了获得最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。 

#### 语法
@keyframes animationname {keyframes-selector {css-styles;}}

animationname：必需。定义动画的名称。
keyframes-selector:必需。定义动画的名称。
                    合法的值：
                    0-100%
                    from（与 0% 相同）
                    to（与 100% 相同）
css-styles: 必需。一个或多个合法的 CSS 样式属性。

#### 例子1 
>名字为gif的@keyframes ，动画完成需要的总时长为1.4s,刚开始的时候图片旋转为0度，动画完成的时候图片旋转360度
```
.load-border {
    width: 120px;
    height: 120px;
    background: url(../images/loading_icon.png) no-repeat center center;
    -webkit-animation: gif 1.4s infinite linear;
    animation: gif 1.4s infinite linear; 
}
@keyframes gif {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
```
#### 例子2
>名字为mymove的@keyframes ，动画完成需要的总时长为1s,刚开始的时候图片距顶部距离为0px，0.25s后图片距顶部距离为200px，0.5s后图片距顶部的距离为100px，以此类推
```
.img {
    width: 120px;
    height: 120px;
    background: url(../images/icon.png) no-repeat center center;
    -webkit-animation: gif 1.4s infinite linear;
    animation: mymove 1s infinite linear;
}
@keyframes mymove{
    0%   {top:0px;}
    25%  {top:200px;}
    50%  {top:100px;}
    75%  {top:200px;}
    100% {top:0px;}
}
```
#### 例子3
>在一个动画中改变多个 CSS 样式：
```
@keyframes mymove
{
    0%   {top:0px; background:red; width:100px;}
    100% {top:200px; background:yellow; width:300px;}
}
```

参考博客[https://segmentfault.com/a/1190000004460780](https://segmentfault.com/a/1190000004460780)