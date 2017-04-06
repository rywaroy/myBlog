<template>
    <header :class="styles?'':'bgfff'">
        <div :class="['menuBtn',styles?'wt':'']" @click.stop="tab()"></div>
        <h1 v-if="!styles">{{title}}</h1>
        <div class="blog-header-right"><span v-if="headerRight" @click="func">{{headerRight}}</span></div>
    </header>
</template>
<style scpoed>
    header{
        box-sizing: border-box;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .25rem 0 .25rem;
        position: fixed;
        left: 0;
        width: 100%;
        top: 0;
        z-index: 10;
    }
    .bgfff{
        background: #fff;
    }
    .menuBtn{
        width: .6rem;
        height: .6rem;
        background: url("../assets/img/menu.png") no-repeat;
        background-size: contain;
    }
    .menuBtn.wt{
        background: url("../assets/img/menu_wt.png") no-repeat;
        background-size: contain;
    }
    header h1{
        font-size: .35rem;
    }
    .blog-header-right{
        color: #007aff;
        font-size: .3rem;
        width: .6rem;
    }
</style>
<script>
    export default{
        props:['headerRight','func','styles','title'],
        methods:{
            tab(){
                var w = document.documentElement.clientWidth*0.7;
                document.querySelector('.menu').classList.add('show');
                document.getElementById('main').style.webkitTransform = "translate3d("+w+"px, 0px, 0px) scale(0.8)";
                document.querySelector('.mask').style.display = 'block';
            }
        },

    }
</script>