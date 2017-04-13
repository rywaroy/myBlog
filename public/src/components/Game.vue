<template>
    <div>
        <blog-header title="游戏1"></blog-header>
        <div class="blog-body">
            <div class="game1-intro">
                <div class="game1-record" v-if="highestRecord">你的最高纪录：{{highestRecord}}</div>
                <div class="game1-point">第{{checkPoint}}关</div>
                <div class="game1-time">剩余时间 {{time}}s</div>
            </div>
            <ul class="game1-ul">
                <li class="game1-li" v-for="(list,index) in item" :style="list" @click="choose(index)"></li>
            </ul>
        </div>
    </div>
</template>
<style>
    .game1-ul {
        width: 7rem;
        height: 7rem;
        margin: 0.5rem auto 0;
    }

    .game1-li {
        float: left;
        list-style: none;
        display: table;
        border: 1px solid #fff;
        box-sizing: border-box;
    }

    .game1-record {
        font-size: .3rem;
        margin-top: .5rem;
    }
    .game1-intro{
        padding-left: .25rem;
        margin-top: .5rem;
        font-size: .3rem;
        line-height: .6rem;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                item: [],
                point: 0,
                right: '',
                isstart: false,
                time: 60,
                go: '',
                highestRecord:0,
                islogin:false
            }
        },
        activated(){
            this.render();
            this.getHighest();
        },
        computed: {
            checkPoint: function () {
                return this.point + 1
            }
        },
        watch: {
            time: function () {
                var _this = this;
                if (this.time < 0) {
                    //alert('游戏结束,得分：' + this.checkPoint);
                    if((this.point > this.highestRecord) && this.islogin){
                        MessageBox({
                            title: '提示',
                            message: '得分超过历史纪录，需要提交吗',
                            showCancelButton: true,
                            cancelButtonText: '辣鸡',
                            confirmButtonText: '提交'
                        }).then(action => {
                            if (action == 'cancel') {
                                plus.laji();
                            }else{
                                _this.upScore();
                            }
                            this.point = 0;
                            this.time = 10;
                            this.render();
                        });
                    }else{
                        MessageBox({
                            title: '提示',
                            message: '你的得分：'+_this.point
                        });
                        this.point = 0;
                        this.time = 60;
                        this.render();

                    }
                    clearInterval(this.go)
                }
            }
        },
        methods: {
            render: function () {
                var sp = this.point % 4;
                var block = parseInt(this.point / 4) + 2;
                var allblock = block * block;
                this.right = Math.floor(Math.random() * allblock);
                var arr = [];
                var colors = this.getcolor();
                for (var i = 0; i < allblock; i++) {
                    var styles = {
                        width: (6.8 / block).toFixed(2) + 'rem',
                        height: (6.8 / block).toFixed(2) + 'rem',
                        background: colors
                    }
                    if (i == this.right) {
                        styles.opacity = 0.8 + sp * 0.03;
                    } else {
                        styles.opacity = 1;
                    }
                    arr.push(styles)
                }
                this.item = arr;
            },
            choose: function (index) {
                if (index == this.right) {
                    if (this.point == 0) {
                        var _this = this;
                        this.go = setInterval(function () {
                            _this.time--;
                        }, 1000)
                    }
                    this.point++;
                    this.render();
                }
            },
            getcolor: function () {
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += this.colorlist();

                }
                return color;
            },
            colorlist: function () {
                var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
                var num = Math.floor(Math.random() * 16);
                return arr[num];
            },
            getHighest(){
                var _this = this;
                axios.post(plus.path + '/u/getuserinfo',{
                    id:window.localStorage.getItem('id')
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.highestRecord = res.data.data.game1;
                        _this.islogin = true;
                    }
                })
            },
            upScore(){
                var _this = this;
                axios.post(plus.path + '/u/upgame1',{
                    token:window.localStorage.getItem('token'),
                    score:_this.point
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.getHighest();
                    }
                })
            }
        }
    }
</script>