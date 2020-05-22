---
title: css
date: 2019-12-17 12:10:10
tags:
    - css
categories: css
thumbnail: '../assets/post-img/css.jpg'
---

#### css相关应用

1. 图片按比例响应式缩放、并自动裁剪
----------------

<!-- more -->
> 想要图片按比例缩放，最简单的就是将宽度设为100%，然后不设置高度，高度就会自动根据宽度来进行缩放
> 但是这种无法让图片按比例显示，比如1：1,4:3等

  css实现按比列进行缩放
  准备四张千玺弟弟图片比例不相同的图（身为脑残粉的我哈哈哈哈）
  ![](/assets/post-img/before.png)
  html代码
  ```

    <div class="containerItem">
            <div class="item" style="background-image:url(images/高8宽5.JPG)"></div>    
    </div>
    <div class="containerItem">
            <div class="item" style="background-image:url(images/高3宽5.jpg)"></div>    
    </div>
    <div class="containerItem">
            <div class="item" style="background-image:url(images/宽高相等.jpg)"></div>   
    </div>
  ```
css进行按定制比例缩放
1：1 css代码
```
.item{
    width:100%;
    height:0;
    padding-bottom: 100%;
    overflow:hidden;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    background-size:cover;
}
```
![](/assets/post-img/11.png)

> width:100%;
> height:0;
> padding-bottom: 100%;
> overflow:hidden;

这四句是是图片的比例为1：1，虽然height：0；高度为0，但是它的padding值为100%，这是因为在padding为百分比的时候，是根据他父层的宽度来进行计算的。

> background-position: center center;
> background-repeat: no-repeat;
> -webkit-background-size:cover;
> -moz-background-size:cover;
> background-size:cover;

 background-size:cover 的特性，把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
 想要的图片比例就是就是width与padding-bottom的比例 （width可取为1%-100%之间的值，意味着占父容器的大小不同）
 1：1 
 width:100%;
 height:0;
 padding-bottom: 100%;
 宽4高3
 width:100%;
 height:0;
 padding-bottom: 75%;
 宽3高4
 width:100%;
 height:0;
 padding-bottom: 133.33%;

2. css 文字超过添加···
----------------

   实现单行文本的溢出显示省略号
   ```
   overflow: hidden;//盒子溢出隐藏
   text-overflow:ellipsis;//文字溢出显示省略号
   white-space: nowrap;//文字不换行
   ```
   多行文本溢出显示省略号
   ```
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
   overflow: hidden;
   ```

   > 因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；
   -webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
   display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
   -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

   兼容性处理

   ```
        p {
        position: relative;
        line-height: 20px;
        max-height: 60px;
        //将height设置为line-height的整数倍，防止超出的文字露出。
        overflow: hidden;
        }

        p::after {//后伪元素
        content: "...";
        position: absolute;
        bottom: 0;
        right: 0;
        padding-left: 40px;
        // 给p::after添加渐变背景可避免文字只显示一半。
        background: -webkit-linear-gradient(left, transparent, #fff 55%);
        background: -o-linear-gradient(right, transparent, #fff 55%);
        background: -moz-linear-gradient(right, transparent, #fff 55%);
        background: linear-gradient(to right, transparent, #fff 55%);
        }   
   ```
3.三角形画三角形
----------------

左三角
```
#talkbubble {
    margin-left:30px;
   width: 120px; 
   height: 80px; 
   background: red;
   position: relative;
   -moz-border-radius:    10px; 
   -webkit-border-radius: 10px; 
   border-radius:         10px;
}
#talkbubble:before {
   content:"";
   position: absolute;
   right: 100%;
   top: 26px;
   width: 0;
   height: 0;
   border-top: 13px solid transparent;
   border-right: 26px solid red;
   border-bottom: 13px solid transparent;
}
```
```
#triangle-down {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
} 

#triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
}

 #triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 100px solid red;
    border-bottom: 50px solid transparent;
} 

#triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid red; 
    border-right: 100px solid transparent;          
}
#triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid red; 
    border-left: 100px solid transparent;
}
#triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 100px solid red; 
    border-right: 100px solid transparent;  
}  

#triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid red; 
    border-left: 100px solid transparent;
}
```
4.em rem
----------------

> em是相对单位，参考物是父元素的font-size，具有继承的特点。如果字体大小是16px（浏览器的默认值），那么 1em = 16px。
不过，这样使用很复杂，很难很好的与px进行对应，因此，总结了一个经验
```
body {
font-size: 62.5%;
}
```
那么，这样之后 1em = 10px 在布局等使用的时候好换算了很多。
> rem
rem支持IE9及以上，意思是相对于根元素html（网页），不会像em那样，依赖于父元素的字体大小，而造成混乱。使用起来安全了很多。
```
html {font-size: 62.5%; /**10 ÷ 16 × 100% = 62.5%    1rem = 10px   **/}   
body {font-size: 1.4rem; /**1.4 × 10px = 14px **/}
h1 { font-size: 2.4rem; /**2.4 × 10px = 24px**/}
```
这样整个网页都会比较统一！不会造成混乱！
5.line-height百分比
----------------

