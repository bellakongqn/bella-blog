---
title: React Diff 算法
date: 2020-04-23 10:52:00
tags:
    - React
categories: React
thumbnail: '../assets/reacd-diff.png'
---
#### Diff 作用
React Diff会计算出 Virtual Dom 中真正发生变化的部分，并只针对这部分进行实际的 Dom 操作，而不是对整个页面进行重新渲染。

#### 传统 Diff 的算法
传统的diff算法是使用循环递归对节点进行依次对比，复杂度为O(n^3),效率低下。

#### React Diff 算法
- 针对树形结构（tree diff）: Web UI 中 DOM 节点跨层级的移动操作非常少，可以忽略不计 （较少）
- 针对组件结构（component diff）： 拥有相同类的两个组件生成相似的树形结构，拥有不同类的两个组件会生成不同的树形结构
- 针对元素结构（element diff）：对于同一层级的一组节点，使用具有唯一性的id区分 (key属性)
<!-- more -->

##### tree Diff

对虚拟 Dom 树进行分层比较，两棵树只会对同一层次的节点进行比较，当发现该节点已经不存在的时候，该节点及其子节点会被完全删除，不会进一步比较。只需要遍历一次，便完成对整个DOM树的比较。

该策略基于DOM 节点跨层的移动操作少到可以忽略不计。

如果出现了跨层级的变动，基于 React 的策略，不会出现 移动 操作，而是会出现 重建-销毁 操作。

如下图
![](/assets/treeDiff.png)

不会将C节点移动到B节点下，而是在B节点下重建C节点，然后删除原C节点。

官方建议不要进行 DOM 节点跨层级的操作

在开发组件时，保持稳定的 DOM 结构会有助于性能的提升。例如，可以通过 CSS 隐藏或显示节点，而不是真正地移除或添加 DOM 节点。

##### component diff

- 如果是同一类型组件，按照元策略继续比较 Virtual DOM 树即可。
- 如果不是同一类型组件，将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
- 对于同一类型组件，有可能其 virtual DOM 没有任何变化，如果能确切的知道这个前提，则可以节省大量的 diff 运算时间。因此 React 允许用户通过 shouldComponentUpdate() 来判断组件是否需要进行 diff 算法分析。

![](/assets/componentDiff.png)

如图: 如果 C 节点及其子树发生了变化，即使 C 子树和 D 子树结构相似，但是 React 会直接删除 C ，然后重建 D。

（React 认为不同类型的组件，DOM 树相同的情况非常少，这种极端的因素可以忽略不计或者难以造成极大的影响）

##### element diff

统一层级的节点进行 diff 的时候，有三种节点操作: 插入，移动，删除

插入：新的组件类型不在旧集合中，即全新的节点，需要对新节点执行插入操作
移动：组件已经存在于集合中，并且集合更新时，组件并没有发生更新，只是位置发生改变，
删除：旧组件类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者旧组件不在新集合中的，也需要执行删除操作

React 允许开发者对同一层级的同组子节点添加唯一 key 进行区分，极大的提高了性能

diff 算法的工作原理：

1. 对集合中的节点进行循环遍历 for (name in nextChildren)，通过唯一 key 进行判断新旧集合中是否存在相同的节点，if(prevChild === nextChild) ，如果存在相同的节点， 则进行移动操作。

2. 但是在移动前需要将当前节点在旧集合中的位置与 lastIndex 进行比较 if(child._mountIndex < lastIndex)，否则不执行操作。

- 这是一种顺序优化方式， lastIndex 一直在更新，表示访问过的节点在旧集合中最右的位置（最大的位置）。
1. 如果新集合中当前当前访问的节点比 lastIndex 大，说明当前访问节点在旧集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，因此不同添加到差异队列中，也就不执行移动操作。
2. 只有当访问的节点比 lastIndex 小的时候，才需要继续移动.

节点相同，位置不同
![](/assets/componentDiff1.png)
按新集合中顺序开始遍历

1.B在新集合中 lastIndex(类似浮标) = 0, 在旧集合中 index = 1，index > lastIndex 就认为 B 对于集合中其他元素位置无影响，不进行移动，之后lastIndex = max(index, lastIndex) = 1
2.A在旧集合中 index = 0， 此时 lastIndex = 1, 满足 index < lastIndex, 则对A进行移动操作，此时lastIndex = max(Index, lastIndex) = 1
3.D和B操作相同，同(1)，不进行移动，此时lastIndex=max(index, lastIndex) = 3
4.C和A操作相同，同(2)，进行移动，此时lastIndex = max(index, lastIndex) = 3

节点位置均有变化
![](/assets/componentDiff2.png)
1.同上面那种情形，B不进行移动，lastIndex=1
2.新集合中取得E,发现旧中不存在E，在 lastIndex处创建E，lastIndex++
3.在旧集合中取到C，C不移动，lastIndex=2
4.在旧集合中取到A，A移动到新集合中的位置，lastIndex=2
5.完成新集合中所有节点diff后，对旧集合进行循环遍历，寻找新集合中不存在但就集合中的节点(此例中为D)，删除D节点。

React diff 的不足之处
![](/assets/componentDiff3.png)
此例中D直接从最后一位提升至第一位，导致lastIndex在第一步直接提升为3，使ABC在进行index与lastIndex的判断时均处于 index < lastIndex 的情况，使ABC都需要做移动操作。所以我们应该减少将最后一个节点提升至第一个的操作，如果操作频率较大或者节点数量较多时，会对渲染性能产生影响。


参考：
[https://juejin.im/post/5d81eec56fb9a06add4e63ba](https://juejin.im/post/5d81eec56fb9a06add4e63ba)
[ptbird.cn/react-diff-from-code.html](ptbird.cn/react-diff-from-code.html)