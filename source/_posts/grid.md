---
title: grid 布局
date: 2030-03-31 08:47:10
tags:
    - CSS
categories: CSS
thumbnail: '../assets/grid.png'
---
容器属性
### display

display: grid 指定一个容器采用网格布局,容器元素默认位块级元素；
display: inline-grid 采用网格布局，容器元素为行内元素

### grid-template-columns，grid-template-rows

px ：列宽和行高都是100px
grid-template-columns:100px 100px 100px; 定义每一列的列宽
grid-template-rows:100px 100px 100px; 定义每一行的行高

% 三等分
grid-template-columns: 33.33% 33.33% 33.33%;
grid-template-rows: 33.33% 33.33% 33.33%;

repeat()
grid-template-columns: repeat(3. 33.33%);
grid-template-rows：repeat(3,33.33%);
// grid-template-columns: repeat(2, 100px 20px 80px); 6列

auto-fill
单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充
grid-template-columns: repeat(auto-fill, 100px);

fr
grid-template-columns: 1fr 1fr; // 两个相同宽度的列

fr&px
grid-template-columns: 150px 1fr 2fr; // 第一列150px 第二列的宽度是第三列的一半

minmax()
grid-template-columns: 1fr 1fr minmax(100px, 1fr); // minmax(100px, 1fr)表示列宽不小于100px，不大于1fr

auto表示由浏览器自己决定长度
grid-template-columns: 100px auto 100px; 

网格线的名称
允许同一根线有多个名字，比如[fifth-line row-5]
grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];

布局实例
grid-template-columns: 70% 30%;

### row-gap&column-gap&gap

row-gap：设置行间距 column-gap：设置列间距
gap: row-gap column-gap;
gap: 20px 20px;

### grid-template-areas
 grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
多个单元格合并成一个区域
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
布局实例
grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";
区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end

### grid-auto-flow

grid-auto-flow:row; //即先行后列
grid-auto-flow:column; //即先列后行

row dense和column dense。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。并且尽可能紧密填满，尽量不出现空格
项目指定位置
grid-column-start: 1;
grid-column-end: 3; 
其余元素放置
grid-auto-flow: row dense;
grid-auto-flow: column dense;

### justify-items & align-items & place-items
justify-items属性设置单元格内容的水平位置（左中右） 默认stretch
align-items属性设置单元格内容的垂直位置（上中下） 默认stretch
justify-items: start | end | center | stretch;
align-items: start | end | center | stretch;

place-items： <align-items> <justify-items>;

### justify-content & align-content & place-content
justify-content属性是整个内容区域在容器里面的水平位置（左中右）
align-content属性是整个内容区域的垂直位置（上中下）
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
align-content: start | end | center | stretch | space-around | space-between | space-evenly;  

place-content属性是align-content属性和justify-content属性的合并简写形式
place-content: <align-content> <justify-content>

### grid-auto-columns & grid-auto-rows
一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目
grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高

项目属性
### grid-column-start grid-column-end grid-row-start grid-row-end 
项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线
grid-column-start: 1;
grid-column-end: 3;
grid-row-start: 2;
grid-row-end: 4;

第几个网格线，还可以指定为网格线的名字
grid-column-start: header-start;
grid-column-end: header-end;

四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格
grid-column-start: span 2;

### grid-area
grid-area属性指定项目放在哪一个区域
grid-area: e;

### justify-self, align-self ,place-self
justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目
align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目

place-self属性是align-self属性和justify-self属性的合并简写形式