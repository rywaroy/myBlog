<template>
    <div>
        <el-col :span="4">
            <el-menu default-active="1" class="el-menu-vertical-demo" :style="{height: height+'px'}" theme="dark">
                <el-menu-item index="1" @click="go('hostinfo')">个人信息</el-menu-item>
                <el-menu-item index="2" @click="go('userlist')">用户列表</el-menu-item>
                <el-menu-item index="3">文章列表</el-menu-item>
                <el-menu-item index="4">留言板</el-menu-item>
                <el-menu-item index="5">问答区</el-menu-item>
            </el-menu>
        </el-col>
        <div class="el-col-20">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                height:''
            }
        },
        mounted(){
            this.height = document.documentElement.clientHeight;
        },
        methods:{
            go(url){
                this.$router.push({ path: '/home/'+url})
            }
        }
    }
</script>
<style>

</style>