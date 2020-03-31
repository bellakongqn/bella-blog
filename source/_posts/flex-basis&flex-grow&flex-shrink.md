---
title: flex-grow、flex-shrink、flex-basis
date: 2030-03-31 08:47:10
tags:
    - CSS
categories: CSS
thumbnail: '../assets/flex.png'
---
### flex-basis
<!-- more -->
flex-basis 用于设置子项的占用空间。如果设置了值，则子项占用的空间为设置的值；如果没设置或者为 auto，那子项的空间为width/height 的值。

![](/assets/flex-basis.png)

🐖
对于子项1，flex-basis 为auto，子项占用的宽度使用width 的宽度，width设置也为 auto，所以子项占用空间由内容决定。
对于子项2，flex-basis 为auto，子项占用宽度使用width 的宽度，width 为70px，所以子项子项占用空间是70px。
对于子项3，flex-basis 为200px，覆盖width 的宽度，所以子项占用空间是100px。

### flex-grow

用来“瓜分”父项的“剩余空间”

![](/assets/flex-grow.png)

🐖：
容器的宽度为500px
子项1的占用的基础空间(flex-basis)为50px
子项2占用的基础空间是70px
子项3占用基础空间是100px
剩余空间为 500-50-70-200 = 80px。 
其中子项1的flex-grow: 0(未设置默认为0)， 子项2flex-grow: 2，子项3flex-grow: 1
剩余空间分成3份，子项2占2份(53.33px)，子项3占1份(26.67px)。
所以 子项1真实的占用空间为: 50+0 = 50px， 
子项2真实的占用空间为: 70+53.33 = 123.33 px ,子项3真实的占用空间为: 200+26.62 = 226.62px

### flex-shrink

用来“吸收”超出的空间

![](/assets/flex-shrink.png)

🐖：
容器的宽度为500px, 
子项1的占用的基准空间(flex-basis)为300px，子项2占用的基准空间是70px，子项3占用基准空间是200px，总基准空间为 570px。
容器放不下，多出来的空间需要被每个子项根据自己设置的flex-shrink 进行吸收。 
子项1的flex-shrink: 1(未设置默认为1)， 子项2 flex-shrink: 2，子项3 flex-shrink: 2。
子项1需要吸收的的空间为 (300*1)/(300*1+70*2+200*2) * 100 = 25px，
子项1真实的空间为 300 - 25 = 275px ;同理子项2吸收的空间为(70*2)/(300*1+70*2+200*2) * 70=11.67px，子项2真实空间为 70-11.67 = 58.33px。
子项3吸收的空间为(200*2)/(300*1+70*2+200*2) * 70 = 33.33，真实的空间为200-33.33= 166.67px