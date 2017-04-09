<template>
    <div class="home-impression">
            <home-list title="好友印象" arrow="true" @click.stop.native="showImpression()"></home-list>
        <div class="home-impression-list">
            <div class="home-impression-li" v-for="list in item" :style="{backgroundColor:'rgb('+list.color+')'}">{{list.title}} {{list.number}}</div>
            <!--<div class="home-impression-li">僵硬 2</div>-->
        </div>
        <div class="home-impression-mask" v-show="showbox">
        <div class="home-impression-box">
            <div class="home-impression-close" @click="hideImpression()"></div>
            <div class="home-impression-tit">好友印象</div>
            <div class="home-impression-tips">请选择你的印象（多选）</div>
            <div class="home-impression-tags">
                <ul class="home-impression-tags-ul">
                    <li :class="['home-impression-tags-li',list.select?'cur':'']" v-for="(list,index) in item" @click="selectImpression(index)">{{list.title}}</li>
                    <!--<li class="home-impression-tags-li">僵硬</li>-->
                </ul>
            </div>
            <div class="home-impression-tip">一个账号只能提交一次，请慎重选择</div>
            <mt-button type="primary" size="large" @click="subImpression()">提交</mt-button>
        </div>
        </div>
    </div>
</template>
<style>
    .home-impression-list{
        display: flex;
        flex-wrap: wrap;
        padding-top: .2rem;
    }
    .home-impression-li{
        padding: .1rem .2rem;
        font-size: .3rem;
        margin-right: .3rem;
        margin-bottom: .3rem;
        background-color: #7EC0EE;
        color: #fff;
        border-radius: .08rem;
    }
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
        position: fixed;
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
<script>
    import HomeList from './HomeList.vue';
    import plus from '../public.js';
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    export default{
        components: {
            'home-list': HomeList
        },
        data(){
            return{
                showbox:false,
                colors:['254,67,101','252,157,154','249,205,173','200,200,269','131,175,155','229,187,129','118,77,57','17,63,61','179,214,110','248,147,29','56,13,49','137,190,178','217,104,49','39,72,98','170,94,53','178,200,187','250,227,113'],
                item:[]
            }
        },
        mounted(){
            this.getImpression();
        },
        methods: {
            showImpression(){
                this.showbox = true;
            },
            hideImpression(){
                this.showbox = false;
            },
            getImpression(){
                var _this = this;
                axios.get(plus.path + '/impression/get')
                    .then(function (res) {
                        if(res.data.state == 1){
                            for(var i in res.data.data){
                                var datas = res.data.data;
                                var index = Math.floor(Math.random()*_this.colors.length);
                                datas[i].color = _this.colors[index];
                                datas[i].select = false;
                            }
                            _this.item = res.data.data;
                            //console.log(_this.item)
                        }
                    })
            },
            selectImpression(index){
                this.item[index].select = !this.item[index].select;
            },
            subImpression(){
                var subArr=[];
                for (var i in this.item){
                    if(this.item[i].select){
                        subArr.push(this.item[i])
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
                        _this.getImpression();
                    }else{
                        if(res.data.state == 401){
                            Toast('请先登录');
                        }else{
                            Toast(res.data.msg)
                        }
                    }
                })
            }
        }
    }
</script>