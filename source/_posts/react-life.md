---
title: React 新旧生命周期
date: 2020-06-01 14:12:10
tags:
    - React
categories: React
---
1. UNSAFE
componentWillMount()
componentWillReceiveProps()
componentWillUpdate()
![](/assets/life-before.jpg)
原因：
被废弃的三个函数都是在render之前，因为fiber的出现，很可能因为高优先级任务的出现而打断现有任务导致它们会被执行多次
2. 新增
getDerivedStateFromProps()
getSnapShotBeforeUpdate()
![](/assets/life-after.png)
<!-- more -->
### componentWillMount
在 componentWillMount 中订阅事件，React 并不能够保证在 componentWillMount 被调用后，同一组件的 componentWillUnmount 也一定会被调用，所以在 componentWillMount 中订阅事件就会直接导致服务端的内存泄漏。另一方面，在未来 React 开启异步渲染模式后，在 componentWillMount 被调用之后，组件的渲染也很有可能会被其他的事务所打断，导致componentWillMount会被多次调用。而 componentDidMount 就不存在这个问题，在 componentDidMount 被调用后，componentWillUnmount 一定会随后被调用到，并根据具体代码清除掉组件中存在的事件订阅。

将现有 componentWillMount 中的代码迁移至 componentDidMount 。

### componentWillReceiveProps
#### 更新由 props 决定的 state 及处理特定情况下的回调
在老版本的 React 中，如果组件自身的某个 state 跟其 props 密切相关的话，一直都没有一种很优雅的处理方式去更新 state，而是需要在 componentWillReceiveProps 中判断前后两个 props 是否相同，如果不同再将新的 props 更新到相应的 state 上去。这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。类似的业务需求也有很多，如一个可以横向滑动的列表，当前高亮的 Tab 显然隶属于列表自身的状态，但很多情况下，业务需求会要求从外部跳转至列表时，根据传入的某个值，直接定位到某个 Tab。

在新版本中，React 官方提供了一个更为简洁的生命周期函数：
static getDerivedStateFromProps(nextProps, prevState)

```
// before
componentWillReceiveProps(nextProps) {  
  if (nextProps.translateX !== this.props.translateX) {
    this.setState({ 
      translateX: nextProps.translateX, 
    }); 
  } 
}

// after
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.translateX !== prevState.translateX) {
    return {
      translateX: nextProps.translateX,
    };
  }
  return null;
}
```

```
// before
componentWillReceiveProps(nextProps) {
  if (nextProps.isLogin !== this.props.isLogin) {
    this.setState({ 
      isLogin: nextProps.isLogin,   
    });
  }
  if (nextProps.isLogin) {
    this.handleClose();
  }
}

// after
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.isLogin !== prevState.isLogin) {
    return {
      isLogin: nextProps.isLogin,
    };
  }
  return null;
}

componentDidUpdate(prevProps, prevState) {
  if (!prevState.isLogin && this.props.isLogin) {
    this.handleClose();
  }
}
```
通常来讲，在 componentWillReceiveProps 中，我们一般会做以下两件事，一是根据 props 来更新 state，二是触发一些回调，如动画或页面跳转等。在老版本的 React 中，这两件事我们都需要在 componentWillReceiveProps 中去做。而在新版本中，官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

将现有 componentWillReceiveProps 中的代码根据更新 state 或回调，分别在 getDerivedStateFromProps 及 componentDidUpdate 中进行相应的重写即可，注意新老生命周期函数中 prevProps，this.props，nextProps，prevState，this.state 的不同.
[https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)
### componentWillUpdate
#### 处理因为 props 改变而带来的副作用
componentWillUpdate 有可能在一次更新中被调用多次，componentDidUpdate 也不存在这样的问题，一次更新中 componentDidUpdate 只会被调用一次，所以将原先写在 componentWillUpdate 中的回调迁移至 componentDidUpdate 就可以解决这个问题。
#### 在组件更新前读取 DOM 元素状态
另一个常见的 componentWillUpdate 的用例是在组件更新前，读取当前某个 DOM 元素的状态，并在 componentDidUpdate 中进行相应的处理。但在 React 开启异步渲染模式后，render 阶段和 commit 阶段之间并不是无缝衔接的，也就是说在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同，这就导致在
componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。

为了解决上面提到的这个问题，React 提供了一个新的生命周期函数：
getSnapshotBeforeUpdate(prevProps, prevState)

与 componentWillUpdate 不同，getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。虽然 getSnapshotBeforeUpdate 不是一个静态方法，但我们也应该尽量使用它去返回一个值。这个值会随后被传入到 componentDidUpdate 中，然后我们就可以在 componentDidUpdate 中去更新组件的状态，而不是在 getSnapshotBeforeUpdate 中直接更新组件状态。
```
class ScrollingList extends React.Component {
  listRef = null;

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return (
        this.listRef.scrollHeight - this.listRef.scrollTop
      );
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.setListRef}>
        {/* ...contents... */}
      </div>
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}
```
将现有的 componentWillUpdate 中的回调函数迁移至 componentDidUpdate。如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态


