<template>
    <div>
        <blog-header :title="item.nickname"></blog-header>
        <div class="blog-body bgfff">
            <div class="user-content">
                <div :class="['user-like',item.islike?'liked':'']" @click="like()"></div>
                <div class="user-avatar" :style="{backgroundImage:'url('+avatar+')'}"></div>
                <div :class="['user-nickname','name',item.vip?'vip':'']">{{item.nickname}}</div>
                <div class="user-intro">{{item.intro}}</div>
                <home-list title="年龄" :content="item.age"></home-list>
                <home-list title="性别" :content="sexCN"></home-list>
                <home-list title="爱好" :content="item.hobby"></home-list>
                <home-list title="偶像" :content="item.idol"></home-list>
                <home-list title="被喜欢" :content="item.like+'人'"></home-list>
                <home-list title="游戏1" :content="item.game1+'分'"></home-list>
            </div>
        </div>
    </div>
</template>
<style>
    .user-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: .5rem;
        padding-bottom: .5rem;
        position: relative;
    }
    .user-avatar {
        width: 2rem;
        height: 2rem;
        overflow: hidden;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .user-nickname {
        font-size: .3rem;
        margin-top: .3rem;
    }
    .user-intro{
        width: 6rem;
        margin-top: .3rem;
        text-align: center;
    }
    .user-like{
        width: .8rem;
        height: .8rem;
        position: absolute;
        top: .2rem;
        right: .2rem;
        background: url("../assets/img/like.png") no-repeat center;
        background-size: .4rem .4rem;
        z-index: 5;
    }
    .user-like.liked{
        background: url("../assets/img/liked.png") no-repeat center;
        background-size: .4rem .4rem;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import HomeList from './HomeList.vue';
    import {MessageBox} from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                item:{},
                avatar:''
            }
        },
        activated(){
            this.getUser();
        },
        methods: {
            getUser(){
                var _this = this;
                axios.post(plus.path + '/u/getuserinfo', {
                    id: _this.$route.query.id,
                    uid:window.localStorage.getItem('id')
                }).then(function (res) {
                    if (res.data.state == 1) {
                        _this.item = res.data.data;
                        _this.sex = res.data.data.sex;
                        _this.avatar = res.data.data.avatar?res.data.data.avatar:'/src/assets/img/host_avatar.png';
                    }
                })
            },
            like(){
                if(!window.localStorage.getItem('token')){
                    Toast('请先登录');
                    return;
                }
                if(this.$route.query.id == window.localStorage.getItem('id')){
                    MessageBox({
                        title: '提示',
                        message: '你也太自恋了吧',
                        showCancelButton: true,
                        cancelButtonText: '辣鸡',
                        confirmButtonText: '羞涩'
                    }).then(action => {
                        if (action == 'cancel') {
                            plus.laji();
                        }
                    });
                    return;
                }
                var url = '';
                if(this.item.islike){
                    url = plus.path + '/u/unlike'
                }else{
                    url = plus.path + '/u/like'
                }
                var _this = this;
                axios.post(url,{
                    id:window.localStorage.getItem('id'),
                    uid:_this.$route.query.id,
                    token:window.localStorage.getItem('token')
                }).then(function (res) {
                    if(res.data.state == 1){
                        if(_this.item.islike){
                            _this.item.islike = false;
                            _this.item.like--;
                        }else{
                            _this.item.islike = true;
                            _this.item.like++;
                        }
                    }
                })
            }
        },
        components: {
            'home-list':HomeList,
        },
        computed:{
            sexCN(){
                if(this.item.sex == 1){
                    return '男'
                }else{
                    return '女'
                }
            }
        }
    }
</script>