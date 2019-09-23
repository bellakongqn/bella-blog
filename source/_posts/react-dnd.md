---
title: react-dnd 拖拽
tags:
    - react react-dnd 拖拽
categories: 拖拽
thumbnail: '../assets/post-img/react-dnd.png'
---
- 总体步骤 [git地址](https://github.com/bellakongqn/react-dnd-drag-demo.git)
  1. 搭建出简单页面
  2. 可以进行拖拽
  3. 可以放置
  4. 优化 从外部进行传值(待更新)
- 搭建出简单页面 如图

<!-- more -->
![](/assets/post-img/build.png)
代码实现如下js:
```
import React, { Component } from 'react';
import './DragDemo.scss'

class DragDemo extends Component {
    render() {
        return (
            <div className="container">
                <div className="drop-container">
                    <div className="drag-item">item a</div>
                    <div className="drag-item">item b</div>
                    <div className="drag-item">item c</div>
                </div>

                <div className="drop-container">
                    <div className="drag-item">item a</div>
                    <div className="drag-item">item b</div>
                    <div className="drag-item">item c</div>
                </div>

                <div className="drop-container">
                    <div className="drag-item">item a</div>
                    <div className="drag-item">item b</div>
                    <div className="drag-item">item c</div>
                </div>
            </div>
        );
    }
}

export default DragDemo;

```
css代码:
```
.container{
    height: 100vh;
    background: darkolivegreen;
    padding: 20px;
    display: flex;
    .drop-container{
        width: 200px;
        background: #ffffff;
        margin: 10px;
        flex-grow: 1;
        padding: 10px;
        .drag-item{
            height: 30px;
            line-height: 30px;
            margin-bottom: 10px;
            text-align: center;
            color: #ffffff;
            background:sienna;
        }
    }
}

```
2. 可以进行拖拽
   - 安装react-dnd|react-dnd-html5-backend
   - 引入react-dnd|react-dnd-html5-backend
     import { DndProvider, useDrag} from "react-dnd";
     import HTML5Backend from "react-dnd-html5-backend";
   - 定义拖拽元素的type 
   - 抽出DragItem组件 使其可以拖拽
   实现效果如图:
   ![](/assets/post-img/drag-process.png)
   DragItem代码:
   ```
   const itemTypes = {
    LIST: "list"
   };
   const DragItem = props => {
    // useDrag()
    const [{ isDragging }, drag] = useDrag({
      item: {
        type: itemTypes.LIST,
        // 定义拖拽元素的类型 只有当推拽元素的类型和容器接受的类型一致,拖拽元素才可以放置到容器内
      },
      collect: monitor => ({
        isDragging: !!monitor.isDragging()
        // 定义一些拖拽过程中的方法
      })
    });
    const style = {
      backgroundColor: isDragging ? 'yellow' : ''
    }
        // ref={drag} 操作底层元素
        return <div ref={drag} style={style} className="drag-item">{props.name}</div>;
    };
   ```
3. 可以接受推拽进行放置
   - 引入useDrop()事容器可放置
   - 抽出DragContainer组件作为放置容器
   实现结果
   ![](/assets/post-img/drag-result.png)
   DropContainer组件容器代码
   ```
   const DropContainer = props =>{

    const [{isOver, canDrop}, drop] = useDrop({
        accept:itemTypes.LIST,
        drop:(item) =>{
            // 打印出放置的时候的item信息,需要获取拖拽元素的name
            console.log(item)
            // 放置的时候对item执行操作,item.name移动的元素的name,props.id 接受容器的id
            props.onItemDrop(item.name, props.id)

        },
        
        collect: mon => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop(),
          }),
    })
    const style = {backgroundColor: canDrop ? 'lightgreen' : ''}
    return (
        <div ref={drop} style={style} className={props.className}>
          {
            props.children
          }
        </div>
      )

}
   ```
4. 优化 从外部进行传值(待更新)