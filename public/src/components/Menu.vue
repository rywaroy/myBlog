<template>
    <div class="menu" id="menu">
        <div class="blog-tips">
            <div class="blog-tips-title">小提示</div>
            <div class="blog-tips-content">
                <span class="underline">斯是陋室,惟吾德馨</span><br/>
                谁敢说不好看？<br/>
                不搞兼容，不解决bug<br/>
                网页低兼容，不照顾低端安卓机<br/>
                谈笑有鸿儒，往来无垃圾手机 <br/>
                /微笑
            </div>
        </div>
        <div class="blog-menulist">
            <div class="blog-tips-title">菜单</div>
            <ul>
                <li :class="['blog-menulist-li',index==cur?'cur':'']" v-for="(list,index) in list" @click="go(list.url,index)">{{list.name}}<i class="mint-cell-allow-right"></i></li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .menu{
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        visibility: hidden;
        box-sizing: content-box;
        width: 70%;
        min-height: 100%;
        background: #333;
        -webkit-overflow-scrolling: touch;
        transform-origin: -100% center 0px;
        opacity: 0.1;
        transform: translate3d(0px, 0px, 0px) scale(0.8);
        transition: transform 350ms cubic-bezier(.165,.84,.44,1);
        color: #fff;
        box-shadow: -3px 1px 10px #000 inset;
    }
    .menu.show{
        visibility: visible;
        z-index: 0;
        transform-origin: -100% center 0px;
        opacity: 1;
        transform: translate3d(0px, 0px, 0px) scale(1);
    }
    .blog-tips{
        padding: .4rem .25rem 0;
    }
    .blog-tips-title{
        font-size: .4rem;
        margin-bottom: .2rem;
    }
    .blog-tips-content{
        font-size: .3rem;
        line-height: .4rem;
        margin-bottom: .2rem;
        color: #bbb;
    }
    .underline{
        text-decoration: line-through;
    }
    .blog-menulist{
        padding: .3rem 0 0 .25rem;
    }
    .blog-menulist-li{
        position: relative;
        height: 1rem;
        display: flex;
        width: 100%;
        align-items: center;
        font-size: .3rem;
        border-bottom: 1px solid #000;
    }
    .blog-menulist-li.cur{
        color: rgb(230,155,3);
    }
    .blog-menulist-li.cur i::after{
        border-color: rgb(230,155,3);
    }
</style>
<script>
    import plus from '../public.js';
    export default{
        data(){
            return{
                cur:0,
                list:[
                    {
                        name:'主页',
                        url:'home'
                    },
                    {
                        name:'文章',
                        url:'article'
                    },
                    {
                        name:'问答区',
                        url:''
                    },
                    {
                        name:'留言区',
                        url:''
                    },
                    {
                        name:'小游戏',
                        url:''
                    },
                ]
            }
        },
        methods: {
            go(url,index){
                this.cur = index;
                this.$router.push({path: '/' + url});
                plus.back()
            }
        }

    }
</script>