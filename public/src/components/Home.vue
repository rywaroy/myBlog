<template>
    <div class="home-box">
        <blog-header styles="white"></blog-header>
        <div class="home-content">
            <div class="home-warp">
                <div class="home-info">
                    <div class="home-avatar"><img src="../assets/img/host_avatar.png" alt="" width="100%" height="100%"/></div>
                    <div class="home-info-right">
                        <div class="home-name">{{item.nickname}}</div>

                        <div class="home-intro">{{item.intro}}</div>
                    </div>

                </div>
                <div class="home-list">
                    <home-list title="性别" content="男"></home-list>
                    <home-list title="偶像" content="周杰伦、韩寒"></home-list>
                    <home-list title="出生年月" content="1994-03-02"></home-list>
                    <home-list title="爱好" content="睡觉"></home-list>
                    <home-impression></home-impression>
                </div>
            </div>

        </div>
    </div>
</template>
<style>
    .home-box {
        width: 100%;
        height: 100%;
        background: url("../assets/img/fish.png") no-repeat center;
        background-size: 100% auto;
    }
    .home-content{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .home-warp{
        padding-top: 4rem;
        height: 100%;
        /*box-shadow: 0px 20px 150px rgba(0,0,0,.2) inset;*/
        background: rgba(0,0,0,.03);
        position: relative;
    }
    .home-info{
        width: 100%;
        height: 2rem;
        display: flex;
        padding: 0 .5rem;
        align-items: center;
        background: rgba(255,255,255,.3);
        box-sizing: border-box;
    }
    .home-avatar{
        width: 1.5rem;
        height: 1.5rem;
    }
    .home-info-right{
        width: 4rem;
        margin-left: .5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .home-name{
        font-size: .3rem;
    }
    .home-intro{
        font-size: .24rem;
        margin-top: .2rem;
        color: #666;
    }
    .home-list{
        position: absolute;
        top: 6rem;
        left: 0;
        bottom: 0;
        background: rgba(255,255,255,.5);
        width: 100%;
        box-sizing: border-box;
        padding-left: .25rem;
    }
</style>
<script>

    import axios from 'axios';
    import plus from '../public.js';
    import { Toast } from 'mint-ui';
    import HomeList from './HomeList.vue';
    import Impression from './Impression.vue';
    export default{
        data(){
            return{
                item:{},
            }
        },
        components: {

            'home-list':HomeList,
            'home-impression':Impression
        },
        activated(){
            this.info();
        },
        methods: {
            info(){
                var _this =  this;
                axios.get(plus.path + '/host/gethost')
                    .then(function (res) {
                        if(res.data.state == 1){
                            _this.item = res.data.data;
                        }else{
                            if(res.data.state == 401){
                                plus.backLogin();
                            }else{
                                Toast(res.data.msg)
                            }
                        }
                    })
            }
        }
    }
</script>