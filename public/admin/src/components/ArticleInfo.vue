<template>
    <div class="article-box">
        <el-input v-model="title" placeholder="请输入内容" class="mb20"></el-input>
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      style="height: 400px">
        </quill-editor>
        <div class="publish-btn"><el-button @click="update">更新</el-button></div>
        <div class="comment-box">
            <ul>
                <li class="comment" v-for="(list,index) in comment">
                    <div>{{list.nickname}}:{{list.commentContent}}   <a href="javascript:;" @click="delc(index)">删除评论</a></div>
                    <img :src="list.image" alt="" v-if="list.image"/>
                    <ul>
                        <li class="reply" v-for="(reply,indexs) in list.child">{{reply.user}} <span v-if="reply.re_user">回复{{reply.re_user}}</span>:{{reply.content}}  <a href="javascript:;" @click="delr(indexs,index)">删除回复</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="limit"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>
<style>
    .article-box{
        padding: 50px;
    }
    .mb20{
        margin-bottom: 20px;
    }
    .reply{
        margin-left: 30px;
    }
    .comment{
        padding: 10px;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data(){
            return{
                title:'',
                content:'',
                comment:[],
                page:1,
                total:null,
                limit:5
            }
        },
        activated(){
            this.getinfo();
            this.getcomment();
        },
        methods:{
            getinfo(){
                var _this = this;
                axios.get(plus.path + '/article/info',{
                    params:{
                        id:_this.$route.query.id
                    }
                }).then(function (res) {
                    if(res.data.state == 1){
                        //_this.item = res.data.data;
                        _this.title = res.data.data.title;
                        _this.content = res.data.data.content;
                    }else {
                        if (res.data.state == '401') {
                            _this.$router.push({path: '/adminlogin'})
                        } else {
                            console.log(res.data.msg)
                        }
                    }
                })
            },
            getcomment(){
                var _this = this;
                axios.get(plus.path + '/article/comment',{
                    params:{
                        id:_this.$route.query.id,
                        page:_this.page,
                        limit:_this.limit
                    }
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.comment = res.data.data.list;
                        _this.total = res.data.data.total;
                    }else {
                        if (res.data.state == '401') {
                            _this.$router.push({path: '/adminlogin'})
                        } else {
                            console.log(res.data.msg)
                        }
                    }
                })
            },
            delc(index){
                var _this = this;
                axios.post(plus.path + '/article/delete/comment',{
                    id:_this.$route.query.id,
                    cid:_this.comment[index]._id,
                    token:window.localStorage.getItem('token')
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.$message('删除成功');
                        _this.getcomment();

                    }else {
                        if (res.data.state == '401') {
                            _this.$router.push({path: '/adminlogin'})
                        } else {
                            console.log(res.data.msg)
                        }
                    }
                })
            },
            delr(indexs,index){
                var _this = this;
                var childarr = _this.comment[index].child;
                var reid = childarr[indexs].reid;
                axios.post(plus.path + '/article/delete/reply',{
                    id:_this.$route.query.id,
                    cid:_this.comment[index]._id,
                    rid:reid,
                    token:window.localStorage.getItem('token')
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.$message('删除成功');
                        _this.getcomment();

                    }else {
                        if (res.data.state == '401') {
                            _this.$router.push({path: '/adminlogin'})
                        } else {
                            console.log(res.data.msg)
                        }
                    }
                })
            },
            handleCurrentChange(val){
                this.page = val;
                this.getcomment()
            },
            update(){
                if(!this.title){
                    return;
                }
                if(!this.content){
                    return;
                }
                var _this = this;
                axios.post(plus.path + '/article/update',{
                    title:_this.title,
                    content:_this.content,
                    id:_this.$route.query.id,
                    token:window.localStorage.getItem('token')
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.$message('发表成功');
                        _this.getinfo();
                    }
                })
            }
        }
    }
</script>