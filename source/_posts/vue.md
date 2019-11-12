---
title: Vue
tags:
    - Vue
categories: Vue
---

### Vue项目 
------

项目地址（https://github.com/bellakongqn/journal.git）

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
5.完善注册逻辑
 - 完善input组件,增加页面上提示
 ```
 <template>
  <div class="inputContainer">
      <p class="inputLabel">{{label}}</p>
      <input class="input" 
             :type="type"
             autocomplete='off'
             @change="$emit('input', $event.target.value)"
            >
      <p class="warningText" v-if="warning!==''">{{warning}}</p>
  </div>
</template>

<script>
export default {
  name: "Input",
  
  props: {
    type:String,
    label:String,
    warning:String||'',
  },
  methods: {
    handleOnChange($event) {
      this.$emit('change', $event.target.value)
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./Input.less');
</style>
 ```
 
 - 页面注册逻辑书写
 ```
 toRegister(){
            const  regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(this.email===''|| !regEmail.test(this.email)){
                this.errText = "邮箱格式不正确"
            }else if(this.password===''||this.password.length<6){
                this.errText = '请输入密码&密码至少6位'
            }else if(this.password!==this.rePassword){
                this.errText = '两次密码不一致,请确认'
            }else{
                this.$router.push('/login')
            }

  },
 ```
 🐖：原生进行判断，未使用框架
![](/assets/register.png)

6.登录之后跳转页面进行页面导航（嵌套路由）
```
const routes = [
    { path: '/', redirect: '/home' },
    { path: "/login", component: login },
    { path: '/register', component:register },
    { path:"/home", component: home, 
      redirect: '/index', 
      // 登录之后的默认路由
      meta: { name: '主页' },
      children:[
        { path:'/index', component:index },
        { path:'/diary', component:diary }, // 日记
        { path:'/memo', component:memo },   // 备忘录
      ] },
    { path:"/about", component: about, meta: { name: '关于'} },
]
```
Home主页进行router-link router-view
home.vue代码
```
<template>
    <div>
      <router-link to="/diary">Diary</router-link>
      <router-link to="/memo">Memo</router-link>
      <router-link to="/diary">Anniversary</router-link>
      <router-link to="/memo">War</router-link>
      <router-link to="/memo">Moive</router-link>
            
      <router-view></router-view>
    </div>
</template>
```
根据自己的设计进行页面样式的书写
7.vuex 的使用 mapState mapMutations mapActions mapGetters
使用这些简化从store中取数据的方法
在computed中使用mapState，mapGetters来获取数据
```
computed:{
        ...mapState({
          // 从login模块里取showCard字段
            showCard:state=>state.login.showCard
        }),
        ...mapGetters({
          // 从count模块中取oddNumber
          oddNumber:'count/oddNumber'
          })
},
```
在methods中使用mapMutations，mapActions来调用方法
```
methods:{
        // 获取login模块的showCardDetail方法，将其映射为页面的showCardDetail方法
        ...mapMutations({
            showCardDetail:'login/showCardDetail',
        }),
        // 获取count模块的add方法，将其映射为页面的add方法
        ...mapActions({
          add:'count/add'
        }),
        loginOut(){
            this.$store.commit('login/loginOut')
            this.$router.push('/login')
        },
  }
```
当前页面
![](/assets/preview.png)





    

