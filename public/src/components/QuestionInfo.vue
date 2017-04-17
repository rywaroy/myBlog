<template>
    <div>
        <blog-header title="提问" headerRight="回答" :func="link"></blog-header>
        <div class="blog-body article-box">
            <mt-loadmore :top-method="loadTop" :distanceIndex="num" :autoFill="auto" :bottom-all-loaded="allLoaded"
                         :bottom-method="loadBottom" ref="loadmore">
                <div class="question-box">
                    <div class="question-logo"></div>
                    <div class="question-user">
                        <div class="question-avatar" :style="{backgroundImage:'url('+user.avatar+')'}"></div>
                        <div>
                            <div :class="['question-name','name',user.vip?'vip':'']" @click.stop="goUser(user._id)">{{user.nickname}}</div>
                            <div class="question-time">{{question.createTime}}</div>
                        </div>
                    </div>
                    <div class="question-title">{{question.title}}</div>
                    <div class="question-content">{{question.content}}</div>
                </div>
                <ul class="question-i-ul">
                    <router-link :to="{path:'answer',query:{id:id,aid:list._id}}" tag="li" class="question-i-li" v-for="(list,index) in list">
                        <div class="answer-logo"></div>
                        <div class="question-user">
                            <div class="question-avatar" :style="{backgroundImage:'url('+list.avatar+')'}"></div>
                            <div>
                                <div :class="['question-name','name',list.user.vip?'vip':'']" @click.stop="goUser(list.user._id)">{{list.user.nickname}}</div>
                                <div class="question-time">{{list.time}}</div>
                            </div>
                        </div>
                        <div class="question-i-content">{{list.content}}</div>
                        <div class="question-i-agree">{{list.up}}人赞同</div>
                    </router-link>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import moment from 'moment';
    export default{
        data(){
            return {
                list: [],
                id:'',
                page: 1,
                limit: 20,
                auto: false,
                allLoaded: false,
                num: 2,
                question: {},
                user: {}
            }
        },
        activated(){
            this.getQuestion();
            this.getList('top');
            this.id = this.$route.query.id;
        },
        methods: {
            getQuestion(){
                var _this = this;
                axios.get(plus.path + '/question/questioninfo', {
                    params: {
                        id: _this.$route.query.id
                    }
                }).then(function (res) {
                    if (res.data.state == 1) {
                        _this.user = res.data.data.user;
                        _this.user.avatar = res.data.data.user.avatar ? res.data.data.user.avatar : '/src/assets/img/host_avatar.png';
                        res.data.data.createTime = moment(res.data.data.createTime).format('MM-DD HH:mm');
                        _this.question = res.data.data;
                    }
                })
            },
            getList(type){
                var _this = this;
                axios.get(plus.path + '/question/getanswer', {
                    params: {
                        id: _this.$route.query.id,
                        page: _this.page,
                        limit: _this.limit
                    }
                }).then(function (res) {
                    if (res.data.state == 1) {
                        for (var i in res.data.data.list){
                            var datas = res.data.data.list[i];
                            datas.time = moment(datas.creat).format('MM-DD HH:mm');
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
            link(){
                if (!window.localStorage.getItem('token')) {
                    Toast('请先登录');
                    return;
                }
                this.$router.push({path: '/comment', query: {id: this.$route.query.id, type: '3'}})
            },
            goUser(id){
                this.$router.push({path:'/user',query:{id:id}})
            }
        }
    }
</script>
<style>
    .question-box {
        background: #fff;
        padding: .25rem;
        margin-bottom: .2rem;
        position: relative;
    }
    .question-i-li{
        padding: .25rem;
        background: #fff;
        border-bottom: 1px solid #ddd;
        position: relative;
    }
    .question-i-content{
        color: #666;
        font-size: .24rem;
        line-height: .36rem;
        margin-top: .2rem;
        max-height: .72rem;
        overflow: hidden;
    }
    .question-i-agree{
        font-size: .3rem;
        line-height: .36rem;
        margin-top: .2rem;
        color: #999;
        text-align: right;
    }
    .answer-logo{
        position: absolute;
        width: .4rem;
        height: .4rem;
        background: url("../assets/img/answer.png") no-repeat;
        background-size: contain;
        top: .3rem;
        right: .3rem;
    }
</style>