高带单位和不带单位的区别
```
line-height:26px; 表示行高为26个像素
line-heigth:120%;表示行高为当前字体大小的120%
line-height:2.6em; 表示行高为当前字体大小的2.6倍
```
带单位的行高都有继承性，其子元素继承的是计算值，如父元素的字体大小为14px，定义行高line-height:2em;则计算值为 28px，不会因其子元素改变字体尺寸而改变行高。(例如：父元素14px，子元素12px,那么行高就是28px，子元素虽然字体是12px，行高还是父元素的行高)
```
line-height:2.6;表示行高为当前字体大小的2.6倍
```
不带单位的行高是直接继承，而不是计算值，如父元素字体尺寸为14px，行高line-height:2;子元素字体为12px，不需要再定义行高，他默认的行高为24px。（例如：子元素12px，他的行高是24px,不会继承父元素的28px）
没有百分比，不带单位的是自己的1.5倍
6.css中的visibility和position新属性sticky
--------

visibility：hidden是占空间的，渲染的时候会渲染，但是display:none是不占空间的
position: sticky
position:sticky表现也符合这个粘性的表现。基本上，可以看出是position:relative和position:fixed的结合体——当元素在屏幕内，表现为relative，就要滚出显示器屏幕的时候，表现为fixed。
position:sticky有个非常重要的特性，那就是sticky元素效果完全受制于父级元素们。

这和position:fixed定位有着根本性的不同，fixed元素直抵页面根元素，其他父元素对其left/top定位无法限制。

sticky元素以下一些特性表现：
>- 1.父级元素不能有任何overflow:visible以为的overflow设置，否则没有粘滞效果。因为改变了滚动容器（即使没有出现滚动条）。因此，如果你的position:sticky无效，看看是不是某一个祖先元素设置了overflow:hidden，移除之即可。

>- 2.同一个父容器中的sticky元素，如果定位值相等，则会重叠；如果属于不同父元素，则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。

>- 3.sticky定位，不仅可以设置top，基于滚动容器上边缘定位；还可以设置bottom，也就是相对底部粘滞。如果是水平滚动，也可以设置left和right值。

>- 4.父级元素也不能设置固定的height高度值，否则也没有粘滞效果。

随着页面的滚动，当导航距离上边缘0距离的时候，黏在了上边缘，表现如同position:fixed。
```
nav {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
```
层次滚动
```
<article>
    <section>
        <h4>标题1</h4>
        <content>
            <p>内容1...</p>
        </content>
        <footer>网友评论1：...</footer>
    </section>
    <section>
        <h4>标题2</h4>
        <content>
            <p>内容2...</p>
        </content>
        <footer>网友评论2：...</footer>
    </section>
    ...
</article>
```
```
article h4, 
h4 {
    position: sticky;
    top: 0;
    z-index: 1;
}
content {
    position: relative;
}
footer {
    position: sticky;
    bottom: 50vh;
    z-index: -1;
}
```
网友评论从后面钻出来的效果又是如何实现的呢？
两个关键点：
1. 定位用的bottom，效果和top正好是对立的。设置top粘滞的元素随着往下滚动，是先滚动后固定；而设置bottom粘滞的元素则是先固定，后滚动；
2. -index:-1让网友评论footer元素藏在了content的后面，于是才有了“犹抱琵琶半遮面”的效果。

7.:not()的应用技巧
最后一个标签是没有分割线的
```
.nav li:not(:last-child) {
  border-right: 1px solid #666;
}
```
在用逗号分隔的列表，最后一个让他没有逗号
```
ul > li:not(:last-child)::after {
  content: ",";
}
```

### white-space、word-break、word-wrap、
white-space: 控制空白字符的显示. normal | nowrap | pre | pre-wrap | pre-line
nowrap: 不仅空格被合并，换行符无效，连原本的自动换行都没了！只有</br>才能导致换行！所以这个值的表现还是挺简单的，我们可以理解为永不换行。
pre: 空格和换行符全都被保留了下来！不过自动换行还是没了。保留，所以pre其实是preserve的缩写，这样就好记了。
pre-wrap: pre-wrap就是preserve+wrap，保留空格和换行符，且可以自动换行 pre-wrap会保留空格
pre-line: pre-line会把多个空格合并成一个+自动换行

word-break : 控制单词如何被拆分换行. normal | break-all | keep-all
keep-all : 所有“单词”一律不拆分换行,只有空格可以触发自动换行
break-all : 所有单词碰到边界一律拆分换行


word-wrap: 也是控制单词如何被拆分换行的 normal | break-word
break-word: 只有当一个单词一整行都显示不下时，才会拆分换行该单词。

### css加载会造成阻塞嘛？
#### css 不会阻塞Dom 树的解析，会阻塞Dom 树的渲染
#### css加载会阻塞后面js语句的执行

1. DOM解析和CSS解析是两个并行的进程，所以这也解释了为什么CSS加载不会阻塞DOM的解析。
2. 然而，由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染。因此，CSS加载是会阻塞Dom的渲染的。
3. 由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。

#### DOMContentLoaded
1. 如果页面中同时存在css和js，并且存在js在css后面，则DOMContentLoaded事件会在css加载完后才执行
2. 其他情况下，DOMContentLoaded都不会等待css加载，并且DOMContentLoaded事件也不会等待图片、视频等其他资源加载。
