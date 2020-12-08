// Array.from(arraylike, fn) 为数组执行map 方法 fn
Array.from('foo') // [f,o,o]
Array.from([1, 2, 3], x => x + 1)[2, 3, 4]
const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map); // [[1, 2], [2, 4], [4, 8]]
const set = new Set(['foo', 'bar', 'baz', 'foo']); // 数组去重
Array.from(set); //['foo', 'bar', 'baz']

// Array.isArray() 用于确认传递的值是否为一个数组
Array.isArray([1, 2, 3]);   // true
Array.isArray({ foo: 123 });  // false

// Array.of()
Array.of(7) // [7]
Array(7) // [ , , , , , , ]

// Array.prototype.concat() 返回一个新数组 不改变原数组
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2); // ["a", "b", "c", "d", "e", "f"] 

const alpha = ['a', 'b', 'c'];
const alphaNumeric = alpha.concat(1, [2, 3]); // ['a', 'b', 'c', 1, 2, 3]

// Array.prototype.copyWithin() 改变原数组 但不改变数组长度 
const arrayC = ['a', 'b', 'c', 'd', 'e'];
arrayC.copyWithin(0, 3, 4) // 从index 3开始复制到 4 但不包括4 复制到位置0

// Array.prototype.fill() 用同一个元素从开始索引填充到终止索引 但不包括终止索引
const arrayF = [1, 2, 3, 4, 5]
arrayF.fill(2, 0, 3) //  [2,2,2,4,5]

// Array.prototype.filter() 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
const arrayFilter = [1, 2, 3, 4, 5]
const afterFilter = arrayFilter.filter(item => item > 1) // [ 2, 3, 4, 5 ]

// Array.prototype.find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
const arrayFind = [1, 2, 3, 4]
const afterFind = arrayFind.find(item => item > 1)  // 2

// Array.prototype.findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
const arrayFindIndex = [1, 2, 3, 4]
const afterFindIndex = arrayFind.findIndex(item => item > 1) // 1

// Array.prototype.flat() 
// 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
// 默认 1层
// 替代方案 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
const arrayFlat = [1, 2, 3, [[1, 2, [2, 3]]]]
const afterFlat = arrayFlat.flat() // [ 1, 2, 3, [ 1, 2, [ 2, 3 ] ] ]
const afterFlat10 = arrayFlat.flat(Infinity) // [1, 2, 3, 1, 2, 2, 3]

// Array.prototype.flatMap() 
// 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组 flat一层
const arrayFlatMap = [1, 2, 3]
const afterMap = arrayFlatMap.map(item => [item * 2])[[2], [4], [6]]
const afterFlatMap = arrayFlatMap.flatMap(item => [item * 2]) // [2,4,6]

let arr1 = ["it's Sunny in", "", "California"];
arr1.map(x => x.split(" ")); // [["it's","Sunny","in"],[""],["California"]]
arr1.flatMap(x => x.split(" ")); // ["it's","Sunny","in", "", "California"]

const arrayFlatMap1 = [1, 2, 3, 4];
arrayFlatMap1.flatMap(x => [x, x * 2]); // is equivalent to
arrayFlatMap1.reduce((acc, x) => acc.concat([x, x * 2]), []); // [1, 2, 2, 4, 3, 6, 4, 8]

// Array.prototype.map() 返回新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
const arrayMap = [1, 2, 3]
const afterMapq = arrayMap.map(item => item * 2)
console.log(afterMapq)

// Array.prototype.forEach() 对数组的每个元素执行一次给定的函数 不会改变原数组 无返回值
const arrayForEach = ['a', 'b', 'c']
arrayForEach.forEach(item => item + '1')

// Array.prototype.includes() 判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
const arrayIncludes = [1, 2, 3]
const afterIncludes = arrayIncludes.includes(1) // true

// Array.prototype.indexOf() 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
const afterIndexOf = beasts.indexOf('bison') // 1

// Array.prototype.lastIndexOf() 返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1
const animals = ['Dodo', 'Penguin', 'Penguin', 'Dodo'];
const afterLastIndexOf = animals.lastIndexOf('Penguin') //  2

// Array.prototype.some() 用于检测数组中的元素是否满足指定条件 返回ture false
const ages =  [4, 12, 16, 20];
console.log(ages.some(item=> item > 10))

// Array.prototype.every() 测试数组内的每一个元素是否能通过指定测试 返回boolean
const arrayE = [1, 30, 39, 29, 10, 13];
console.log(arrayE.every((item) => item < 10))

// Array.prototype.keys() 返回一个包含数组中每个索引键的Array Iterator对象。
const arrayKeys = [1, 2, 3]
const afterKeys = arrayKeys.keys()
for (const key of afterKeys) {
  console.log(key)
  // 0
  // 1
  // 2
}

