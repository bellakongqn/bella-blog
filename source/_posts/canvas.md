---
title: canvas的使用
tags:
    - canvas
categories: canvas

---
#### [canvas的使用](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

---------
```
<canvas id="tutorial" width="150" height="150"></canvas>
```
- canvas只有两个属性—— width和height,通过css 设置canvas宽高可能会导致图形扭曲，所以最好直接使用canvas属性来设置画布大小。

- canvas元素有一个叫做 getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能。getContext()只有一个参数，可以通过它来访问绘画上下文使用方法：
```
//获取canva位置
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
//绘制图形
ctx.fillStyle = "rgb(200,0,0)";
ctx.fillRect (10, 10, 55, 50);
```

- canvas只支持一种原生的图形绘制：矩形。
```
ctx.fillStyle= "green";
//fillStyle 属性决定矩形的样式，默认矩形填充颜色为黑色
//strokeStyle = "green" 设置图形轮廓的颜色
ctx.fillRect(25, 25, 100, 100);
//绘制一个填充的矩形，fillRect(x, y, width, height)
ctx.clearRect(45, 45, 60, 60);
//清除指定矩形区域，让清除部分完全透明，clearRect(x, y, width, height)
ctx.strokeRect(50, 50, 50, 50);
//strokeRect(x, y, width, height)绘制一个矩形的边框
```
![](/assets/post-img/rect.png)

透明度设置
//设置透明度方法1：
//ctx.strokeStyle = "rgba(255,0,0,0.5)"; 透明度
//ctx.fillStyle = "rgba(255,0,0,0.5)";透明度
//全局透明度
// ctx.globalAlpha = 0.2;
```
// 画背景
  ctx.fillStyle = 'rgb(255,221,0)';
  ctx.fillRect(0,0,150,37.5);
  ctx.fillStyle = 'rgb(102,204,0)';
  ctx.fillRect(0,37.5,150,37.5);
  ctx.fillStyle = 'rgb(0,153,255)';
  ctx.fillRect(0,75,150,37.5);
  ctx.fillStyle = 'rgb(255,51,0)';
  ctx.fillRect(0,112.5,150,37.5);

  // 画半透明矩形
  for (var i=0;i<10;i++){
    ctx.fillStyle = 'rgba(255,255,255,'+(i+1)/10+')';
    for (var j=0;j<4;j++){
      ctx.fillRect(5+i*14,5+j*37.5,14,27.5)
    }
  }
```
![](/assets/post-img/rgba.png)
- 绘制路径 所有其他的图形的绘制都至少需要生成一条路径。不过，我们拥有众多路径生成的方法让复杂图形的绘制成为了可能。
   1. 首先，你需要创建路径起始点。
   2. 然后你使用画图命令去画出路径。
   3. 之后你把路径封闭。
   4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
所用到的函数：

   - beginPath() 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
      第一条路径构造命令通常被视为是moveTo()，无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。
   - closePath() 闭合路径之后图形绘制命令又重新指向到上下文中。
   - stroke() 通过线条来绘制图形轮廓。不会自动闭合形状，需调用closePath()。
   - fill() 通过填充路径的内容区域生成实心的图形。自动闭合绘制的形状，无需再次调用closePath()。

   绘制三角形
   ```
    ctx.beginPath(); //新建路径
    ctx.moveTo(75, 50); // moveTo(x, y) 将笔触移动到指定的坐标x以及y上。
    ctx.lineTo(100, 75); // 绘制一条从当前位置到指定x以及y位置的直线。
    ctx.lineTo(100, 25); 
    ctx.fill(); //填充闭合形状
   ```
   ![](/assets/post-img/three.png)

- arc() 函数 绘制圆弧或者圆
  arc(x, y, radius, startAngle, endAngle, anticlockwise)
  画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
  - arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
    弧度=(Math.PI/180)*角度。
  - 参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向 
  ```
    ctx.beginPath();
    ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
    ctx.moveTo(110,75);
    ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
    ctx.moveTo(65,65);
    ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
    ctx.moveTo(95,65);
    ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
    ctx.stroke();

  ```

       ![](/assets/post-img/smile.png)
- 贝塞尔曲线
    quadraticCurveTo(cp1x, cp1y, x, y)
    绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
- 

