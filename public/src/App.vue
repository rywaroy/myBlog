<template>
    <div id="app" class="app">
        <blog-menu></blog-menu>
        <div id="main" class="main" @click="tab">
            <div class="mask"></div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import Menu from './components/Menu.vue';
    import plus from './public.js';
    export default{
        components:{
            'blog-menu':Menu
        },
        methods:{
            tab(){
                document.querySelector('.menu').classList.remove('show');
                document.getElementById('main').style.webkitTransform = "translate3d(0px, 0px, 0px) scale(1)";
                document.querySelector('.mask').style.display = 'none';
            }
        }
    }

</script>
<style>
    .app{
        background-color: #333;
        position: relative;
        z-index: 1;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .main{
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100vh;
        transition: transform 350ms cubic-bezier(.165,.84,.44,1);
        transform: translate3d(0px, 0px, 0px) scale(1);
        transform-origin: left center 0px;
        background-color: #efeff4;
    }
    .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        z-index: 99;
        display: none;
    }
</style>
