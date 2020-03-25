---
title: 用CSS实现Tab页切换效果
date: 2019-12-10 12:10:10
tags:
    - Css
categories: css
---

🐖：z-index需要与position一起使用，否则是没有效果的，层级关系就会错乱，出现不想要得到的效果。
input:checked + label 
input:checked ~ label
input:checked ~ label ：相邻同胞选择器，选择被勾选的input标签后 
                        所有的label标签［input  和 label标签有共同的父元素］；
input:checked ＋ label ：相邻同胞选择器，选择被勾选的input标签后 
                        第一个label标签［input  和 label标签有共同的父元素］；

![](/assets/tabCss.png)
<!-- more -->
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS实现Tab切换效果</title>
    <style>
        ul {
            margin: 0;
            padding: 0;

        }
        .tab-list {
            position: relative;
            display: flex;
        }
        .tab-list .tab-itom {
            list-style: none;
            margin-right: 4px;
        }

        .tab-itom .test-label {
            position: relative;
            /*  可以使用z-index属性 */
            display: block;
            width: 85px;
            height: 27px;
            border: 1px solid transparent;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            line-height: 27px;
            text-align: center;
            background: #e7e8eb;
        }

        .tab-itom .tab-box {
            /* 设置绝对定位方便定位相对于tab-list栏的位置，同时为了可以使用z-index属性 */
            position: absolute;
            left: 0;
            top: 28px;
            width: 488px;
            height: 248px;
            border: 1px solid #cbcccc;
            border-radius: 5px;
            border-top-left-radius: 0px;
            background: #fff;
            /* 设置层级最低方便选中状态遮挡 */
            z-index: 0;
        }
        /* 用绝对定位使按钮脱离文档流，透明度设置为0将其隐藏 */
        input[type="radio"] {
            position: absolute;
            opacity: 0;
        }
        /* 利用选择器实现  tab切换 */

        /* 当radio为选中状态时设置它的test-label兄弟元素的属性 */
        input[type="radio"]:checked + .test-label {
            /* 为了修饰存在的边框背景属性 */
            border-color: #cbcccc;
            border-bottom-color: #fff;
            background: #fff;
            /* 为了修饰存在的层级使下边框遮挡下方div的上边框 */
            z-index: 10;
        }
        /* 当radio为选中状态时设置与它同级的tab-box元素的显示层级 */
        input[type="radio"]:checked ~ .tab-box {
            /* 选中时提升层级，遮挡其他tab页达到选中切换的效果 */
            z-index: 5;
        }
    </style>
</head>

<body class="clearfloat">
    <ul class="tab-list clearfloat">
        <li class="tab-itom">
            <input type="radio" id="testTabRadio1" class="test-radio" name="tab" checked="checked">
            <label class="test-label" for="testTabRadio1">选项卡一</label>
            <div class="tab-box">
                111111111111
            </div>
        </li>
        <li class="tab-itom">
            <input type="radio" id="testTabRadio2" class="test-radio" name="tab">
            <label class="test-label" for="testTabRadio2">选项卡二</label>
            <div class="tab-box">
                2222222222222
            </div>
        </li>
        <li class="tab-itom">
            <input type="radio" id="testTabRadio3" class="test-radio" name="tab">
            <label class="test-label" for="testTabRadio3">选项卡三</label>
            <div class="tab-box">
                33333333333333
            </div>
        </li>
    </ul>
</body>

</html>

```