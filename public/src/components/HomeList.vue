<template>
    <div class="home-li">
        <div class="home-li-tit">{{title}}</div>
        <div class="home-li-con">{{content}}</div>
        <div class="home-li-arrow" v-if="arrow"></div>
    </div>
</template>
<style>
    .home-li{
        display: flex;
        height: 1rem;
        align-items: center;
        padding: 0 .25rem;
        border-bottom: 1px solid rgba(0,0,0,.3);
        position: relative;
    }
    .home-li-tit{
        width: 1.5rem;
        color: #666;
    }
    .home-li-con{
        width: 5rem;
    }
    .home-li-arrow{
        width: .2rem;
        height: .2rem;
        border-right: 1px solid #333;
        border-top: 1px solid #333;
        transform: rotate(45deg);
    }
</style>
<script>
    export default{
        props:['title','content','arrow']
    }
</script>