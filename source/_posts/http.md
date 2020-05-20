---
title: Http 协议
date: 2020-02-12 12:10:10
tags:
    - Http
categories: Http
thumbnail: '../assets/http.png'
---
### HTTP
HyperText Transfer Protocol 超文本<传输<协议
#### 超文本
传输文字、图片、音频、视频，甚至点击文字或图片能够进行超链接的跳转，那么文本的语义就被扩大了，这种语义扩大后的文本就被称为超文本(Hypertext)。
#### 传输
两台计算机之间会形成互联关系进行通信，我们存储的超文本会被解析成为二进制数据包，由传输载体负责把二进制数据包由计算机终端传输到另一个终端的过程称为传输(transfer)。
#### 协议
计算机之间的相互通信需要共同遵守一定的规则，这些规则就称为网络协议。

>HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范

### 浏览器 Web Browser
地址栏输入URL，浏览器会向DNS提供网址，由它来完成 URL 到 IP 地址的映射。然后将请求你的请求提交给具体的服务器，在由服务器返回我们要的结果（以HTML编码格式返回给浏览器），浏览器执行HTML编码，将结果显示在浏览器的正文。这就是一个浏览器发起请求和接受响应的过程。

### Web服务器 web server
Web 服务器一般指的是网站服务器，上面说到浏览器是 HTTP 请求的发起方，那么 Web 服务器就是 HTTP 请求的应答方，Web 服务器可以向浏览器等 Web 客户端提供文档，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。

### CDN Content Delivery Network：内容分发网络
使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率

### 协议
#### TCP/IP 协议簇
TCP 协议的全称是 Transmission Control Protocol 的缩写，意思是传输控制协议，HTTP 使用 TCP 作为通信协议，这是因为 TCP 是一种可靠的协议，而可靠能保证数据不丢失。

IP 协议的全称是 Internet Protocol 的缩写，它主要解决的是通信双方寻址的问题。IP 协议使用 IP 地址 来标识互联网上的每一台计算机，可以把 IP 地址想象成为你手机的电话号码，你要与他人通话必须先要知道他人的手机号码，计算机网络中信息交换必须先要知道对方的 IP 地址。

#### DNS
DNS 的全称是域名系统（Domain Name System，缩写：DNS），它作为将域名和 IP 地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。

#### URI / URL
URI的全称是（Uniform Resource Identifier），中文名称是统一资源标识符，使用它就能够唯一地标记互联网上资源。

URL的全称是（Uniform Resource Locator），中文名称是统一资源定位符，也就是我们俗称的网址，它实际上是 URI 的一个子集。

### HTTPS
HTTP+SSL


### 浏览器输入Url之后发生了什么
1.DNS域名解析
2.建立TCP连接
3.发送HTTP请求
4.服务器处理请求
5.返回响应结果
6.关闭TCP连接
7.浏览器解析HTML
8.浏览器布局渲染

#### Http  get 

----------
![](/assets/http.png)
node.js http 
服务端
```
var http = require('http')

http.createServer((request,response)=>{
    request.on('data',(chunk)=>{
        console.log('data:'+chunk)
    })

    request.on('end',()=>{
        onsole.log(request.method);
        console.log(JSON.stringify(request.headers));
        console.log('recive request end');
    })

    request.on('close',()=>{
        console.log('recive request close');
    });

    response.writeHead(200,{"Content-type":"text-plain;charset:UTF8"})
    response.end('heelo Node.js')
}).listen(3000)

console.log("Server Run");
``

node.js 客户端
```
const http = require('http');
let reqData = '';
const req = http.request({
    // 'hostname':'www.baidu.com',
    'host': '127.0.0.1',
    'port': 3000,
    // 'port':80,
    'method':'GET'
}, (res) => {
    // console.log(res);
    res.on('data', (chunk) => {
        reqData += chunk;
    });
    res.on('end', () => {
        console.log(reqData);
        console.log('request end...');
    });
});
req.end();
req.on("error", function (err) {
    console.log(err.message);
});
```
![](/assets/nodejsServerBrowser.png)
