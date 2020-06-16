var counter = 3 
setTimeout(()=>{
    counter=2;
    exports.counter = counter  // 地址不变 改变里面的值为 {count: 2} 外部响应
    // module.exports = {count} // 对象重新赋值 地址改变为 {count: 2} 外部不响应
},1000)
exports.counter = counter // 内存 {count:1}
// module.exports = {count} 指向 一个对象{count: 1} 
// module.exports 指向新的对象时，exports 断开了与 module.exports 的引用
/*
var counter = 3
exports.counter = counter
exports.incCounter = function incCounter() {
    counter++
    exports.counter = counter
}
*/