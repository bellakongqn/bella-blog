1. 文字超出
2. flex
3. Array.proptype.equals
```
Array.prototype.equals = function(other){
    if(this.length !== other.length) {
        return false
    }
    return Array.prototype.every((x, i) =>{ 
        x=== other[i]
    })
}   
console.log([1,2,3].equals([1,2,3,4]))
```
4. 数组最大元素
5. border-radius 后 radius 部分会执行吗？

6. 箭头函数
https://juejin.cn/post/6844903567967387656
https://segmentfault.com/a/1190000018017796
https://blog.fundebug.com/2019/09/16/anomalies-in-javascript-arrow-functions/
https://zhuanlan.zhihu.com/p/26540168
7. setTimeout 原理
8. Promise 捕获
9. generator
10. socket 原理
11. 闭包
12. 面向对象编程 工厂..模式
13. react 生命周期
14. react 创建组件的方法
15. this


16. Websocket 与 轮询 对于前端的区别
17. 遇到的难点 如何解决
查资料 -> 总结规律 -> 应用
18. 
[
   ['year', [2019,2020]],
   ['game', ['大话西游','阴阳师', '梦幻西游']],
   ['use',['bella','waytt']]
]
=> 
[
  'year=2019&game=大话西游&use=bella',
  'year=2020&game=大话西游&use=bella',
  'year=2019&game=阴阳师&use=bella',
  'year=2020&game=阴阳师&use=bella',
  'year=2019&game=梦幻西游&use=bella',
  'year=2020&game=梦幻西游&use=bella',const addParam = (res, param) => {
    const len = res.length
    const [ key, values ] = param
    if(len === 0) {
        return values.map(v => `${key}=${v}`)
    }else {
       return values.reduce((pre, cur)=>
            pre.concat(res.map(r => `${r}&${key}=${cur}`))
       ,[])
    }
} 

const generateURLs = (params) => {
    let res  = []
    params.forEach(param => {
        res = addParam(res ,param)
        console.log(res)
    })
}

generateURLs(
    [
        ['year', [2019,2020]],
        ['game', ['大话西游','阴阳师', '梦幻西游']],
        ['use', ['bella','waytt']]
    ]
)
  'year=2019&game=大话西游&use=waytt',
  'year=2020&game=大话西游&use=waytt',
  'year=2019&game=阴阳师&use=waytt',
  'year=2020&game=阴阳师&use=waytt',
  'year=2019&game=梦幻西游&use=waytt',
  'year=2020&game=梦幻西游&use=waytt'
]
```
const addParam = (res, param) => {
    const len = res.length
    const [ key, values ] = param
    if(len === 0) {
        return values.map(v => `${key}=${v}`)
    }else {
       return values.reduce((pre, cur)=>
            pre.concat(res.map(r => `${r}&${key}=${cur}`))
       ,[])
    }
} 

const generateURLs = (params) => {
    let res  = []
    params.forEach(param => {
        res = addParam(res ,param)
        console.log(res)
    })
}

generateURLs(
    [
        ['year', [2019,2020]],
        ['game', ['大话西游','阴阳师', '梦幻西游']],
        ['use',['bella','waytt']]
    ]
)
```
------------
1. hooks实现class 生命周期
2. 深拷贝 对象
3. 排序 复杂度
4. 遍历二叉树 时间复杂度
5. 元素垂直居中