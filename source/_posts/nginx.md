---
title: nginx
date: 2020-05-18
tags:
    - nginx
categories: nginx
---
### windows 安装
[nginx](https://nginx.org/en/download.html)
<!-- more -->
![](/assets/nginx-index)
1. 点击后就会下载，下载完成后开始安装，其实官网已经告诉了如何安装，右侧“documentation -> nginx for windows”就有详细的说明
2. 下载完成后，解压缩，运行cmd，使用命令进行操作
```
cd c:\
unzip nginx-1.17.10.zip
cd nginx-1.17.10
start nginx
```
3. 启动nginx服务，启动时会一闪而过是正常的
4. 查看任务进程是否存在，dos或打开任务管理器都行 tasklist /fi "imagename eq nginx.exe"
打开任务管理器在进程中看不到nginx.exe的进程（双击nginx.exe时会显示在这里），需要打开详细信息里面能看到隐藏的nginx.exe进程
5.  如果都没有可能是启动报错了查看一下日志，在nginx目录中的logs文件夹下error.log是日志文件
6.  修改配置文件，进入解压缩目录，直接文件夹点击进去即可，不需要从dos操作
7.  在conf目录下找到nginx.conf使用txt文本打开即可，找到server这个节点，修改端口号，如果有需求可以修改主页目录没有就不用修改
8. nginx -s reload
9. 之后就打开浏览器访问刚才的域名及端口http://localhost:8800，出现欢迎页就说明部署成功了
10. 关闭nginx服务使用以下命令，同样也是一闪而过是正常的，看一下是否进程已消失即可
快速停止
nginx -s stop
完整有序的关闭
nginx -s quit
### mac 
1. 安装homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
2. brew install nginx
3. 主页的文件在/usr/local/var/www 文件夹下
    对应的配置文件地址在/usr/local/etc/nginx/nginx.conf
4. brew services start nginx
5. 更改nginx.conf 调整配置
### conf
```
server {
    listen       8080;   #配置监听端口
    server_name  localhost;  //配置域名

    #charset koi8-r;     
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   html;     #服务默认启动目录
        index  index.html index.htm;    #默认访问文件
    }

    #error_page  404              /404.html;   # 配置404页面

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;   #错误状态码的显示页面，配置后需要重启
    location = /50x.html {
        root   html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```
### 自定义错误页和访问设置
多错误指向一个页面
error_page指令用于自定义错误页面，500，502，503，504 这些就是HTTP中最常见的错误代码，/50x.html 用于表示当发生上述指定的任意一个错误的时候，都是用网站根目录下的/50.html文件进行处理。
单独为错误置顶处理方式
有些时候是要把这些错误页面单独的表现出来，给用户更好的体验。所以就要为每个错误码设置不同的页面。
error_page 404  /404_error.html;
error_page  404 https://github.com/bellakongqn;
简单实现访问控制
有时候我们的服务器只允许特定主机访问，比如内部OA系统，或者应用的管理后台系统，更或者是某些应用接口，这时候我们就需要控制一些IP访问，我们可以直接在location里进行配置。
```
location / {
    deny   123.9.51.42;
    allow  45.76.202.231;
}
```
复杂访问控制权限匹配
对于网站下的img（图片目录）是运行所有用户访问，但对于网站下的admin目录则只允许公司内部固定IP访问
```
location =/img{
    allow all;
}
location =/admin{
    allow  45.76.202.231;
    deny   all;
}
```
现在我们要禁止访问所有php的页面，php的页面大多是后台的管理或者接口代码，所以为了安全我们经常要禁止所有用户访问，而只开放公司内部访问的。
```
location ~\.php$ {
    deny all;
}
```
### 设置虚拟主机
```
server{
        listen 8001;
        server_name localhost;
        root html;
        index 8801.html;
}
```
### 基于IP的虚拟主机
基于IP和基于端口的配置几乎一样，只是把server_name选项，配置成IP就可以了。
比如上面的配置，我们可以修改为：
```
server{
        listen 80;
        server_name 112.74.164.244;
        root html;
        index 8801.html;
}
```

### 配置以域名为划分的虚拟主机
```
server {
    listen       80;
    server_name  nginx.jspang.com;
```
复制代码我们再把同目录下的8001.conf文件进行修改，改成如下：
```
server{
        listen 80;
        server_name nginx2.jspang.com;
        location / {
                root html;
                index 8801.html;
        }
}
```

### 最简单的反向代理
现在我们要访问http://nginx2.jspang.com然后反向代理到jspang.com这个网站。我们直接到etc/nginx/con.d/8001.conf进行修改。
修改后的配置文件如下：
server{
        listen 80;
        server_name nginx2.jspang.com;
        location / {
               proxy_pass http://jspang.com;
        }
}

参考博客
[https://juejin.im/post/5bd7a6046fb9a05d2c43f8c7](https://juejin.im/post/5bd7a6046fb9a05d2c43f8c7)