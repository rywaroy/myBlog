<template>
    <div>
        <blog-header title="问答区" headerRight="提问" :func="link"></blog-header>
        <div class="blog-body article-box">
            <mt-loadmore :top-method="loadTop" :distanceIndex="num" :autoFill="auto" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" ref="loadmore">
            <ul>
                <router-link :to="{path:'questioninfo',query:{id:list._id}}" tag="li" v-for="(list,index) in list" class="qustion-li">
                    <div class="question-logo"></div>
                    <div class="question-user">
                        <div class="question-avatar":style="{backgroundImage:'url('+list.avatar+')'}"></div>
                        <div>
                            <div :class="['question-name','name',list.user.vip?'vip':'']" @click.stop="goUser(list.user._id)">{{list.user.nickname}}</div>
                            <div class="question-time">{{list.time}}</div>
                        </div>
                    </div>
                    <div class="question-title">{{list.title}}</div>
                    <div class="question-content">{{list.content}}</div>
                </router-link>
            </ul>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    import moment from 'moment';
    export default{
        data(){
            return{
                list:[],
                page:1,
                limit:20,
                auto:false,
                allLoaded:false,
                num:2,
            }
        },
        mounted(){
            this.getList('top');
        },
        methods:{
            link(){//跳往提问页面
                if(!window.localStorage.getItem('token')){
                    Toast('请先登录');
                    return;
                }
                this.$router.push({path:'/comment',query:{type:'2'}})
            },
            getList(type){
                var _this = this;
                axios.get(plus.path + '/question/getlist',{
                    params:{
                        page:_this.page,
                        limit:_this.limit
                    }
                }).then(function (res) {
                        if(res.data.state = 1){
                            for (var i in res.data.data.list){
                                var datas = res.data.data.list[i];
                                datas.time = moment(datas.createTime).format('MM-DD HH:mm');
                                datas.avatar = datas.user.avatar?datas.user.avatar:'/src/assets/img/host_avatar.png';
                            }
                            if(type == 'top'){
                                _this.list = res.data.data.list;
                                _this.$refs.loadmore.onTopLoaded();
                                _this.allLoaded = false;
                            }else{
                                if(res.data.data.list == 0){
                                    _this.allLoaded = true;
                                }else{
                                    _this.list = _this.list.concat(res.data.data.list);
                                }
                                _this.$refs.loadmore.onBottomLoaded();
                            }

                        }
                    })
            },
            loadTop(){
                this.page = 1;
                this.getList('top');
            },  //下拉刷新
            loadBottom(){
                this.page++;
                this.getList('bottom');
            },  //上拉加载
            goUser(id){
                this.$router.push({path:'/user',query:{id:id}})
            }
        }
    }
</script>
<style>
    .qustion-li{
        padding: .25rem;
        background: #fff;
        margin-bottom: .3rem;
        position: relative;
    }
    .question-avatar{
        width: 0.84rem;
        height: 0.84rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .2rem;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .question-user{
        display: flex;
    }
    .question-name{
        color: #333;
        font-size: 0.3rem;
        line-height: 0.52rem;
    }
    .question-time{
        color: #999;
        font-size: .24rem;
    }
    .question-title{
        color: #333;
        font-size: .3rem;
        margin-top: .2rem;
        line-height: .36rem;
        height: .36rem;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
    }
    .question-content{
        color: #666;
        font-size: .24rem;
        line-height: .36rem;
        margin-top: .2rem;
        max-height: 1.06rem;
        overflow: hidden;
    }
    .question-logo{
        position: absolute;
        width: .4rem;
        height: .4rem;
        background: url("../assets/img/question.png") no-repeat;
        background-size: contain;
        top: .3rem;
        right: .3rem;
    }
</style>