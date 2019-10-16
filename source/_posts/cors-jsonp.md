---
title: 跨域
tags:
    - ajax
categories: ajax
---

### jsonp

-----
Jsonp(JSON with Padding) 是 json 的一种"使用模式"，可以跨域读取数据。

<!-- more -->

  直接使用ajax是无法请求非同源站点的json、xml之类，但是可以加载js，使用dataType:"script"将json当做js加载，但是浏览器
拿到这个json它会当做js，所以虽然可以加载成功，但是我们也拿不到这个json。所以可以将json封装成一个fun(json)，然后在本地写一个function fun(data)，浏览器就会将请求的fun(json)当做本地的fun函数来调用。最后要使用jsonp的形式，必须服务端支持jsonp，上面的json{"id":1}，是服务端拼装成的fun({"id":1});

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>JSONP 实例</title>
</head>
<body>
<div id="divCustomers"></div>
<script type="text/javascript">
function callbackFunction(result, methodName)
{
    var html = '<ul>';
    for(var i = 0; i < result.length; i++)
    {
        html += '<li>' + result[i] + '</li>';
    }
    html += '</ul>';
    document.getElementById('divCustomers').innerHTML = html;
}
</script>
<!-- <script src="https://www.baidu.com"></script> -->
<script type="text/javascript" src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"></script>
</body>
</html>
```

### CORS

  CORS（Cross-origin resource sharing，跨域资源共享）是一个 W3C 标准，定义了在必须访问跨域资源时，浏览器与服务器应该
如何沟通。CORS 背后的基本思想，就是使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。

  CORS 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE 浏览器不能低于 IE10。

  整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全
一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

  因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。

  浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。
  只要同时满足以下两大条件，就属于简单请求。

请求方法是以下三种方法之一：
   1. HEAD
   2.GET
   3.POST

HTTP的头信息不超出以下几种字段：
    1.Accept
    2.Accept-Language
    3.Content-Language
    4.Last-Event-ID
    5.Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain
凡是不同时满足上面两个条件，就属于非简单请求。

简单请求
  1.在请求中需要附加一个额外的 Origin 头部，其中包含请求页面的源信息（协议、域名和端口），以便服务器根据这个头部信息来
决定是否给予响应。例如： Origin: http://www.superbella.cn
  2.如果服务器认为这个请求可以接受，就在 Access-Control-Allow-Origin 头部中回发相同的源信息（如果是公共资源，可以回发
*) 。例如： Access-Control-Allow-Origin：http://www.superbella.cn
  3.没有这个头部或者有这个头部但源信息不匹配，浏览器就会驳回请求。正常情况下，浏览器会处理请求。注意，请求和响应都不包含
cookie 信息。
  4.如果需要包含 cookie 信息，ajax 请求需要设置 xhr 的属性 withCredentials 为 true，服务器需要设置响应头部  
Access-Control-Allow-Credentials: true
非简单请求
  1.浏览器在发送真正的请求之前，会先发送一个 Preflight 请求给服务器，这种请求使用 OPTIONS 方法，发送下列头部：
    Origin：与简单的请求相同。
    Access-Control-Request-Method: 请求自身使用的方法。
    Access-Control-Request-Headers: （可选）自定义的头部信息，多个头部以逗号分隔。
    例如：
    Origin: http://www.laixiangran.cn
    Access-Control-Request-Method: POST
    Access-Control-Request-Headers: NCZ
  2.发送这个请求后，服务器可以决定是否允许这种类型的请求。服务器通过在响应中发送如下头部与浏览器进行沟通：

    Access-Control-Allow-Origin：与简单的请求相同。
    Access-Control-Allow-Methods: 允许的方法，多个方法以逗号分隔。
    Access-Control-Allow-Headers: 允许的头部，多个方法以逗号分隔。
    Access-Control-Max-Age: 应该将这个 Preflight 请求缓存多长时间（以秒表示）。
    例如：
    Access-Control-Allow-Origin: http://www.laixiangran.cn
    Access-Control-Allow-Methods: GET, POST
    Access-Control-Allow-Headers: NCZ
    Access-Control-Max-Age: 1728000
    
    一旦服务器通过 Preflight 请求允许该请求之后，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样了。
    优点
    CORS 通信与同源的 AJAX 通信没有差别，代码完全一样，容易维护。
    支持所有类型的 HTTP 请求。
    缺点
    存在兼容性问题，特别是 IE10 以下的浏览器。
    第一次发送非简单请求时会多一次请求。

