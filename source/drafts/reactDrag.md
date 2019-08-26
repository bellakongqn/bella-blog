---
title: React 拖拽
tags:
    - React
categories: React
---

1.定义拖拽模块状态
const STATUS_CODE = {
    STATUS_TODO: '待处理',
    STATUS_DOING: '进行中',
    STATUS_DONE: '已完成'
}
2.设置拖拽模块
  1.可以放置
  2.进入状态
  3.离开
  4.判断是否可以被放置（当店拖拽id的状态与当前列的状态对比）
3.拖拽元素搭建
  1.样式
  2.可以拖拽
  3.拖拽时设置当前拖拽id,拖拽的样式
