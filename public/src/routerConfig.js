import Home from './components/Home.vue';
import ArticleList from './components/ArticleList.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ArticleInfo from './components/ArticleInfo.vue';
import CommentList from './components/CommentList.vue';
import Comment from './components/Comment.vue';
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
        component:ArticleList,
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/articleinfo',
        component:ArticleInfo
    },
    {
        path:'/commentlist',
        component:CommentList
    },
    {
        path:'/comment',
        component:Comment
    }
]
