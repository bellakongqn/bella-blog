---
title: 拖拽
tags:
    - 拖拽 js
categories: js

---
#### 拖拽的使用

--------
1. 鼠标实现简单拖拽-1
原生js实现div推拽 源码（注释）
```
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <meta charset="utf-8" />
    <style type="text/css">
        #divTest {
            width : 200px;
            height : 200px;
            background-color : red;
            border : 1px solid #00ffff;
            position : absolute;
            /* 被拖动的div的position属性值一定是absolute */
        }
    </style>
</head>
<body>
    测试一下
    <div id="divTest">
        eiu
    </div>

    <script type="text/javascript">
        var oDiv = document.getElementById("divTest");
        oDiv.onmousedown = function (ev) {
            var ev = ev || event; // 解决浏览器兼容问题
            var disX = ev.clientX - oDiv.offsetLeft; //获取水平方向鼠标位置与div元素边框的间隔
            var disY = ev.clientY - oDiv.offsetTop; //获取垂直方向鼠标位置与div元素边框的间隔
            if (oDiv.setCapture) {
                oDiv.setCapture();// 开始捕获鼠标位置
            }

            document.onmousemove = function (ev) { //鼠标移动事件
                var ev = ev || event;
                // 随意拖拽开始
                // oDiv.style.top = ev.clientY - disY + 'px'; 
                //设置垂直方向div元素的位置 clientY鼠标现在垂直的位置-鼠标相对与div元素边框的位置=现在div的垂直位置
                // oDiv.style.left = ev.clientX - disX + 'px';
                //随意推拽结束

                // 会出现拖出屏幕外的情况，可以通过实时捕获鼠标位置来避免
                // 开始
                var leftW = ev.clientX - disX;
                var leftH = ev.clientY - disY;
                // 左边不超出
                if(leftW < 0){
                    leftW = 0;
                }
                // 上边不超出
                if(leftH < 0 ){
                    leftH = 0;
                }
                // 右边不超出
                if(leftW > document.documentElement.clientWidth - oDiv.offsetWidth){
                    leftW = document.documentElement.clientWidth - oDiv.offsetWidth;
                }
                // 下边不超出
                if(leftH >  document.documentElement.clientHeight - oDiv.offsetHeight){
                    leftH = document.documentElement.clientHeight - oDiv.offsetHeight;
                }
                oDiv.style.left = leftW + 'px';
                oDiv.style.top = leftH + 'px'; 
                // 结束
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                if (oDiv.releaseCapture) {
                    oDiv.releaseCapture() // 释放鼠标捕获事件
                }
            }
            return false;//阻止默认行为（如果页面中有文字，则会默认拖动文字），ie8及一下不行
        }
    </script>

</body>
</html>
```
2. 基于HTML5拖拽API的拖拽
> 用户用鼠标选中一个可拖动的（draggable）元素，移动鼠标到一个可放置的（droppable）元素，然后释放鼠标。 在操作期间，会触发一些事件类型，有一些事件类型可能会被多次触发（比如drag 和 dragover 事件类型）。
- 可拖拽元素 指我们鼠标点击之后准备拖动的对象（图片、div、文字等)
- 可放置元素 是指可以放置源对象的区域
- 事件 当从操作系统向浏览器中拖动文件时，不会触发dragstart 和dragend 事件
![](/assets/post-img/event.png)
- 源对象和目标对象的事件间传递数据 ev.dataTransfer {}//数据传递对象
- 源对象上的事件处理中保存数据 ev.dataTransfer.setData(key,value);//key,value必须都是字符串类型
- 目标对象上的事件处理中读取数据 var value2 = ev.dataTransfer.getData(key);
源码(注释)
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
        #thatDiv {
            width: 500px;
            height: 100px;
            border: 1px solid red;
            position: relative;
        }
        #thisDiv {
            width: 500px;
            height: 100px;
            border: 1px solid black;
            margin-bottom: 20px;
        }
        #tarDiv,
        #tarDiv1,
        #tarDiv2,
        #tarDiv3,
        #tarDiv4 {
            float: left;
            width: 50px;
            height: 50px;
            background-color: #000;
            border: 1px #fff solid;
        }
        .tarDiv {
            color: #fff;
            text-align: center;
            line-height: 50px;
        }
    </style>
</head>

<body>
    <div id="thisDiv">
        <div id="tarDiv" class="tarDiv" draggable="true">1</div>
        <div id="tarDiv1" class="tarDiv" draggable="true">2</div>
        <div id="tarDiv2" class="tarDiv" draggable="true">3</div>
        <div id="tarDiv3" class="tarDiv" draggable="true">4</div>
        <div id="tarDiv4" class="tarDiv" draggable="true">5</div>
    </div>
    <div id="thatDiv"></div>

    <script type="text/javascript">
        var thisDiv = document.getElementById("thisDiv");
        var thatDiv = document.getElementById("thatDiv");
        thisDiv.ondragstart = function(ev) {
            var ev = ev || window.event;
            ev.dataTransfer.setData("text", ev.target.id); //将被拖拽的元素的id存入dataTransfer对象中
            window.thisId = ev.target.id;
            ev.dataTransfer.effectAllowed = "copy";
            // effectAllowed指定拖放操作所允许的一个效果。
            // copy 操作用于指示被拖动的数据将从当前位置复制到放置位置。
            // move 操作用于指定被拖动的数据将被移动。 
            // link 操作用于指示将在源和放置位置之间创建某种形式的关系或连接
        }
        thatDiv.ondragover = function(ev) { //阻止dragover的默认事件
            var ev = ev || window.event;
            // 兼容IE阻止默认事件
            if (typeof ev.preventDefault == "function") {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
                // Event.returnValue 属性表示该事件的默认操作是否已被阻止。
                // 默认情况下，它被设置为true，允许发生默认操作。将该属性设置为false，可以防止默认操作。
            }
            var div = document.getElementById(window.thisId);
            thatDiv.appendChild(div);
            div.style.cssText = "border:1px #fff dashed;";

            ev.preventDefault();
            ev.dataTransfer.dropEffect = "copy";
            // dropEffect 拖动操作效果 copy move link none
        }
        thatDiv.ondragenter = function(ev) { //阻止dragenter的默认事件
            var ev = ev || window.event;
            if (typeof ev.preventDefault == "function") {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
        }
        thatDiv.ondragleave = function(ev) {
            var ev = ev || window.event;
            var removeDiv = document.getElementById(window.thisId);
            thatDiv.removeChild(removeDiv);
            thisDiv.appendChild(removeDiv);
            removeDiv.style.cssText = "border:1px #fff solid;";
            ev.preventDefault();
        }
        thatDiv.ondrop = function(ev) {
            var ev = ev || window.event;
            var divId = ev.dataTransfer.getData("Text"); //从dataTransfer对象中取出数据
            if (typeof ev.preventDefault == "function") { //阻止drop事件的默认行为
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
            var moveDiv = document.getElementById(divId);
            thatDiv.appendChild(moveDiv);
            moveDiv.setAttribute('draggable', 'false');
            // 设置拖拽属性为false
            moveDiv.style.cssText = "border:1px #fff solid;";

        }
    </script>
</body>

</html>

```