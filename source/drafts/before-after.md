---
title: css中伪元素before或after中content的特殊用法attr
tags:
    - Css
categories: css
---
![](/assets/tips-half.png)
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .haorooms{margin-top:30px} 
        span{
            position: relative;
            display: inline-block;
        }
        span:hover{
            cursor: pointer;
        }
        span:hover:before{
            content: attr(data-haorooms);
            background-color: #2085c5;
            border-radius:3px;
            color: #fff;
            padding: 10px;
            position: absolute;
            left: 100%;
            top: -70%;
            margin-left: 8px;
            white-space: pre; 
        }
        span:hover:after{
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-right: 8px solid #2085c5;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
        }
        .haorooms1 {
            position:relative;
            display:inline-block;
            font-size:80px; /*  任何宽度都可以 */
            color: black; /* 任何颜色，或透明 */
            white-space: pre; /* 处理空格 */
        }
        .haorooms1:before {
            display:block;
            z-index:1;
            position:absolute;
            top:0;
            left:0;
            width: 50%;
            content: attr(data-content); /* 伪元素的动态获取内容 */
            overflow:hidden;
            color: #f00;
        }        

    </style>
</head>
<body>
    <div class="haorooms">
        <span data-haorooms="haorooms鼠标效果tips-纯css">haorooms测试</span>
    </div>
    <span class="haorooms1" data-content="前">前</span>
    <span class="haorooms1" data-content="端">端</span>
    <span class="haorooms1" data-content="博">博</span>
    <span class="haorooms1" data-content="客">客</span>
</body>
</html>
```