<template>
    <div>
        <blog-header title="文章"></blog-header>
        <div class="blog-body article-box">
            <mt-loadmore :top-method="loadTop" :distanceIndex="num" :autoFill="auto" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" ref="loadmore">
                <ul class="article-ul">
                    <router-link :to="{path:'articleinfo',query:{id:list._id}}" tag="li"  v-for="list in list" class="article-li">
                        <div class="article-title">{{list.title}}</div>
                        <div class="article-info">
                            <div class="article-time">{{list.create}}</div>
                            <div class="article-watch">{{list.watch}}人浏览</div>
                            <div class="article-up">{{list.up}}人点赞</div>
                        </div>
                    </router-link>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>
<style>
    .article-li{
        padding: .25rem;
        border-bottom: 1px solid #ccc;
    }
    .article-ul{
        background: #fff;
    }
    .article-title{
        font-size: .32rem;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
        width: 100%;
    }
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
    .article-info{
        display: flex;
        font-size: .24rem;
        color: #666;
        margin-top: .2rem;
    }
    .article-time{
        margin-right: .2rem;
    }
    .article-watch{
        margin-right: .2rem;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                list: [],
                page: 1,
                limit: 10,
                auto:false,
                allLoaded:false,
                num:2
            }
        },
        mounted(){
            this.getArticleList('top');
        },
        methods: {
            getArticleList(type){
                var _this = this;
                axios.get(plus.path + '/article/list', {
                    params: {
                        page: _this.page,
                        limit: _this.limit
                    }
                }).then(function (res) {
                    if (res.data.state == 1) {
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
                    }else{
                        Toast(res.data.msg)
                    }
                })
            },
            loadTop(){
                this.page = 1;
                this.getArticleList('top');

            },
            loadBottom(){
                this.page++;
                this.getArticleList('bottom');
            },

        }
    }
</script>