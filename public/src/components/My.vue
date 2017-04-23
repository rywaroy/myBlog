<template>
    <div>
        <blog-header title="个人中心"></blog-header>
        <div class="blog-body h100vh">
            <div class="my-header">
                <div class="my-avatar" :style="{backgroundImage:'url('+avatar+')'}"></div>
                <div class="my-arrow"></div>
                <input type="file" class="my-file" @change="upload($event)"/>
            </div>
            <mt-field label="昵称" placeholder="请输入用户名" v-model="nickname"></mt-field>
            <mt-field label="年龄" placeholder="请输入年龄" type="number" v-model="age"></mt-field>
            <mt-field label="性别" placeholder="请输入性别" v-model="sexCN" :disabled="tr"></mt-field>
            <mt-field label="被喜欢" v-model="like" :disabled="tr"></mt-field>
            <mt-field label="爱好" placeholder="请输入爱好" v-model="hobby" maxlength="10"></mt-field>
            <mt-field label="偶像" placeholder="请输入偶像" v-model="idol"></mt-field>
            <mt-field label="游戏1得分" placeholder="请输入偶像" v-model="game1" :disabled="tr"></mt-field>
            <mt-field label="介绍" placeholder="" type="textarea" rows="4" v-model="intro"></mt-field>
            <mt-button type="primary" size="large" style="margin:.2rem 0" @click="update()">修改</mt-button>
        </div>
    </div>
</template>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import {Toast} from 'mint-ui';
    export default{
        data(){
            return {
                nickname:'',
                age:'',
                hobby:'',
                idol:'',
                intro:'',
                avatar:'',
                game1:'',
                sex:'',
                tr:true,
                like:''
            }
        },
        mounted(){
            this.getUser();
        },
        methods: {
            DataLength(fData){
                var intLength=0
                for (var i=0;i<fData.length;i++)
                {
                    if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
                        intLength=intLength+2
                    else
                        intLength=intLength+1
                }
                return intLength
            },
            getUser(){
                var _this = this;
                axios.post(plus.path + '/u/myinfo', {
                    id:window.localStorage.getItem('id'),
                    token:window.localStorage.getItem('token')
                }).then(function (res) {
                    if (res.data.state == 1) {
                        _this.nickname = res.data.data.nickname;
                        _this.age = res.data.data.age;
                        _this.hobby = res.data.data.hobby;
                        _this.idol = res.data.data.idol;
                        _this.avatar = res.data.data.avatar?res.data.data.avatar:'/src/assets/img/host_avatar.png';
                        _this.intro = res.data.data.intro;
                        _this.game1 = res.data.data.game1;
                        _this.intro = res.data.data.intro;
                        _this.sex = res.data.data.sex;
                        _this.like = res.data.data.like;
                    }else{
                        if(res.data.state == 401){
                            plus.backLogin(_this);
                        }else{
                            Toast(res.data.msg)
                        }
                    }
                })
            },
            update(){
                var _this = this;
                if(this.DataLength(this.nickname) >12 || this.DataLength(this.nickname)<2){
                    Toast('昵称字数不符合规则');
                    return;
                }
                axios.post(plus.path + '/u/update',{
                    nickname:_this.nickname,
                    avatar:_this.avatar,
                    intro:_this.intro,
                    age:_this.age,
                    idol:_this.idol,
                    hobby:_this.hobby,
                    token:window.localStorage.getItem('token')
                }).then(function (data) {
                    if (data.data.state == 1){
                        //_this.avatar = data.data.data.url;
                        Toast('更新成功');
                        _this.getUser();
                    }
                })
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
                                _this.avatar = data.data.data.url;
                            }
                        })
                    }
                }
            },
        },
        computed:{
            sexCN(){
                if(this.sex == 1){
                    return '男'
                }else{
                    return '女'
                }
            }
        }
    }
</script>
<style>
    .my-header{
        padding: .3rem;
        background: #fff;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .my-avatar{
        width: 1.3rem;
        height: 1.3rem;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        /*background-image: url("../assets/img/host_avatar.png");*/
    }
    .my-arrow{
        width: .4rem;
        height: .4rem;
        border-right: 2px solid #333;
        border-top: 2px solid #333;
        transform: rotate(45deg);
    }
    .my-file{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        left: 0;
        top: 0;
    }
</style>