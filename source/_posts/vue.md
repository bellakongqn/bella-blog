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

vuex使用（购物车案例）
页面：
![](/assets/productsCar.png)
- 购物车数据分为两part,一个商品products，二是购物车cart
- 首先全部商品列表（设计假数据接口来通过接口获取所有商品）
  （以及结算时的函数）
  ```
  const _products = [
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2,src:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1852638158,294812004&fm=26&gp=0.jpg'},
    {"id": 2, "title": "H&M T-Shirt", "price": 10.99, "inventory": 10,src:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1932044032,2016526258&fm=26&gp=0.jpg'},
    {"id": 3, "title": "Charli XCX", "price": 19.99, "inventory": 5,src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=497783299,2210513014&fm=26&gp=0.jpg'}
  ]
  
  export default {
    getProducts (cb) {
      setTimeout(() => cb(_products), 100)
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
          ? cb()
          : errorCb()
      }, 100)
    }
  }
  ```
- 商品页面 请求接口获取数据
  在products定义方法来请求数据
  actions 必须要通过触发即 commit mutations才可以更改数据,
  一般action里请求接口，然后触发mutations里对应的方法来更改数据
  ```
  const actions = {
    getAllProducts ({ commit }) {
      shop.getProducts(products => {
        commit('setProducts', products)
      })
    }
  }
  const mutations = {
    setProducts (state, products) {
      state.all = products
  },
  ```
  商品页面获取商品列表
  ```
  computed: mapState({
    //   获取products中的所有产品all:[]
      products: state => state.products.all
  })
  ```
  然后展示数据,为了实现图片自适应，将图片设置为背景，然后进行布局,背景图片拼接为
   <div :style="{backgroundImage: 'url('+product.src+')'}"  class="imgContainer"/>
  ```
  <div
      class="diaryItem"
      v-for="product in products"
      :key="product.id">
      <div :style="{backgroundImage: 'url('+product.src+')'}"  class="imgContainer"/>
      <span>{{ product.title }}</span>
      <span>{{ product.price |currency  }}</span>
      <button
          class="buyBtn"
          :disabled="!product.inventory"
          @click="addProductToCart(product)">
          Add to cart
      </button>
  </div>
  ```
  - 点击按钮将商品加入购物车，先将支付状态是为null,
    判断购物车内是否有同样商品，若有找出然后将数量+1，若不存在，则将该商品加入购物车
    然后将对应商品的数量-1
  ```
  // 添加商品进入购物车 actions
    addProductToCart ({ state, commit }, product) {
        // 先将支付状态支置null
      commit('setCheckoutStatus', null)
    //   判断商品库存是否大于0
      if (product.inventory > 0) {
        //  找出购物车内与新增商品id相同的数据
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
            // 新增一种未添加过的商品
          commit('pushProductToCart', { id: product.id })
        } else {
            // 添加过的商品，增加商品数量
          commit('incrementItemQuantity', cartItem)
        }
        // 从商品里移除一个商品数量 全局中提交action 增加root:true
        commit('products/decrementProductInventory', { id: product.id }, { root: true })
      }
    }
  ```
  // cart
  ```
  const mutations = {
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    pushProductToCart (state, { id }) {
      state.items.push({
        id,
        quantity: 1
      })
    },
  
    incrementItemQuantity (state, { id }) {
      const cartItem = state.items.find(item => item.id === id)
      cartItem.quantity++
    }
  }
  ```
  products:
  ```
  //   减去一条商品数量
  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
  ```
  - 购物车内商品总价格及信息
    getters:
    ```
    const getters = {
    // 购物车内商品 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
    cartProducts: (state, getters, rootState) => {
      return state.items.map(({ id, quantity }) => {
        const product = rootState.products.all.find(product => product.id === id)
        return {
          src:product.src,
          title: product.title,
          price: product.price,
          quantity
        }
      })
    },
  
    // 购物车内商品价格
    cartTotalPrice: (state, getters) => {
      return getters.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }
  }
    ```
    页面内取数据
    ```
     computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus
      }),
      // 获取购物车内初始商品及初始价格
      ...mapGetters('cart', {
        products: 'cartProducts',
        total: 'cartTotalPrice'
      })
    },
    ```
  - 结算
  ```
  methods: {
    //   结算
    checkout (products) {
      this.$store.dispatch('cart/checkout', products)
    }
  }
  ```
  ```
  checkout ({ commit, state }, products) {
      const savedCartItems = [...state.items]
      commit('setCheckoutStatus', null)
      // empty cart
      commit('setCartItems', { items: [] })
      // 结算接口
      shop.buyProducts(
        products,
        () => commit('setCheckoutStatus', 'successful'),
        () => {
          commit('setCheckoutStatus', 'failed')
          // rollback to the cart saved before sending the request
          commit('setCartItems', { items: savedCartItems })
        }
      )
    },
  ```
  支付成功清空购物车
  支付是被购物车数量不变
  ```
  setCartItems (state, { items }) {
      state.items = items
  },
  ```






    

