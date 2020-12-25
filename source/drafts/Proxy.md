Object.defineProperty 与 Proxy 区别
Object.defineProperty 拦截的是对象的属性， 会改变原对象。Prox是拦截整个对象， 通过new生产一个新对象， 不会改变原对象。

proxy的拦截方式，除了上面的get和set,还有11种。选择的方式很多。Proxy也可以监听一些Object.defineProperty监听不到的操作，比如监听数组，监听对象属性的新增删除等。

proxy在开发中的使用场景
1. 数组负索引 [1,2,3][-1] => 3
```
const ecArrayProxy = {
    get (target, key, receiver) {
        let _index = key < 0 ?  target.length + Number(key) : key
        return Reflect.get(target, _index, receiver)
    }
}

let arr = new Proxy([1,2,3], ecArrayProxy)
console.log(arr[-1],'arr[-1]') // 3 arr[-1]
```
2. 表单校验
```
const valiateSchema = {
    set(target, key, value, receiver ) {
        if(key === 'age') {
            if(value < 0 || !Number.isInteger(value)){
                throw new TypeError('请输入正确的年龄')
            }
        }
        return Reflect.set(target, key, value, receiver)
    }
}

let obj1=new Proxy({age:18},valiateSchema)
obj1.age=16
obj1.age='少年'
```

3. 增加附加属性
```
const PROVINCE_NUMBER={
    41:'河南省',
}
const CITY_NUMBER={
    4114:'商丘市',
}

const ecCardNumber =  {
    set(target, key, value, receiver) {
        if(key === 'ecCardNumber') {
            Reflect.set(target, 'hometown', PROVINCE_NUMBER[value.substr(0,2)]+CITY_NUMBER[value.substr(0,4)], receiver)
            Reflect.set(target, 'date', value.substr(6,8), receiver)
            Reflect.set(target, 'gender', value.substr(-2,1)%2===1?'男':'女', receiver)
        }
        return Reflect.set(target, key, value, receiver)
    }
}

let obj2=new Proxy({cardNumber:''},ecCardNumber)
obj2.ecCardNumber = '411425202012157891'
console.log(obj2)
```
4. 数据格式化
```
let ecDate = {
  set (target, key, value, receiver) {
    if(key === 'date'){
        Reflect.set(target, 'timeStamp', +new Date(value), receiver)
    }
    return Reflect.set(target, key, value, receiver)
  }
}
let obj=new Proxy({date:''},ecDate)
```

