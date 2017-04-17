<template>
    <div>
        <blog-header title="留言板" headerRight="留言" :func="link"></blog-header>
        <div class="blog-body article-box">
            <mt-loadmore :top-method="loadTop" :distanceIndex="num" :autoFill="auto" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" ref="loadmore">
                <ul>
                    <li class="message-li" v-for="list in list">
                        <div class="question-user">
                            <div class="question-avatar":style="{backgroundImage:'url('+list.avatar+')'}"></div>
                            <div>
                                <div :class="['question-name','name',list.user.vip?'vip':'']" @click.stop="goUser(list.user._id)">{{list.nickname}}</div>
                                <div class="question-time">{{list.time}}</div>
                            </div>
                        </div>
                        <div class="message-content">{{list.content}}</div>
                        <div class="message-img" v-if="list.image"><a class="photo" :href="list.image"><img :src="list.image" alt="" width="100%"/></a></div>
                    </li>
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
    import $ from 'jquery';
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
        activated(){
            this.getList('top');
        },
        methods:{
            link(){//跳往提问页面
                if(!window.localStorage.getItem('token')){
                    Toast('请先登录');
                    return;
                }
                this.$router.push({path:'/comment',query:{type:'4'}})
            },
            getList(type){
                var _this = this;
                axios.get(plus.path + '/message/get',{
                    params:{
                        page:_this.page,
                        limit:_this.limit
                    }
                }).then(function (res) {
                    if(res.data.state = 1){
                        for (var i in res.data.data.list){
                            var datas = res.data.data.list[i];
                            datas.time = moment(datas.create).format('MM-DD HH:mm');
                            datas.avatar = datas.user.avatar?datas.user.avatar:'/src/assets/img/host_avatar.png';
                            datas.nickname = datas.user?datas.user.nickname:'匿名'
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
                if(id){
                    this.$router.push({path:'/user',query:{id:id}})
                }

            }
        }
    }
</script>
<style>
    .message-li{
        background: #fff;
        padding: .25rem;
        margin-bottom: .25rem;
    }
    .message-content{
        font-size: .3rem;
        line-height: .4rem;
        color: #666;
        margin-top: .25rem;
    }
    .message-img{
        width: 2rem;
        margin-top: .25rem;
    }
</style>