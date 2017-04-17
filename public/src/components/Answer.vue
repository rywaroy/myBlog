<template>
    <div>
        <blog-header title="回答"></blog-header>
        <div class="blog-body article-box bgfff">
            <div class="answer-box">
                <div :class="['user-like',answer.isUp?'liked':'']" @click="like()"></div>
                <div class="question-box">
                    <div class="question-user">
                        <div class="question-avatar" :style="{backgroundImage:'url('+user.avatar+')'}"></div>
                        <div>
                            <div :class="['question-name','name',user.vip?'vip':'']" @click.stop="goUser(user._id)">{{user.nickname}}</div>
                            <div class="question-time">{{answer.createTime}}</div>
                        </div>
                    </div>
                    <div class="question-title">{{answer.title}}</div>
                    <div class="question-content">{{answer.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import moment from 'moment';
    export default{
        data(){
            return {
                answer: {},
                user: {}
            }
        },
        activated(){
            this.getInfo();
        },
        methods: {
            getInfo(){
                var _this = this;
                axios.get(plus.path + '/question/getanswerinfo', {
                    params: {
                        id: _this.$route.query.id,
                        aid: _this.$route.query.aid,
                        uid: window.localStorage.getItem('id')
                    }
                }).then(function (res) {
                    if (res.data.state == 1) {
                        res.data.data.createTime = moment(res.data.data.createTime).format('MM-DD HH:mm');
                        _this.answer = res.data.data;
                        _this.user = res.data.data.user;
                    }
                })
            },
            like(){
                var _this = this;
                var url = '';
                if(this.answer.isUp){
                    url = plus.path + '/question/down'
                }else{
                    url = plus.path + '/question/up'
                }
                axios.post(url, {
                    id: _this.$route.query.id,
                    aid: _this.$route.query.aid,
                    token:window.localStorage.getItem('token')
                }).then(function (res) {
                    if (res.data.state == 1) {
                        if(_this.answer.isUp){
                            _this.answer.isUp = false;
                        }else{
                            _this.answer.isUp = true;
                        }
                    }
                })
            },
            goUser(id){
                this.$router.push({path:'/user',query:{id:id}})
            }
        }
    }
</script>