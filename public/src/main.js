import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routerConfig';
import Mint from 'mint-ui';
import Header from './components/Header.vue';
import store from './store.js'
Vue.use(Mint);
Vue.use(VueRouter);

Vue.component('blog-header', Header); //全局注册头部组件

const router = new VueRouter({
    hashbang: true,
    history: true,
    scrollBehavior: () => ({ y: 0 }),
    // saveScrollPosition:false,
    // mode: 'history',
    routes
});


new Vue({
  el: '#app',
    router,
    store,
  render: h => h(App)
})
