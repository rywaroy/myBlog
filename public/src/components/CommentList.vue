<template>
    <div>
        <blog-header title="评论列表" headerRight="评论" :func="link"></blog-header>
        <div class="blog-body article-box">
            <mt-loadmore :top-method="loadTop" :distanceIndex="num" :autoFill="auto" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" ref="loadmore">
                <ul>
                    <li class="comment-li" v-for="(list,index) in list">
                        <div class="comment-li-ava" :style="{backgroundImage:'url('+list.avatar?list.avatar:'../assets/img/host_avatar.png'+')'}"></div>
                        <div class="comment-li-info">
                            <div :class="['comment-li-name',list.vip?'vip':'']"><span>{{list.nickname}}</span></div>
                            <div class="comment-li-time">{{list.time}}</div>
                            <div class="comment-li-content" v-if="list.commentContent">{{list.commentContent}}</div>
                            <div class="comment-li-img" v-if="list.image"><img :src="list.image" alt="" width="100%"/></div>
                            <div class="comment-reply-box" v-if="list.child.length != 0">
                                <ul>
                                    <li class="comment-reply-li" v-for="(child,index2) in list.child" @click="replyPersonal(index,index2,$event)" v-show="index2 < 4 || list.childshow == 1">
                                        {{child.user}} <span v-if="child.re_user">回复 {{child.re_user}}</span> : {{child.content}}</li>
                                </ul>
                                <div class="comment-check" v-if="list.child.length >4" @click="open(index,$event)">查看全部评论</div>
                            </div>
                        </div>
                        <div class="comment-li-reply" @click="reply(index)">回复</div>
                    </li>
                </ul>
            </mt-loadmore>
            
        </div>
        <div class="comment-reply-input-box" v-show="replyShow"><input type="text" class="comment-reply-input" ref="replyInput" :placeholder="'回复：'+replyname" v-model="replyContent" @blur="hideInput()" @keyup="publishReply($event)"/></div>
    </div>
</template>
<style>
    .article-box{
        position: absolute;
        top: 1.2rem;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-top: 0;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .comment-li{
        padding: .25rem .25rem .8rem .25rem;
        background: #fff;
        display: flex;
        margin-bottom: .1rem;
        position: relative;
    }
    .comment-li-ava{
        width: 0.84rem;
        height: 0.84rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .2rem;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../assets/img/host_avatar.png");
    }
    .comment-li-info{
        width: 5.94rem;
    }
    .comment-li-name{
        color: #333;
        font-size: 0.3rem;
        line-height: 0.52rem;
        display: inline-block;
    }
    .comment-li-name.vip{
        color: #f7ce56;
        padding-right: .5rem;
        background: url("../assets/img/vip.png") no-repeat right center;
        background-size: .32rem .32rem;

    }
    .comment-li-time{
        color: #999;
        font-size: .24rem;
    }
    .comment-li-content{
        font-size: .28rem;
        line-height: .34rem;
        color: #666;
        margin-top: .2rem;
    }
    .comment-li-img{
        width: 2rem;
        margin-top: .2rem;
    }
    .comment-li-reply{
        position: absolute;
        font-size: .3rem;
        right: .3rem;
        bottom: .25rem;
    }
    .comment-reply-input-box{
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        padding: .25rem;
        box-sizing: border-box;
        background: #efeff4;
        z-index: 10;
    }
    .comment-reply-input{
        border-radius: .08rem;
        height: 32px;
        padding: 0.2rem;
        display: block;
        width: 100%;
        box-sizing: border-box;
    }
    .comment-reply-box{
        background: #f6f6f6;
        padding: 0.2rem;
        font-size: 0.28rem;
        line-height: 0.44rem;
        margin-top: 0.2rem;
    }
    .comment-reply-li{
        font-size: .28rem;
        line-height: .4rem;
        color: #666;
    }
    .comment-reply-li.active{
        background: #ccc;
    }
    .comment-check{
        font-size: .3rem;
        margin-top: .1rem;
        color: #426af0;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    import moment from 'moment'
    export default{
        data(){
            return{
                list: [],
                page: 1,
                limit: 10,
                auto:false,
                allLoaded:false,
                num:2,
                replyShow:false,
                replyContent:'',
                replyid:'',
                replyuid:'',
                commentIndex:'',
                replyname:'',
            }
        },
        activated(){
            this.getComment('top');
        },
        methods:{
            getComment(type){
                var _this = this;
                axios.get(plus.path + '/article/comment',{
                    params:{
                        id:_this.$route.query.id,
                        limit:_this.limit,
                        page:_this.page
                    }
                }).then(function (res) {
                    if(res.data.state == 1){
                        for (var i in res.data.data.list){
                            var datas = res.data.data.list[i];
                            datas.time = moment(datas.creat).format('YYYY-MM-DD HH:mm:ss');
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
            link(){
                if(!window.localStorage.getItem('token')){
                    Toast('请先登录');
                    return;
                }
                this.$router.push({path:'/comment',query:{id:this.$route.query.id}})
            },
            loadTop(){
                this.page = 1;
                this.getComment('top');
            },
            loadBottom(){
                this.page++;
                this.getComment('bottom');
            },
            reply(index){  //点击回复弹出输入框
                this.commentIndex = index;
                this.replyShow = true;
                this.replyid = this.list[index]._id;
                this.replyuid = '';
                this.replyname = this.list[index].nickname;
                this.$nextTick(function () {
                    document.querySelector('.comment-reply-input').focus();
                })
            },
            replyPersonal(index,index2,e){
                e.currentTarget.classList.add('active');
                var target = e.currentTarget;
                setTimeout(function () {
                    target.classList.remove('active');
                },200);
                this.commentIndex = index;
                this.replyShow = true;
                this.replyid = this.list[index]._id;
                this.replyuid = this.list[index].child[index2].userid;
                this.replyname = this.list[index].child[index2].user;
                this.$nextTick(function () {
                    document.querySelector('.comment-reply-input').focus();
                })
            },
            hideInput(){  //输入框消失
                this.replyShow = false;
            },
            publishReply(e){
                var _this = this;
                if(e.keyCode == 13){
                    axios.post(plus.path + '/article/respon',{
                        id:_this.$route.query.id,
                        cid:_this.replyid,
                        uid:_this.replyuid,
                        token:window.localStorage.getItem('token'),
                        content:_this.replyContent
                    }).then(function (res) {
                        if(res.data.state == 1){
                            Toast('回复成功');
                            _this.replyContent = '';
                            document.querySelector('.comment-reply-input').blur();
                            _this.list[_this.commentIndex].child.push(res.data.data);
                        }
                    })
                }
            },  //提交评论
            open(index,e){
                this.$set(this.list[index], 'childshow', 1);
                e.currentTarget.style.display = 'none';
            }
        }
    }
</script>