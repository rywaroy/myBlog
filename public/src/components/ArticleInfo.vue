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
                    </div>
                    <div class="article-info-content" v-html="item.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .article-info-box{
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
    .article-info-title{
        text-align: center;
        font-size: .4rem;
        line-height: .4rem;
        margin-top: .4rem;
    }
    .article-info-time{
        text-align: center;
        color: #666;
        font-size: .24rem;
        margin-top: .3rem;
    }
    .article-info-main{
        padding: 0 .25rem;
    }
    .article-info-main img{
        max-width: 100%;
    }
    .article-info-content{
        font-size: .3rem;
        line-height: .42rem;
        margin-top: .5rem;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import moment from 'moment';
    export default{
        data(){
            return{
                item:{},
                time:'',
                update:''
            }
        },
        mounted(){
            this.getInfo();
        },
        methods:{
            getInfo(){
                var _this = this;
                axios.get(plus.path + '/article/info',{
                    params:{
                        id:_this.$route.query.id
                    }
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.item = res.data.data;
                        _this.time = moment(res.data.data.creat).format('YYYY-MM-DD HH:mm:ss');
                        _this.update = moment(res.data.data.update).format('YYYY-MM-DD HH:mm:ss');
                    }
                })
            },
            link(){
                this.$router.push({path:'/commentlist',query:{id:this.item._id}})
            }
        }
    }
</script>