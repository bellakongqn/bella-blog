---
title: Vue
tags:
    - Vue
categories: Vue
---

### Vue项目
------

1.vue-cli（vue脚手架快速搭建vue项目）
    npm install -g @vue/cli
    vue create [journal] []里为创建项目名
2.启动项目 
    npm run serve
3.路由设置
    vue-router 路由配置
    npm install vue-router
<!-- more -->
------

demo:

- 在src下创建一个router.js的文件
- 引入vue vue-router

```
import Vue from "vue";
import VueRouter from "vue-router";
```
- Vue.use() 明确地安装路由功能
```
Vue.use(VueRouter);
```
- 创建路由 🐖：ew VueRouter({routes}) 是 routes 而不是 routers
```
// 定义路由组routes
const routes = [
{ path: '/', redirect: '/home' },
{ path: "/login", component: login },
{ path:"/home", component: home, meta: { name: '主页' } },
{ path:"/about", component: about, meta: { name: '关于'} }
]

var router =  new VueRouter({
    // 引入路由组 为routes：routes的缩写
    routes
})
```
- 导出路由 
```
export default router;
```
- 在main.js中将路由引入
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  // 引入
  router,
  render: h => h(App),
}).$mount('#app')
```

整体代码router.js：
```
import Vue from "vue";
import VueRouter from "vue-router";

import home from "./views/home/home.vue";
import login from './views/login/login.vue'
import about from './views/about/about.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: "/login", component: login },
    { path:"/home", component: home, meta: { name: '主页' } },
    { path:"/about", component: about, meta: { name: '关于'} }
]

var router =  new VueRouter({
    routes
})

export default router;
```
4.vuex +  vue router 设置路由权限
  npm install vuex --save
  [vuex.js](https://vuex.vuejs.org/installation.html)
  - 登录前不可进行操作，导航操作到其它路由，需跳转到登录页
  - 通过vuex 设置登录状态
tip:只设置isLogin字段来判断，登录之后，直接修改当前路由为其它路由仍会被跳转到登录页
解决办法：通过设置token，根据当前token有无来判断是否已经登录
  - 创建store 来存储登录状态
login.js
  ```
  const state ={
    isLogin:false,
    token: localStorage.getItem('token') || '',
  }
  const actions  = {
        
  }

  const mutations = {
    // 登录|登出
    loginIn(state){
        state.isLogin = true;
        localStorage.setItem('token', '摸鱼ing')
    },
    loginOut(state){
        state.isLogin = false;
        localStorage.removeItem('token')
    },
    
  }

const getters = {
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
```
index.js
```
import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    login,
  }
})
```
  - 在main.js中引入store,同时设置路由权限
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.login.token === '') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

```
 -  登录页登录时触发登录事件
```
<Button text="登录" size="small" @click="loginIn"/>
```
```
loginIn(){
        this.$store.commit('login/loginIn')
        // 登录完成之后的跳转
        this.$router.push('/home')
}
```
项目结构
![](/assets/journal.png)



    

