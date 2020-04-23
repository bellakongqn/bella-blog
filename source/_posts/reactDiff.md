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
1. 如果新集合中当前当前访问的节点比 lastIndex 大，说明当前访问节点在旧集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，因此不用添加到差异队列中，也就不执行移动操作。
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
[ptbird.cn/react-diff-from-code.html](ptbird.cn/react-diff-from-code.html)\

Virtual Dom快，有两个前提
1. Javascript很快
2. Dom很慢
当创建一个元素比如div，有以下几项内容需要实现： HTML element、Element、GlobalEventHandler。简单的说，就是插入一个Dom元素的时候，这个元素上本身或者继承很多属性如 width、height、offsetHeight、style、title，另外还需要注册这个元素的诸多方法，比如onfucos、onclick等等。 这还只是一个元素，如果元素比较多的时候，还涉及到嵌套，那么元素的属性和方法等等就会很多，效率很低。
![](/assets/dom.png)
这个元素会挂载默认的styles、得到这个元素的computed属性、注册相应的Event Listener、DOM Breakpoints以及大量的properties，这些属性、方法的注册肯定是需要耗费大量时间的。

尤其是在js操作DOM的过程中，不仅有dom本身的繁重，js的操作也需要浪费时间，我们认为js和DOM之间有一座桥，如果你频繁的在桥两边走动，显然效率是很低的，如果你的JavaScript操作DOM的方式还非常不合理，那么显然就会更糟糕了。 

而 React的虚拟DOM就是解决这个问题的！ 虽然它解决不了DOM自身的繁重，但是虚拟DOM可以对JavaScript操作DOM这一部分内容进行优化

#### 虚拟DOM和DOM之间的关系

首先，Virtual DOM并没有完全实现DOM，即虚拟DOM和真正地DOM是不一样的，Virtual DOM最主要的还是保留了Element之间的层次关系和一些基本属性。因为真实DOM实在是太复杂，一个空的Element都复杂得能让你崩溃，并且几乎所有内容我根本不关心好吗。所以Virtual DOM里每一个Element实际上只有几个属性，即最重要的，最为有用的，并且没有那么多乱七八糟的引用，比如一些注册的属性和函数啊，这些都是默认的，创建虚拟DOM进行diff的过程中大家都一致，是不需要进行比对的。所以哪怕是直接把Virtual DOM删了，根据新传进来的数据重新创建一个新的Virtual DOM出来都非常非常非常快。（每一个component的render函数就是在做这个事情，给新的virtual dom提供input）。

所以，引入了Virtual DOM之后，React是这么干的：你给我一个数据，我根据这个数据生成一个全新的Virtual DOM，然后跟我上一次生成的Virtual DOM去 diff，得到一个Patch，然后把这个Patch打到浏览器的DOM上去。完事。并且这里的patch显然不是完整的虚拟DOM，而是新的虚拟DOM和上一次的虚拟DOM经过diff后的差异化的部分。

假设在任意时候有，VirtualDom1 == DOM1 （组织结构相同, 显然虚拟DOM和真实DOM是不可能完全相等的，这里的==是js中非完全相等）。当有新数据来的时候，我生成VirtualDom2，然后去和VirtualDom1做diff，得到一个Patch（差异化的结果）。然后将这个Patch去应用到DOM1上，得到DOM2。如果一切正常，那么有VirtualDom2 == DOM2（同样是结构上的相等）。

其实是由于每次生成virtual dom很快，diff生成patch也比较快，而在对DOM进行patch的时候，虽然DOM的变更比较慢，但是React能够根据Patch的内容，优化一部分DOM操作，比如之前的那个例子。

重点就在最后，哪怕是我生成了virtual dom(需要耗费时间)，哪怕是我跑了diff（还需要花时间），但是我根据patch简化了那些DOM操作省下来的时间依然很可观（这个就是时间差的问题了，即节省下来的时间 > 生成 virtual dom的时间 + diff时间）。所以总体上来说，还是比较快。

参考：
[https://www.cnblogs.com/zhuzhenwei918/p/7271305.html](https://www.cnblogs.com/zhuzhenwei918/p/7271305.html)