/**
 * Created by qiangxl on 2017/3/25.
 */

import AdminLogin from './components/AdminLogin.vue';
import Home from './components/Home.vue';
import UserList from './components/UserList.vue';
import HostInfo from './components/HostInfo.vue';
import ArticleList from './components/ArticleList.vue';
import ArticleInfo from './components/ArticleInfo.vue';
import Question from './components/Question.vue';
import QuestionInfo from './components/QuestionInfo.vue';
import Article from './components/Aritcle.vue';
import Message from './components/Message.vue';
import Impression from './components/Impression.vue';
export default [
    { path: '/', redirect: '/home/hostinfo' },
    {
        path: '/adminlogin',
        component: AdminLogin
    },
    {
        path:'/home',
        component:Home,
        children:[
            {
                path:'userlist',
                component:UserList
            },
            {
                path:'hostinfo',
                component:HostInfo
            },
            {
                path:'articlelist',
                component:ArticleList
            },
            {
                path:'articleinfo',
                component:ArticleInfo
            },
            {
                path:'question',
                component:Question
            },
            {
                path:'questioninfo',
                component:QuestionInfo
            },
            {
                path:'article',
                component:Article
            },
            {
                path:'message',
                component:Message
            },
            {
                path:'impression',
                component:Impression
            }
        ]
    }
]