// Array.prototype.values() 返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
const arrayValues = ['a', 'b', 'c'];
const iteratorValues = array1.values();
for (const value of iteratorValues) {
  console.log(value);
  // a
  // b
  // c
}

// Array.prototype.entries() 返回迭代器对象 该对象包含数组中每个索引的键/值对 for of 进行遍历输出
const arr = ["a", "b", "c"];
const iterator = arr.entries();
for (let e of iterator) {
  console.log(e);
  // [0, "a"] 
  // [1, "b"] 
  // [2, "c"]
}


// Array.prototype.pop() 从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
const arrayPop = [1, 2, 3]
const afterPop = arrayPop.pop()  // 3 arrayPop: [1,2]

// Array.prototype.push() 将一个或多个元素添加到数组的末尾，并返回该数组的新长度
const arrayPush = [1, 2, 3]
const afterPush = arrayPush.push(4, 5, 6) // 6

// Array.prototype.reverse() 方法将数组中元素的位置颠倒，并返回该数组 改变原数组
const arrayReverse = [1, 2, 3]
arrayReverse.reverse() // [3, 2, 3]

// Array.protoytype.join() 
// 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
// 如果数组只有一个项目，那么将返回该项目而不使用分隔符
const elements = ['Fire', 'Air', 'Water']
const afterJoin = elements.join(',') // Fire,Air,Water

// Array.prototype.toLocaleString() 返回一个字符串表示数组中的元素
const arrayToLocal = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')]
const localeString = arrayToLocal.toLocaleString() // 1,a,1997/12/21 下午10:12:00

// Array.prototype.toString() 返回一个字符串，表示指定的数组及其元素
const arrayToString = [1, 2, 'a', '1a', [1,3,[2,5,6,[7,8]]]]
const string = arrayToString.toString() // 1,2,a,1a,1,3,2,5,6,7,8

// Array.prototype.shift() 从数组中删除第一个元素，并返回该元素的值
const arrayShift = [1, 2, 3];
const firstElement = arrayShift.shift(); // 1 arrayShift:[2, 3]

// Array.prototype.slice()
// slice() 方法返回一个新的数组对象，
// 这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变
const animalsSlice = ['ant', 'bison', 'camel', 'duck', 'elephant'];
const afterSlice1 = animalsSlice.slice(2) //  ["camel", "duck", "elephant"]
const afterSlice2 = animalsSlice.slice(2, 4) //   ["camel", "duck"]
const afterSlice3 = animalsSlice.slice(1, 5) // ['bison', 'camel', 'duck', 'elephant']

// Array.prototype.sort() 方法用原地算法对数组的元素进行排序，并返回数组 改变原数组
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort(); // months: [ 'Dec', 'Feb', 'Jan', 'March' ]

// Array.prototype.splice() 
// 起始index ， 删除个数， 插入元素
// 通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组
const monthsSplice = ['Jan', 'March', 'April', 'June'];
monthsSplice.splice(1, 0, 'Feb'); //  ["Jan", "Feb", "March", "April", "June"]
monthsSplice.splice(4, 1, 'May'); // ["Jan", "Feb", "March", "April", "May"]

// Array.prototype.unshift() 将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)
const arrayUnshift = [1, 2, 3]
const afterUnshift =  arrayUnshift.unshift(4, 5) // arrayUnshift： [ 4, 5, 1, 2, 3 ] afterUnshift：5


// Array.prototype.reduce() 对数组中的每个元素执行一个由您提供的reducer函数, 将其结果汇总为单个返回值。
// 如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，
// 跳过第一个索引。如果提供initialValue，从索引0开始。
// 数组为空 必须设置初始值
// 
const arrReduce = [1, 2, 3]
const sum = arrReduce.reduce((pre, cur, index)=>{
  return pre + cur
}, 0)
const sum1 = arrReduce.reduce((pre, cur, index)=>{
  return pre + cur
})

const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
const nameNum = names.reduce((pre, cur)=>{
  if(cur in pre) {
    pre[cur] ++
  }else{
    pre[cur] =1
  }
  return pre
},{})

console.log(nameNum)


// Array.prototype.reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。



// 二维数组变为一维
const arr = [[0, 1], [2, 3], [4, 5]]
const newArr = arr.reduce((pre, cur) => {
  console.log(cur)
  return pre.concat(cur)
}, [])

// 多维数组转为一维
const arrM = [[0, 1], [2, 3], [4, [5, 6, 7]]]
const newArrM = (arr) => {
  return arr.reduce((pre, cur) =>
    pre.concat(Array.isArray(cur) ? newArr(cur) : cur)
    , [])
}

// 对象里的属性求和
const result = [
  {
    subject: 'math',
    score: 10
  },
  {
    subject: 'chinese',
    score: 20
  },
  {
    subject: 'english',
    score: 30
  }
];

const sum = result.reduce((pre, cur)=>
  cur.score + pre
,0)
console.log(sum)