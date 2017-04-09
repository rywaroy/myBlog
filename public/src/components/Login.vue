<template>
    <div>
        <blog-header title="登录"></blog-header>
        <div class="blog-body">
            <div class="login-box">
                <mt-field placeholder="手机" type="tel" v-model="ph"></mt-field>
                <mt-field placeholder="密码" type="password" v-model="pw"></mt-field>
                <div class="login-btn">
                    <mt-button type="primary" size="large" @click="login()">登录</mt-button>
                </div>
                <div class="login-tips">没有账号？<router-link to="/register">注册</router-link></div>
            </div>
        </div>
    </div>
</template>
<style>
    .login-box{
        margin-top: .3rem;
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
                pw:''
            }
        },
        methods:{
            login(){
                if(!this.ph){
                    Toast('请输入手机号码');
                    return;
                }
                if(!this.pw){
                    Toast('请输入密码');
                    return;
                }
                var _this = this;
                axios.post(plus.path + '/u/signin',{
                    ph:_this.ph,
                    pw:_this.pw
                }).then(function (res) {
                    if(res.data.state == 1){
                        window.localStorage.setItem('token',res.data.data);
                    }else{
                        Toast(res.data.msg)
                    }
                })
            }
        }
    }
</script>