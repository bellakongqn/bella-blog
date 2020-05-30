---
title: cors csrf xss 
date: 2020-05-30 13:15:00
tags:
    - css
categories: css
---
### cors
跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。
<!-- more -->
### csrf
Corss-Site Request Forgery => 跨站请求伪造
攻击者诱导受害者进入第三方网站，在第三方网站向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户检测，达到冒充用户对被攻击网站执行某项操纵的目的。

流程
 - 受害者登陆a.com，并保留了登陆凭证cookie
 - 攻击者引诱受害者访问b.com
 - b.com 向 a.com发送了一个请求
 - a.com接受到请求后，对请求进行验证，并确认是受害者的凭证，误认为是受害者自己发送的请求
 - a.com以受害者的名义执行了这个请求
 - 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。
![](/assets/csrf.png)
 - 受害者先登陆受信网站A，网站A在本地生成cookie。
 - 在不登出A(或者A的cookie有效)的情况下，访问恶意网站B。

### 常见攻击类型
img 请求
```
<img src="http://bank.example/withdraw?amount=10000&for=hacker" > 
```
form 提交
```
<form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```
链接
```
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
<a/>
```
#### 使用验证码 判断来源(referer)
### XSS 
Cross-Site Scripting => 跨站脚本攻击 => XSS
攻击者往Web页面里插入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息，进而危害数据安全

XSS本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨那些脚本是可信的，导致恶意脚本被执行。而由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，或者利用这些信息冒用用户向网站发起攻击者定义的请求

存储型XSS->攻击者将恶意代码提交到目标网站的数据库中。用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

反射型 XSS-> 攻击者构造出特殊的 URL，其中包含恶意代码。用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

DOM 型 XSS->攻击者构造出特殊的 URL，其中包含恶意代码。用户打开带有恶意代码的 URL。用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

### img 跨域
canvas  绘制图片的时候，图片的来源是跨域的时候，是无法执行的。
HTML crossOrigin属性解决资源跨域问题

```
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var img = new Image();
img.crossOrigin = ''; // 解决图片操作跨域
img.onload = function () {
    context.drawImage(this, 0, 0);
    context.getImageData(0, 0, this.width, this.height);
};
img.src = 'https://...';';
```
crossOrigin=anonymous相对于告诉对方服务器，你不需要带任何非匿名信息过来。例如cookie，因此，当前浏览器肯定是安全的

### form 提交跨域吗？
```
<from action="baidu.com">
    // you form filed
</from>
```
上面这个表单提交后，剩余的操作就交给了action里面的域baidu.com，本页面的逻辑和这个表单没啥关系，由于不关系请求的响应，所以浏览器认为是安全的。

而使用ajax来控制form的请求的时候，页面js会需要知道请求的返回值，这个时候，浏览器发出跨域请求，需要获得授权才可以成功请求，否则是会拒绝的。