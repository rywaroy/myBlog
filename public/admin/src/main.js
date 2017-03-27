import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './routerConfig';
import './assets/css/public.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

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
});
