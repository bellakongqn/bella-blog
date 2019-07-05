---
title: css
tags:
    - css
categories: css
thumbnail: '../assets/post-img/css.jpg'
---

#### css相关应用

1. 图片按比例响应式缩放、并自动裁剪
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
