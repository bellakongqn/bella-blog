<!--
 * @Author: kqn
 * @Date: 2020-03-16 14:09:31
 * @LastEditors: your name
 * @LastEditTime: 2020-03-16 16:23:29
 * @Description: 
 -->
---
title: HTML5
tags:
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
