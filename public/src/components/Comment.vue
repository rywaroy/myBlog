<template>
    <div>
        <blog-header title="评论" headerRight="发布" :func="publish"></blog-header>
        <div class="blog-body" style="padding-top: 1.2rem">
            <div class="comment-box">
                <div class="comment-title" v-if="type == 2"><input type="text" placeholder="标题" class="comment-title-input" maxlength="30" v-model.trim="title"/></div>
                <textarea class="comment-textarea" v-model.trim="content" placeholder="此刻想说什么..." @keyup="write()"
                          :maxlength="limit"></textarea>
                <div class="comment-number fr">{{number}}/{{limit}}</div>
                <div class="f-x"></div>
                <div class="my-upload-box" v-if="type == 1 || type == 4">
                    <ul class="comment-imgul f-x">
                        <li class="comment-imgli" v-if="img">
                            <a :src="img" class="swipebox" :style="{backgroundImage:'url('+img+')'}"></a>
                            <span class="upload-close" @click="deleteImg()"></span>
                        </li>
                        <li class="comment-imgli" v-else><input type="file" name="upload_file" class="upload-input" id="upload" @change="upload($event)"/></li>
                    </ul>
                </div>
                <div class="comment-line" v-if="type == 4"><span>匿名</span><mt-switch v-model="anonymous"></mt-switch></div>

            </div>
        </div>
    </div>
</template>
<style>
    .comment-box {
        background: #fff;
        padding: .25rem;
    }

    .comment-textarea {
        display: block;
        height: 3.2rem;
        font-size: .28rem;
        line-height: .38rem;
        color: #666;
        padding: 0;
        width: 100%;
        resize: none;
    }
    .my-upload-box{
        background: #fff;
    }
    .comment-imgul {
        padding: .25rem 0rem;
    }
    .comment-imgli {
        width: 1.78rem;
        height: 1.78rem;
        float: left;
        position: relative;
        background: url(../assets/img/upload_bg.png) no-repeat;
        background-size: contain;
        margin-right: .18rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border:1px solid #ccc;
    }
    .upload-input {
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 5;
    }
    .upload-close {
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        top: -0.25rem;
        right: -0.25rem;
        background: url(../assets/img/upload_close.png) no-repeat center;
        background-size: 0.28rem 0.28rem;
    }
    .swipebox{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .comment-title{
        height: 1rem;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        margin-bottom: .5rem;
    }
    .comment-title-input{
        font-size: .3rem;
        width: 100%;
    }
    .comment-line{
        display: flex;
        justify-content: space-between;
        font-size: .3rem;
        align-items: center;
        border-top: 1px solid #ddd;
        padding: .25rem 0;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                content: '',
                number: '0',
                img:'',
                type:'',
                title:'',
                anonymous:false
            }
        },
        activated(){
            this.type = this.$route.query.type;
        },
        computed:{
            limit(){
                if(this.type == 1 || this.type == 4){
                    return 200;
                }
                if(this.type == 2 || this.type == 3){
                    return 500;
                }
            }
        },
        methods: {
            publish(){
                if(!this.content && !this.img){
                    Toast('请输入内容');
                    return;
                }
                var _this = this;
                var url = '';
                if(this.type == 1){
                    url = plus.path + '/article/comment';
                }
                if(this.type == 2){
                    url = plus.path + '/question/putquestion';
                }
                if(this.type == 3){
                    url = plus.path + '/question/putanswer';
                }
                if(this.type == 4){
                    url = plus.path + '/message/put';
                }
                axios.post(url,{
                    id:_this.$route.query.id,
                    token:window.localStorage.getItem('token'),
                    content:_this.content,
                    image:_this.img,
                    title:_this.title,
                    anonymous:_this.anonymous
                }).then(function (res) {
                    if(res.data.state == 1){
                        Toast('提交成功');
                        _this.title = '';
                        _this.content = '';
                        _this.img = '';
                        _this.anonymous = false;
                        _this.$router.go(-1);
                    }else{
                        if(res.data.state == 401){
                            plus.backLogin(_this);
                        }else{
                            Toast(res.data.msg)
                        }
                    }
                })
            },
            write(){
                this.number = this.content.length;
            },
            upload(e){
                var _this = this;
                if (e.currentTarget.value.length) {
                    var fileName = e.currentTarget.value;
                    var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
                    if (extension == ".jpg" || extension == ".png" || extension == '.jpeg') {
                        var data = new FormData();
                        data.append('upload', e.currentTarget.files[0]);
                        axios.post(plus.path + '/upload/host',data,{
                            header:{
                                'Content-Type':'multipart/form-data'
                            }
                        }).then(function (data) {
                            if (data.data.state == 1){
                                _this.img = data.data.data.url;
                            }
                        })
                    }
                }
            },
            deleteImg(){
                this.img = '';
            }
        }
    }
</script>