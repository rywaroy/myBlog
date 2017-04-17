<template>
    <div>
        <blog-header title="文章详情" headerRight="查看评论" :func="link"></blog-header>
        <div class="blog-body">
            <div class="article-info-box">
                <div class="article-info-main">
                    <div class="article-info-title">{{item.title}}</div>
                    <div class="article-info-time">
                        <span v-if="!update">{{time}}</span>
                        <span v-else>编辑于 {{update}}</span>
                        <div :class="['comment-li-up',item.isup?'uped':'']" @click="up()">{{item.up}}</div>
                    </div>
                    <div class="article-info-content" v-html="item.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .article-info-box {
        position: absolute;
        top: 1rem;
        left: 0;
        bottom: 0;
        background: #fff;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    .article-info-title {
        text-align: center;
        font-size: .4rem;
        line-height: .4rem;
        margin-top: .4rem;
    }

    .article-info-time {
        text-align: center;
        color: #666;
        font-size: .24rem;
        margin-top: .3rem;
        display: flex;
        justify-content: space-between;
    }

    .article-info-main {
        padding: 0 .25rem;
    }

    .article-info-main img {
        max-width: 100%;
    }

    .article-info-content {
        font-size: .3rem;
        line-height: .42rem;
        margin-top: .5rem;
    }

    .comment-li-up {
        padding-left: .7rem;
        height: .5rem;
        background: url("../assets/img/up.png") no-repeat center;
        background-size: .32rem .32rem;
        line-height: .5rem;
        color: #ccc;
    }

    .comment-li-up.uped {
        color: #E47833;
        background: url("../assets/img/uped.png") no-repeat center;
        background-size: .32rem .32rem;
    }

    .mint-msgbox-btn {
        font-size: .3rem;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import moment from 'moment';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                item: {},
                time: '',
                update: '',
                popupVisible:false
            }
        },
        activated(){
            this.getInfo();
        },
        methods: {
            getInfo(){
                var _this = this;
                axios.get(plus.path + '/article/info', {
                    params: {
                        id: _this.$route.query.id,
                        uid:window.localStorage.getItem('id')
                    }
                }).then(function (res) {
                    if (res.data.state == 1) {
                        _this.item = res.data.data;
                        _this.time = moment(res.data.data.creat).format('YYYY-MM-DD HH:mm');
                        _this.update = moment(res.data.data.update).format('YYYY-MM-DD HH:mm');
                    }
                })
            },
            link(){
                this.$router.push({path: '/commentlist', query: {id: this.item._id}})
            },
            up(){
                var _this = this;
                if (_this.item.isup) {
                    MessageBox({
                        title: '提示',
                        message: '点赞了还能取消的咯?',
                        showCancelButton: true,
                        cancelButtonText: '辣鸡',
                        confirmButtonText: '不取消'
                    }).then(action => {
                        if (action == 'cancel') {
                            plus.laji();
                        }
                    });
                } else {
                    axios.post(plus.path + '/article/up', {
                        token: window.localStorage.getItem('token'),
                        id: _this.$route.query.id
                    }).then(function (res) {
                        if (res.data.state == 1) {
                            _this.item.up++;
                            _this.item.isup = true;
                        } else {
                            if (res.data.state == 401) {
                                Toast('你还未登录')
                            } else {
                                Toast(res.data.msg);
                            }
                        }
                    })
                }

            },
        }
    }
</script>