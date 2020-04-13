---
title: When to useMemo and useCallback
date: 2020-04-13 15:40:12
tags:
    - React
categories: React
---
1. 引用相等
2. 昂贵的计算
<!-- more -->
```
function Foo({bar, baz}) {
  const options = {bar, baz}
  useEffect(() => {
    buzz(options)
  }, [options]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}

function Blub() {
  return <Foo bar="bar value" baz={3} />
}
```
这里有问题的原因是因为 useEffect 将对每次渲染中对 options 进行引用相等性检查，并且由于JavaScript的工作方式，每次渲染 options 都是新的，所以当React测试 options 是否在渲染之间发生变化时，它将始终计算为 true，意味着每次渲染后都会调用 useEffect 回调，而不是仅在 bar 和 baz 更改时调用.

option 1:
```
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}
```
但是有一种情况下：如果 bar 或者 baz 是（非原始值）对象、数组、函数等，这不是一个可用的解决方案
```
function Blub() {
  const bar = () => {}
  const baz = [1, 2, 3]
  return <Foo bar={bar} baz={baz} />
}
```
这正是 useCallback 和 useMemo 存在的原因。你可以这样解决这个问题
```
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz])
  return <div>foobar</div>
}

function Blub() {
  const bar = React.useCallback(() => {}, [])
  const baz = React.useMemo(() => [1, 2, 3], [])
  return <Foo bar={bar} baz={baz} />
}
```

```
function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
}

function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = () => setCount1(c => c + 1)

  const [count2, setCount2] = React.useState(0)
  const increment2 = () => setCount2(c => c + 1)

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
```
每次单击其中任何一个按钮时，DualCounter 的状态都会发生变化，因此会重新渲染，然后重新渲染两个CountButton。 但是，实际上只需要重新渲染被点击的那个按钮吧？因此，如果你点击第一个按钮，则第二个也会重新渲染，但没有任何变化，我们称之为“不必要的重新渲染”。

大多数时候，你不需要考虑去优化不必要的重新渲染。React是非常快的，我能想到你可以利用时间去做很多事情，比起做这些类似的优化要好得多。
```
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})
```

现在 React 只会当 props 改变时会重新渲染 CountButton！ 但我们还没有完成，还记得引用相等吗？在 DualCounter 组件中，我们组件函数里定义了 increment1 和 increment2 函数，这意味着每次 DualCounter 重新渲染，那些函数会新创建，因此 React 无论如何会重新渲染两个 CountButton。

所以这是 useCallback 和 useMemo 能派上用场的另外一个场景
```
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})

function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = React.useCallback(() => setCount1(c => c + 1), [])

  const [count2, setCount2] = React.useState(0)
  const increment2 = React.useCallback(() => setCount2(c => c + 1), [])

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
```
现在我们可以避免 CountButton 的所谓“不必要的重新渲染”。

我想重申下，在没有测量前，强烈建议不要使用 React.Memo （或者它的朋友 PureComponent 和 shouldComponentUpdate），因为优化总会带来成本，并且你需要确保知道会有多少成本和收益，这样你才能决定在你的案例中它是否能真的有帮助（而不是有害的）。正如我们上面所说的那样，一直保持正确是一件很困难的事情，所以你可能无法获得任何好处。

参考:[https://jancat.github.io/post/2019/translation-usememo-and-usecallback/](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)