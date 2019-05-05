---
title: Git操作
tags:
    - git
categories: Git
thumbnail: '../assets/post-img/git downloads.png'
---
Git操作
<!-- more -->
1. 安装[git](https://git-scm.com/),然后按默认选项安装即可。
![](/assets/post-img/git downloads.png)
2.安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！
![](/assets/post-img/gitbash.png)
3. 安装完成之后配置参数
- git config --global user.name "Your Name"
- git config --global user.email "email@example.com"
4. 清空参数配置
- git config --system --unset credential.helper
再进行git 操作 来重置用户名密码
或者出现这个情况
remote: HTTP Basic: Access denied
fatal: Authentication failed for 'http://********
![](/assets/post-img/giterr.png)
5. 将本地项目上传git
   1. 在git上新建git仓库
   ![](/assets/post-img/newgit.png)
   点击new
   ![](/assets/post-img/new-res.png)
   2.点击Clone or dowload会出现一个地址,复制地址
   ![](/assets/post-img/copyAddress.png)
   3.在本地项目上执行git init
   4.git add . (!后面小点与前面有一个空格)
   5.git status 本地工作区和暂存区的版本进行比较
   6.git commit -m "注释内容"
   7.git remote add origin https://github.com/*** (第2步复制的地址)
     将本地和远程服务器建立联系
   8.git pull origin master
    拉取远程分支,防止冲突,出现下图情况时，输入   :wq
    ![](/assets/post-img/copyAddress.png)
   9.git push -u origin master
    将本地修改推送到远程分支上


