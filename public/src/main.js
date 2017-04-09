import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routerConfig';
import Mint from 'mint-ui';
import Header from './components/Header.vue';

Vue.use(Mint);
Vue.use(VueRouter);

Vue.component('blog-header', Header); //全局注册头部组件
// Vue.filter('timeFilter', function (value) {
//
// })
const router = new VueRouter({
    hashbang: true,
    history: true,
    scrollBehavior: () => ({ y: 0 }),
    routes
});


new Vue({
  el: '#app',
    router,
  render: h => h(App)
})
