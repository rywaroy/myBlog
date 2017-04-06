<template>
    <div class="put-box">
        <el-input v-model="title" style="margin-bottom: 30px" placeholder="文章标题"></el-input>
        <quill-editor ref="myTextEditor"
                      v-model="content"
        style="height: 400px">
        </quill-editor>
        <div class="publish-btn"><el-button @click="publish()">发表</el-button></div>

    </div>
</template>
<style>
    .put-box{
        padding: 50px;
    }
    .publish-btn{
        margin-top: 30px;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import { quillEditor } from 'vue-quill-editor';
    export default{
        components: {
            quillEditor
        },
        data(){
            return{
                title:'',
                content:'',
            }
        },
        methods:{
            publish(){
                if(!this.title){
                    return;
                }
                if(!this.content){
                    return;
                }
                var _this = this;
                axios.post(plus.path + '/article/publish',{
                    title:_this.title,
                    content:_this.content,
                    token:window.localStorage.getItem('token')
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.$message('发表成功');
                        _this.$router.push({path: '/home/articlelist'})
                    }
                })
            }
        }
    }
</script>