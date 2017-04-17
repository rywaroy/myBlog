import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './routerConfig';
import './assets/css/public.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueQuillEditor)

const router = new VueRouter({
    // hashbang: true,
    // history: true,
    // scrollBehavior: () => ({ y: 0 }),
    // mode: 'history',
    routes
});
new Vue({
  el: '#app',
    router,
  render: h => h(App)
});
