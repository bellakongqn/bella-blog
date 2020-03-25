---
title: React Redux 在 React Hooks 中的应用
date: 2019-10-12 12:10:10
tags:
    - React
categories: React
---

useEffect的使用
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
loading


参考文档：
[redux hooks](https://react-redux.js.org/next/api/hooks)
[能否取代Redux](https://segmentfault.com/a/1190000020285526?utm_source=tag-newest)
[Redux 在 React Hooks 的应用](https://juejin.im/post/5d90a10ff265da5ba273b34f)
[A Complete Guide to useEffect ](https://overreacted.io/a-complete-guide-to-useeffect/)
[How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)

