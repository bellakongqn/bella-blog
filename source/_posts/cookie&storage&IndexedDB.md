---
title: 客户端存储
date: 2021-02-03 20:52:10
---
在客户端存储信息, 方式：cookie, sessionStorage, localStorage, IndexedDB
<!-- more -->
### cookie
服务端在响应http请求时，通过发送Set-Cookie HTTP头部包含会话信息。
http响应:
Set-Cookie: name=value
浏览器存储会话信息，并在之后的每个请求中通过HTTP头部cookie再将它们发送回服务器
http请求:
cookie: name=value
这些发回服务器的额外信息可用于唯一标识发送请求的客户端

#### cookie是与特定域进行绑定的。
设置cookie后，它会与请求一起发送到创建它的域。这个限制能保证cookie中存储的信息只对被认可的接受者开放，不被其他域访问。（即同源策略）

每个域能设置的cookie总数是受限制的，但是不同浏览器不一致。

#### cookie的构成
名称： 唯一标识cookie的名称
值：存储在cookie中的字符串值
域：cookie有效的域。发送到这个域的所有请求都会包含对于的cookie. 这个域可能包含子域，也可不包含。如果不明确设置，则默认为设置cookie的域
路径：请求URL中包含这个路径，才会把cookie发送到服务器
过期时间：表示何时删除cookie的时间戳。默认情况下，浏览器会话结束会删除所有cookie。不过也可以设置，用来指定具体的删除cookie的时间。设置过去的时间会立即删除cookie。
安全标识：设置后，在SSL安全链接下才会把cookie发送到浏览器。(唯一一个非名/值对)

这些参数在Set-Cookie的头部用分号加空格隔开
Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com; path=/; secure
实际发送到服务器的只有cookie的名/值对， 其余expires等都不会发送。

document.cookie返回包含页面中所有的有效cookie的字符串。也可以通过document.cookie来设置新的cookie字符串。将过期时间设置为过去或者将值设为空字符串可以删除cookie

在js中读写cookie不是很直观 -> 辅助函数 CookieUtil

子cookie 辅助函数 -> SubCookieUtil
为绕过浏览器对每个域cookie数的限制，提出来子Cookie的概念。
name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5
然后通过解析拿到所有cookie值

🐷： 还有一种叫做HTTP-only的cookie。它既可以在浏览器设置，也可以在服务器设置，但只能在服务器读取。

### Web Storage
解决 通过客户端存储 不需要频繁发送回服务器的数据 时 使用cookie的问题。
包括localStorage 和 sessionStorage

Storage类型用来保存名/值对数据，直至存储空间上限（由浏览器决定）。
clear(): 删除所有值
getItem(name): 取给定name的值
key(index):取给定数值位置的名称
removeItem(name):删除给定name的名/值对。
setItem(name, value): 设置给定name的值。
也可以使用delete操作符删除属性， 通过length属性可以确定Storage对象中保存了多少名/值对。

#### sessionStorage
只存储会话数据，这意味着数据只会存储到浏览器关闭。存储在sessionStorage对象中的数据只能由最初存储数据的页面使用。在多页应用程序中的用处有限。

通过Web Storage写入的数据都可以立即被读取。

遍历
```
sessionStorage.setItem('bella', 'xixi')
sessionStorage.length
sessionStorage.setItem('waytt', 'hhaa')
for(let i = 0; i<sessionStorage.length; i++ ){
  let key = sessionStorage.key(i)
  let value = sessionStorage.getItem(key)
  console.log(key, value)
}
```

#### localStorage
在客户端持久存储数据。
要访问同一个localStorage对象，页面必须来自同一个域（子域不可）,在相同的端口使用相同的协议。
同sessionStorage用法一致。

#### 存储事件
每当Storage对象发生变化时，都会触发storage事件。这个事件的事件对象属性：
domain:存储变化的域
key:被设置或删除的键
newValue:键被设置的新值，若键被删除则为null
oldValue: 键变化之前的值。

```
  window.addEventListener('storage', (e)=>{
    console.log(e.domian)
  })
```

localStorage和 sessionStorage上的任何更改都会触发storage事件，但storage不区分这两者。
（可以用来解决在两个页面打开购物车，分别添加商品到购物车的同步事件）

### IndexedDB
IndexedDB数据库就是在一个公共命名空间下的一组对象存储。

使用IndexedDB数据库的第一步是调用indexedDB.open()方法，并给它传入一个要打开的数据库名称。如果已存在，则发送一个打开它的请求；如果不存在，则会发送一个创建并打开这个数据库的请求。这个方法会返回IDBRequest的实例，可以添加onerror和onsuccess事件处理程序。

建立数据库连接之后，下一步就是使用对象存储。🤔：存储什么类型的数据。
创建对象存储是必须指定一个键。不存在open会创建一个新数据库，然后触发onupgradeneeded事件，可以为这个事件设置处理程序
```
request.onupgradeneeded = (e) => {
  const db = e.target.result
  if(db.objectStoreNames.contains('users')) {
    db.deleteObjectStore('users')
  }
  db.createObjectStore('users', {keyPath: 'username'})
}
```
#### 事务
创建对象存储之后，剩下所有的操作都是通过事务完成的。
let transaction = db.transaction()
不指定参数，则对数据库中所有的对象存储有只读权限。指定参数
let transaction = db.transaction('users') ->
确保在事务期间只加载users对象存储中的信息。多个传入数组。

修改访问模式： readonly , readwrite, versionchange
let transaction = db.transaction('users', 'readwrite') -> 
这样事务就可以对users对象存储进行读写

有了事务的引用，就可以使用objectStore()方法并传入对象存储的名称以访问特定的对象存储。
add() put() 添加和更新对象。get()获取对象， delete()删除对象 clear()删除所有对象。
这些方法都创建新的请求对象。

let transaction = db.transaction('users')
store = transaction.objectStore('users')
request = store.get('007')
request.onerror
request.onsuccess

事务可以完成请求，事务本身也有事件处理程序。onerror 和 oncomplete

#### 游标查询
使用事务可以通过一个已知键获取一条数据。获取多条数据，需在事务中创建一个游标。游标是指向结果集的指针。
对象存储上调用openCursor()创建游标。也返回一个请求。
let transaction = db.transaction('users')
store = transaction.objectStore('users')
request = store.openCursor()
request.onerror
request.onsuccess -> e.target.result访问对象存储中的下一条数据。

IDBCursor实例属性 direction / key/ value/ primaryKey
游标可以用来更新个别记录。cursor.update()
删除cursor.delete()
默认情况下游标只会创建一个请求，要创建另一个请求，-> 
continue(key)
advance(count)

#### 键范围
IDBKeyRange.only('007')
IDBKeyRange.lowerBound('007') // 从007开始到最后
IDBKeyRange.lowerBound('007', true) // 从007的下一条开始到最后
IDBKeyRange.upperBound('007') 
range = IDBKeyRange.upperBound('007', true) 
store.openCursor(range)

#### 游标方向
openCursor接收两个值
第一个参数为null 默认键的范围是所有值。
第二个参数 prev prevunique  nextunique

#### 索引
需要为对象储存指定多个键。将用户id作为主键，在用户名上创建索引。
let transaction = db.transaction('users')
store = transaction.objectStore('users')
index = store.createIndex('username', 'username', {unique: true})
第一个是索引的名称， 第二个是索引属性的名称，第三个参数是包含键unique的options对象。

在对象存储上调用index()也可以得到同一个实例。
let transaction = db.transaction('users')
store = transaction.objectStore('users')
index = store.index('username')
可以在索引上创建游标




