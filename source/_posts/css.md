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

2. css 文字超过添加···
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


