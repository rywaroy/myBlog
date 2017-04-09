<template>
    <div>
        <blog-header title="注册"></blog-header>
        <div class="blog-body">
            <div class="register-box">
                <mt-field label="手机" placeholder="请输入手机号码" type="tel" v-model.trim="ph"></mt-field>
                <mt-field label="昵称" placeholder="6个汉字或12个英文字母" v-model.trim="nickname"></mt-field>
                <mt-radio
                        algin="right"
                        title="性别"
                        v-model="sex"
                        :options="options">
                </mt-radio>
                <mt-field label="密码" placeholder="密码一定要最简单不常用的！！" type="password" v-model.trim="pw"></mt-field>
                <mt-field label="确认密码" placeholder="请输入确认密码" type="password" v-model.trim="spw"></mt-field>
                <div class="login-btn">
                    <mt-button type="primary" size="large" @click="register()">注册</mt-button>
                </div>
                <div class="login-tips">已有账号？<router-link to="/login">登录</router-link></div>
            </div>

        </div>
    </div>
</template>
<style>
    .register-box{
        margin-top: .3rem;
    }
    .mint-radiolist-title{
        font-size: .3rem;
    }
    .login-btn{
        padding: 0 .25rem;
        margin-top: .3rem;
    }
    .login-tips{
        text-align: center;
        font-size: .3rem;
        margin-top: .2rem;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return{
                ph:'',
                sex:'1',
                nickname:'',
                pw:'',
                spw:'',
                options:[
                    {
                        label: '男',
                        value: '1'
                    },
                    {
                        label: '女',
                        value: '2'
                    }]
            }
        },
        methods:{
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
            register(){
                if(!this.ph){
                    Toast('请输入手机号码');
                    return;
                }
                var reg = /^1[3|4|5|7|8][0-9]{9}$/;
                if(!reg.test(this.ph)){
                    Toast('手机号码格式不正确');
                    return;
                }
                if(this.DataLength(this.nickname) >12 || this.DataLength(this.nickname)<2){
                    Toast('昵称字数不符合规则');
                    return;
                }
                if(!this.pw){
                    Toast('请输入密码');
                    return;
                }
                if(this.pw !== this.spw){
                    Toast('两次密码不一致');
                    return;
                }
                var _this = this;
                axios.post(plus.path + '/u/signup',{
                    ph:_this.ph,
                    pw:_this.pw,
                    sex:_this.sex,
                    nickname:_this.nickname
                }).then(function (res) {
                    if(res.data.state == 1){
                        Toast('注册成功');
                        window.localStorage.setItem('token',res.data.data.token);
                        _this.$router.push({path: '/home'})
                    }else{
                        Toast(res.data.msg)
                    }
                })
            }
        }
    }
</script>