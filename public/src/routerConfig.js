import Home from './components/Home.vue';
import ArticleList from './components/ArticleList.vue';
export default[
    {
        path:'/',
        redirect:'home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/article',
        component:ArticleList
    }
]
