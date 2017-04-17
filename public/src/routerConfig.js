import Home from './components/Home.vue';
import ArticleList from './components/ArticleList.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ArticleInfo from './components/ArticleInfo.vue';
import CommentList from './components/CommentList.vue';
import Comment from './components/Comment.vue';
import Game from './components/Game.vue';
import UserInfo from './components/UserInfo.vue';
import My from './components/My.vue';
import QuestionList from './components/QuestionList.vue';
import QusetionInfo from './components/QuestionInfo.vue';
import Answer from './components/Answer.vue';
import Message from './components/Message.vue';
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
    },
    {
        path:'/game',
        component:Game
    },
    {
        path:'/user',
        component:UserInfo
    },
    {
        path:'/my',
        component:My
    },
    {
        path:'/questionlist',
        component:QuestionList
    },
    {
        path:'/questioninfo',
        component:QusetionInfo
    },
    {
        path:'/answer',
        component:Answer
    },
    {
        path:'/message',
        component:Message
    }
]
