var mod = require ('./lib') 
var { counter } = require ('./lib')  // 不响应变化
// 
console.log(mod.counter)
// mod.incCounter()
setTimeout(()=>{
    console.log(mod.counter) // 2
},2000)