---
title: useEffect| useRef
date: 2020-06-03 12:10:10
update: 2020-06-02 13:14:21
tags:
    - React
categories: React
---

### useEffect的使用
1.每一次渲染都有它自己的 Props and State
2.每一次渲染都有它自己的事件处理函数
3.每次渲染都有它自己的Effects
    并不是count的值在“不变”的effect中发生了改变，而是effect 函数本身在每一次渲染中都不相同。
4.每一次渲染都有它自己的…所有
<!-- more -->
5.effects的清理
```
 useEffect(()=>{
        const id = setInterval(()=>{
            //.....
        },1000)
        return ()=>{
            // ....清理作用
            clearInterval(id)
        }
 },[])
```
6.减少effets的依赖,函数形式
```
useEffect(()=>{
        const id = setInterval(()=>{
            setCount(c=>c+1)
        },1000)
        return ()=>{
            clearInterval(id)
        }
},[])
```

或者useReducer,React会保证dispatch在组件的声明周期内保持不变

```
useEffect(()=>{
        const id = setInterval(()=>{
            // setCount(c=>c+step)
            dispatch({type:'trick'})
        },1000)
        return ()=>{
            clearInterval(id)
        }
},[dispatch])
```
7.把函数移到Effects里
```
function SearchResults() {
  const [query, setQuery] = useState('react');

  useEffect(() => {
    function getFetchUrl() {
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }

    async function fetchData() {
      const result = await axios(getFetchUrl());
      setData(result.data);
    }

    fetchData();
  }, [query]);

  // ...
}
```
8.但我不能把这个函数放到Effect里
```
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
}

function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, []); // ✅ Deps are OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, []); // ✅ Deps are OK

  // ...
}
```
useCallBack()
我们使函数本身只在需要的时候才改变，而不是去掉对函数的依赖。
```
function SearchResults() {
  // ✅ Preserves identity when its own deps are the same
  const getFetchUrl = useCallback((query) => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]);  // ✅ Callback deps are OK

  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  // ...
}
```

### useRef
1. 获取DOM元素的节点
```
import React, { useEffect, useRef } from 'react';
function App() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
2. 获取子组件的实例
```
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}

function InputWithFocusButton() {
    const inputRef = useRef(null);

    function onButtonClick() {
        console.log('子组件input的对象:', inputRef.current);
        inputRef.current.focus()
    };
    return (
        <>
            <FancyInput ref={inputRef} /> 
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}
```

3. 渲染周期之间共享数据的存储（state不能存储跨渲染周期的数据，因为state的保存会触发组件重渲染）
```
function Counter() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    latestCount.current = count;
    setTimeout(() => {
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

参考文档：
[redux hooks](https://react-redux.js.org/next/api/hooks)
[能否取代Redux](https://segmentfault.com/a/1190000020285526?utm_source=tag-newest)
[Redux 在 React Hooks 的应用](https://juejin.im/post/5d90a10ff265da5ba273b34f)
[A Complete Guide to useEffect ](https://overreacted.io/a-complete-guide-to-useeffect/)
[How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)

