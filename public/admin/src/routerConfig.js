/**
 * Created by qiangxl on 2017/3/25.
 */

import AdminLogin from './components/AdminLogin.vue';
import Home from './components/Home.vue';
import UserList from './components/UserList.vue';
import HostInfo from './components/HostInfo.vue';
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
            }
        ]
    }
]