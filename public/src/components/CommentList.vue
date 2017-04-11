<template>
    <div>
        <blog-header title="文章详情" headerRight="评论" :func="link"></blog-header>
    </div>
</template>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default{
        data(){
            return{
                item:[]
            }
        },
        activated(){
            this.getComment();
        },
        methods:{
            getComment(){
                console.log(2)
                var _this = this;
                axios.get(plus.path + '/article/comment',{
                    params:{
                        id:_this.$route.query.id
                    }
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.item = res.data.data.list;
                    }
                })
            },
            link(){
                this.$router.push({path:'/comment',query:{id:this.$route.query.id}})
            }
        }
    }
</script>