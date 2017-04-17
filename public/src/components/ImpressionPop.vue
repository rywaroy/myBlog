<template>
    <div>
        <div class="home-impression-mask" v-show="ImpressionIsShow">
            <div class="home-impression-box">
                <div class="home-impression-close" @click="hideImpression()"></div>
                <div class="home-impression-tit">好友印象</div>
                <div class="home-impression-tips">请选择你的印象（多选）</div>
                <div class="home-impression-tags">
                    <ul class="home-impression-tags-ul">
                        <li :class="['home-impression-tags-li',list.select?'cur':'']" v-for="(list,index) in list" @click="selectImpression(index)">{{list.title}}</li>
                        <!--<li class="home-impression-tags-li">僵硬</li>-->
                    </ul>
                </div>
                <div class="home-impression-tip">一个账号只能提交一次，请慎重选择</div>
                <mt-button type="primary" size="large" @click="subImpression()">提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import plus from '../public.js';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    import {mapActions,mapGetters} from 'vuex';
    export default{
        props:['list'],
        computed:mapGetters(['ImpressionIsShow']),
        methods:{
            selectImpression(index){
                this.list[index].select = !this.list[index].select;
            },
            subImpression(){
                var subArr=[];
                for (var i in this.list){
                    if(this.list[i].select){
                        subArr.push(this.list[i])
                    }
                }
                if(subArr.length == 0){
                    return;
                }
                var _this = this;
                axios.post(plus.path + '/impression/publish',{
                    list:subArr,
                    token:window.localStorage.getItem('token')
                }).then(function (res) {
                    _this.showbox = false;
                    if(res.data.state == 1){
                        Toast('提交成功');
                        _this.hideImpression();
                    }else{
                        if(res.data.state == 401){
                            Toast('请先登录');
                        }else{
                            Toast(res.data.msg)
                        }
                    }
                })
            },
            ...mapActions(['hideImpression'])
        },

    }
</script>
<style>
    .home-impression-box{
        width: 6.9rem;
        height: 8.65rem;
        background: #fff;
        border-radius: .08rem;
        position: absolute;
        left: .3rem;
        top: 50%;
        margin-top: -4.33rem;
        z-index: 10;
        padding: .4rem .3rem;
        box-sizing: border-box;
    }
    .home-impression-tit{
        font-size: .36rem;
        line-height: 1;
        color: #000000;
    }
    .home-impression-tips{
        font-size: .24rem;
        line-height: .4rem;
        color: #999999;
        margin-top: .17rem;
    }
    .home-impression-tags{
        margin-top: .21rem;
        height: 5.4rem;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .home-impression-tags-ul{
        display: flex;
        flex-wrap: wrap;
        width: 6.45rem;
    }
    .home-impression-tags-li{
        width: 2rem;
        height: .89rem;
        background: #F6F6F6;
        border-radius: .08rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .28rem;
        color: #333333;
        margin-right: .15rem;
        margin-bottom: .15rem;
    }
    .home-impression-tags-li.cur{
        color: #fff;
        background-color: #7EC0EE;
    }
    .home-impression-close{
        position: absolute;
        top: .4rem;
        right: .3rem;
        width: .4rem;
        height: .4rem;
        background: url("../assets/img/close.png");
        background-size: contain;
    }
    .home-impression-mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        z-index: 99;
        left: 0;
        top: 0;
    }
    .home-impression-tip{
        font-size: .24rem;
        color: #666;
        margin-bottom: .1rem;
        margin-top: .1rem;
    }
</style>