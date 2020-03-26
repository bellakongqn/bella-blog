---
title: HTML5
date: 2020-02-18 12:10:10
updated: 2020-03-26 08:47:10
tags:
    - HTML
    - HTML
categories: HTML
thumbnail: '../assets/html.png'
---

### video
------
```
<video controls width="250" autoplay loop>

    <source src="/media/examples/flower.webm"
            type="video/webm">

    <source src="/media/examples/flower.mp4"
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
</video>
```

source: 浏览器并不是都支持相同的视频格式，所以你可以在 <source> 元素里提供多个视频源，然后浏览器将会使用它所支持的第一个源.

#### 属性
autoplay ： 开始自动播放，而且无需停止加载任何数据
loop ： 布尔属性；指定后，会在视频结尾的地方，自动返回视频开始的地方
muted ： 布尔属性，指明了视频里的音频的默认设置。设置后，音频会初始化为静音。默认值是false,意味着视频播放的时候音频也会播放
poster ： 一个海报帧的URL，用于在用户播放或者跳帧之前展示。

[更多属性设置](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

### audio
--------
元素用于在文档中表示音频内容。 <audio> 元素可以包含多个音频资源， 这些音频资源可以使用 src 属性或者<source> 元素来进行描述； 浏览器将会选择最合适的一个来使用。对于不支持<audio>元素的浏览器，<audio>元素也可以作为浏览器不识别的内容加入到文档中。

重要属性同video

[更多属性设置](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

### figure
--------
<figure>标签规定独立的流内容（图像、图表、照片、代码等等）。

figure元素的内容应该与主内容相关，但如果被删除，则不应对文档流产生影响。它是一种元素的组合，可带有标题（可选）。figure标签用来表示网页上一块独立的内容，将其从网页上移除后不会对网页上的其他内容产生影响。

figure有一个子标签：figcaption.

<figcation> 标签定义 figure 元素的标题（caption）。
“figcaption” 元素应该被置于 “figure” 元素的第一个或最后一个子元素的位置。

```
<figure class="effect-julia">
    <img src='../assets/figure.jpg' alt="html"/>
    <figcaption>
        <h2>Passionate <span>Julia</span></h2>
        <div>
            <p>Julia dances in the deep dark</p>
            <p>She loves the smell of the ocean</p>
            <p>And dives into the morning light</p>
        </div>
    </figcaption>            
</figure>
```

### picture
-----
<picture> 元素包括 0个 或 多个 <source> 元素 和一个 <img> 元素 来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 <source> 元素，如果没有匹配的，就选择 <img> 元素的 src 属性中的URL。然后，所选图像呈现在<img>元素占据的空间中。
```
<picture class="footer__logo">
    <source srcset="img/logo-green-small-1x.png 1x, img/logo-green-small-2x.png 2x"
            media="(max-width: 600px)">
    <img srcset="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x" alt="Full logo" src="img/logo-green-2x.png">
</picture>
```
🐖：当屏幕的最大宽度为600px 时，选择source中的图片- 根据当前设备的drp来选择1x/2x;
    其余情况展示img srcset 中的图片 ，drp=1->1x drp=2=>2x，都不满足展示默认src中的图片

### img srcset sizes
srcset 
1. 图像文件的路径
2. 图像的像素密度 或 宽度

sizes 表示资源大小的、以逗号隔开的一个或多个字符串。每一个资源大小包括：
1. 一个媒体条件
2. 一个资源尺寸的值

当使用srcset属性的宽度版本时，我们才能将其与sizes属性一起使用
当切换分辨率时,sizes并不需要——浏览器只是计算出正在显示的显示器的分辨率，然后提供srcset引用的最适合的图像
```
<img srcset="img/nat-1.jpg 300w , img/nat-1-large.jpg 1000w"
    sizes="(max-width: 900px) 20vw, (max-width: 600px) 30vw, 300px"
    alt="Photo 1"
    class="composition__photo composition__photo--p1"
    src="img/nat-1-large.jpg">
>
```
🐖：最后一个槽的宽度是没有媒体条件的，它是默认的，当没有任何一个媒体条件为真时，它就会生效。
老旧的浏览器不支持这些特性，它会忽略这些特征。并继续正常加载 src属性引用的图像文件

查看设备宽度-检查sizes列表中哪个媒体条件是第一个为真-查看给予该媒体查询的槽大小-加载srcset列表中引用的最接近所选的槽大小的图像
以视窗宽度为600px来加载页面 那么max-width:600px 为真，因为会选择30vw = >180px 因此 img/nat-1.jpg 会被加载,因为它的的固定宽度（300w）最接近于180px.
