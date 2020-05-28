1. cors
跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

图片跨域

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

2. csrf
![](/assets/csrf.png)
 - 受害者先登陆受信网站A，网站A在本地生成cookie。
 - 在不登出A(或者A的cookie有效)的情况下，访问恶意网站B。
 [https://nullcc.github.io/2016/09/07/CSRF%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90](https://nullcc.github.io/2016/09/07/CSRF%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90)


3. css
攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。