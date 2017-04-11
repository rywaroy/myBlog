<template>
    <div>
        <blog-header title="评论" headerRight="发布" :func="publish"></blog-header>
        <div class="blog-body" style="padding-top: 1.2rem">
            <div class="comment-box">
                <textarea class="comment-textarea" v-model.trim="content" placeholder="此刻想说什么..." @keyup="write()"
                          maxlength="300"></textarea>
                <div class="comment-number fr">{{number}}/200</div>
                <div class="f-x"></div>
                <div class="my-upload-box">
                    <ul class="comment-imgul f-x">
                        <li class="comment-imgli" v-if="img">
                            <a :src="img" class="swipebox" :style="{backgroundImage:'url('+img+')'}"></a>
                            <span class="upload-close" @click="deleteImg()"></span>
                        </li>
                        <li class="comment-imgli" v-else><input type="file" name="upload_file" class="upload-input" id="upload" @change="upload($event)"/></li>
                    </ul>
                </div>
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
                img:''
            }
        },
        methods: {
            publish(){
                if(!this.content && !this.img){
                    Toast('请输入评论内容');
                    return;
                }
                var _this = this;
                axios.post(plus.path + '/article/comment',{
                    id:_this.$route.query.id,
                    token:window.localStorage.getItem('token'),
                    content:_this.content,
                    image:_this.img
                }).then(function (res) {
                    if(res.data.state == 1){
                        Toast('评论成功');
                        _this.$router.push({path:'/articleinfo',query:{id:_this.$route.query.id}});
                        _this.content = '';
                        _this.img = '';
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