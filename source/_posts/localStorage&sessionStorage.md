---
title: localStorage、sessionStorage、Cookie的区别及用法
tags:
    - websocket
categories: websocket
---

### webstorage

------
webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage。

### localStorage

----
localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

### sessionStorage

----
sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。源生接口可以接受，亦可再次封装来对Object和Array有更好的支持.


------

localStorage和sessionStorage使用时使用相同的API：
```
localStorage.setItem("key","value");//以“key”为名称存储一个值“value”

localStorage.getItem("key");//获取名称为“key”的值

localStorage.removeItem("key");//删除名称为“key”的信息。

localStorage.clear();​//清空localStorage中所有信息
```

### 作用域不同

-----
不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的不同页面间可以共享相同的 localStorage（页面属于相同域名和端口），但是不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。


### Cookie

----
生命期为只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。 存放数据大小为4K左右 。有个数限制（各浏览器不同），一般不能超过20个。与服务器端通信：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题。但Cookie需要程序员自己封装。

cookie的优点：具有极高的扩展性和可用性

-----
1.通过良好的编程，控制保存在cookie中的session对象的大小。
2.通过加密和安全传输技术，减少cookie被破解的可能性。
3.只有在cookie中存放不敏感的数据，即使被盗取也不会有很大的损失。
4.控制cookie的生命期，使之不会永远有效。这样的话偷盗者很可能拿到的就   是一个过期的cookie。

cookie的缺点：

----
1.cookie的长度和数量的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB。否则会被截掉。
2.安全性问题。如果cookie被人拦掉了，那个人就可以获取到所有session信息。加密的话也不起什么作用。
3.有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务端保存一个计数器。若把计数器保存在客户端，则起不到什么作用。

