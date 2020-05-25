---
title: webSocket
date: 2020-05-25 10:30:21
tags:
    - webSocket
categories: webSocket
---
webSocket：服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。
git 地址 https://github.com/bellakongqn/studyProgress/tree/master/websocket_learning
### 属性
WebSocket.onclose 用于指定连接关闭后的回调函数。
WebSocket.onerror 用于指定连接失败后的回调函数。
WebSocket.onmessage 用于指定当从服务器接受到信息时的回调函数。
WebSocket.onopen 用于指定连接成功后的回调函数。
### 事件
onclose : 当一个 WebSocket 连接被关闭时触发。
error : 当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。
message : 当通过 WebSocket 收到数据时触发。
open ： 当一个 WebSocket 连接成功时触发。
<!-- more -->

运用
```
import React, { useRef, useEffect, useCallback, useState } from 'react';
import './App.css';

function App() {
  const ws = useRef()
  const input = useRef()

  const [msges, setMsges] = useState([])

  const handleOnMessage = useCallback((event) => {
    // 拿到返回消息
    console.log(event.data)
    if (typeof event.data !== 'string') return;
    // 与之前数据进行拼接
    const obj = JSON.parse(event.data)
    setMsges(list => list.concat(obj))
  }, [])



  const handleSendMessage = useCallback(() => {
    if (ws.current) {
      const msg = input.current ? input.current.value : ''
      // 发送消息
      ws.current.send(msg)
      setMsges(list => list.concat({me: true, content: msg}))
      input.current.value = ''
    }
  }, [])


  const handleKeyUp = useCallback(e => {
    if (e.keyCode === 13) {
      handleSendMessage()
    }
  }, [handleSendMessage])



  useEffect(() => {
     // 连接websocket 接口
    const wssocket = new WebSocket('ws://localhost:4000/chat')

    // 监听收到新消息事件 
    wssocket.addEventListener('message', handleOnMessage)

    ws.current = wssocket;

    return () => {
      // 断开链接
    }
  }, [])

  return (
    <div className="App">
      <main>
        {
          msges.map((m, index) => (
            <div className="msg" key={index + 'm'}>
              <span>{m.me ? '我' : '其他人'}</span>
              <p>{ m.content}</p>
            </div>
          ))
        }
      </main>
      <footer>
        <input ref={input} placeholder="请输入消息" onKeyUp={handleKeyUp} />
        <button onClick={handleSendMessage}>send</button>
      </footer>
    </div>
  );
}

export default App;

```
ws.js
```
const express = require('express')
const http = require('http')
const ws = require('ws')

const app = express()

const server = http.createServer(app)

app.get('/', (req, res) => {
    res.send('hello')
})

let clients = []


const wsserver = new ws.Server({server: server, path: '/chat'})

wsserver.on('connection', (ws) => {
    console.log('connection started')
    clients.push(ws);
    ws.on('message', (msg) => {
        clients.forEach(client => {
            if (client !== ws) {
                try {
                    client.send(JSON.stringify({content: msg, me: false}));
                } catch (error) {
                    clients = clients.filter(c => c !== ws)
                }
            }
        })
    })

    

    // ws.send('hi')
})



server.listen(4000)
```
