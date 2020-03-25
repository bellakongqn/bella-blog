---
title: opacity|visibilty|dispaly 属性将元素隐藏 的对比分析
date: 2020-03-18 12:10:10
tags:
    - CSS
categories: CSS
thumbnail: '../assets/opacity-display-visibilty.png'
---

### 隐藏功能
opacity 用来设置透明度 
display 定义建立布局时元素生成的显示框类型
visibility 用来设置元素是否可见。
opacity: 0; dispaly: none; visibility: hidden; 均可以隐藏元素，但存在区别
<!-- more -->

#### 是否占据页面空间

```
<div class="yellow"></div>
<div class="red"></div>
```
opacity与 visibility 仍会占用页面空间；dispaly 不会占用页面空间

#### 对子元素的影响

如果子元素什么都不设置的话，都会受父元素的影响，和父元素的显示效果一样；
如果子元素设置的值 和 父元素设置的值不同：
```
<div class="yellow">
        <div class='blue'></div>
</div>
```
opacity 与 display ： 父元素对子元素的影响很明显，子元素设置的 opacity 和 display 属性是不起作用的，显示的效果和父元素一样；
visibility: 子元素如果设置为 visibility:visible; 并没有受父元素的影响，可以继续显示出来.

#### 自身绑定的事件是否能继续触发

是指用户人为的触发的事件，不包括使用 JavaScript 模拟触发的事件
```
    <div class="yellow" onmouseenter="alert(0)"></div>
```
visibility 和 display 属性，自身的事件不会触发，而使用 opacity 属性，自身绑定的事件还是会触发的。

#### 是否影响其他元素触发事件

```
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <style>
       .red{
         width:400px;
         height:40px;
         background:red;
         position:relative;
       }
       
       .yellow{
        position:absolute;     
        top:0;
        left:0;
        width:200px;
        height:300px;
        background:yellow;
        opacity:0;            
       }
        
       .blue{
         width:200px;
         height:200px;
         background:blue;
       }
       .red:hover .yellow{
         opacity:1;          
       }
  </style>
 </head>
 <body>
      <div  class='red'>
         <div class='yellow'></div>
      </div>

      <p  class='blue' onmouseenter=alert(0)></p>
 </body>
</html>
```
黄色块div元素设置 opacity:0; ，通过定位，遮挡住了 蓝色的p元素，当鼠标移到蓝色p元素上时，并没有触发蓝色p元素的事件。
黄色块div元素设置 visibility:hidden; ，通过定位，虽然遮挡住了 蓝色的p元素，但是当鼠标移到蓝色p元素上时，还是触发了蓝色p元素绑定的事件。
display 因为他不会占据页面空间，也就不会遮挡其他元素，就不会影响其他元素触发事件了.

visibility 和 display 属性是不会影响其他元素触发事件的，而 opacity 属性 如果遮挡住其他元素，其他的元素就不会触发事件了

#### 是否产生回流（reflow）

>当页面中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(也有人会把回流叫做是重布局或者重排)。
每个页面至少需要一次回流，就是在页面第一次加载的时候。

dispaly 属性会产生回流，而 opacity 和 visibility 属性不会产生回流。

#### 是否产生重绘（repaint）

>当页面中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的时候，比如background-color。则称为重绘。

dispaly 和 visibility 属性会产生重绘，而 opacity 属性不一定会产生重绘

元素提升为合成层后，transform 和 opacity 不会触发 repaint，如果不是合成层，则其依然会触发 repaint。
在 Blink 和 WebKit 内核的浏览器中，对于应用了 transition 或者 animation 的 opacity 元素，浏览器会将渲染层提升为合成层。
加上 transition 后就没有 高亮显示了，这时候 opacity 不会触发重绘。

🐖： 回流必将引起重绘，而重绘不一定会引起回流

#### 是否支持transition
opacity 是支持 transition的，一般淡入淡出的效果就是这样实现的

visibility 也是支持 transition 的。

visibility: 离散步骤，在0到1数字范围之内，0表示“隐藏”，1表示完全“显示”
visibility : hidden; 可以看成 visibility : 0;
visibility : visible; 可以看成 visibility : 1;

只要 visibility 的值大于0就是显示的，所以
visibility:visible 过渡到 visibility:hidden，看上去不是平滑的过渡，而是进行了一个延时。
如果 visibility:hidden 过渡到 visibility:visible ，则是立即显示，没有延时。

当元素是 visibility:hidden; 时，自身的事件不会触发；要去将自身的 visibility:hidden 过渡到 visibility:visible 是不会起作用的。
但是在其他元素上加事件，来将该元素的 visibility:hidden 过渡到 visibility:visible 是可以的

display 不仅不支持transition，它还会使 transition 失效

transition 要起作用，元素必须是已经渲染在页面上的元素
![](/assets/summary.png)
