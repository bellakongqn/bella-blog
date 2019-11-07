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

// 路由拦截 
router.beforeEach((to, from, next) => {
    let isLogin = false;
    if (!isLogin && to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
})

export default router;
```



    

