---
title: nginx
date: 2020-05-18
tags:
    - nginx
categories: nginx
---
### windows 安装
[nginx](https://nginx.org/en/download.html)
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