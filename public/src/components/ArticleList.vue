<template>
    <!--<div>-->
        <!--<blog-header title="文章"></blog-header>-->
        <!--<div class="blog-body article-box">-->
            <!---->
        <!--</div>-->
    <!--</div>-->

    <mt-loadmore :top-method="loadTop" :distanceIndex="num" :autoFill="auto" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" ref="loadmore">
        <ul class="article-ul">
            <li v-for="list in list" class="article-li">
                <div class="article-title">{{list.title}}</div>
                <div class="article-info">
                    <div class="article-time">{{list.create}}</div>
                    <div class="article-watch">{{list.watch}}人浏览</div>
                    <div class="article-up">{{list.up}}人点赞</div>
                </div>
            </li>
        </ul>
    </mt-loadmore>

    <!--<div class="article-main">-->
        <!--<blog-header title="文章"></blog-header>-->
    <!---->
    <!--</div>-->
</template>
<style scoped>
    .article-li{
        padding: .25rem;
        border-bottom: 1px solid #ccc;
        height: 3rem;
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
    .article-main{
        padding-top: 1.2rem;
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
                page: 0,
                limit: 6,
                auto:true,
                allLoaded:false,
                num:1
            }
        },
        mounted(){
            //this.getArticleList('top');
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
//                        for(var i in res.data.data){
//                            var datas = res.data.data[i];
//                        }
                        if(type == 'top'){
                            _this.list = res.data.data.list;
                            _this.$refs.loadmore.onTopLoaded();
                        }else{
                            if(res.data.data.list == 0){
                                _this.allLoaded = true;
                            }else{
                                _this.list = _this.list.concat(res.data.data.list);
                            }

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