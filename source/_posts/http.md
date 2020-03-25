---
title: Http 协议
date: 2020-02-12 12:10:10
tags:
    - Http
categories: Http
thumbnail: '../assets/http.png'
---
#### Http  get 
----------
![](/assets/http.png)
node.js http 
服务端
<!-- more -->
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
