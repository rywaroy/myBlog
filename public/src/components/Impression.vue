<template>
    <div class="home-impression">
            <home-list title="好友印象" arrow="true" @click.stop.native="showImpression()"></home-list>
        <div class="home-impression-list">
            <div class="home-impression-li" v-for="list in list" :style="{backgroundColor:'rgb('+list.color+')'}">{{list.title}} {{list.number}}</div>
            <!--<div class="home-impression-li">僵硬 2</div>-->
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
</style>
<script>
    import HomeList from './HomeList.vue';
    import plus from '../public.js';
    import { Toast } from 'mint-ui';
    import {mapActions,mapGetters} from 'vuex';
    export default{
        components: {
            'home-list': HomeList
        },
        props:['list'],
        methods: mapActions(['showImpression'])
    }
</script>