import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routerConfig';
import Mint from 'mint-ui';
Vue.use(Mint);
Vue.use(VueRouter);

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
