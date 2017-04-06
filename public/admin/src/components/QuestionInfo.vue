<template>
    <div class="question-box">
        <el-input v-model="title" placeholder="请输入内容" class="mb20"></el-input>
        <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="content">
        </el-input>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="_id"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="user.nickname"
                    label="回复者">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="up"
                    label="点赞数">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" @click="deletes(scope.$index)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="limit"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>
<style>
    .question-box{
        padding: 30px;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default{
        data(){
            return{
                title:'',
                content:'',
                tableData:[],
                page:1,
                total:'',
                limit:10
            }
        },
        methods:{
            getQuestion(){
                var _this = this;
                axios.get(plus.path + '/question/questioninfo',{
                    params:{
                        id:_this.$route.query.id
                    }
                }).then(function (res) {
                    if(res.data.state == 1){
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
            getAnswer(){
                var _this = this;
                axios.get(plus.path + '/question/getanswer',{
                    params:{
                        id:_this.$route.query.id,
                        page:_this.page,
                        limit:_this.limit
                    }
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.tableData = res.data.data.list;
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
            handleCurrentChange(val){
                this.page = val;
                this.getAnswer()
            },
            deletes(index){
                var _this = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(plus.path + '/question/delete/answer', {
                        aid: _this.tableData[index]._id,
                        id:_this.$route.query.id,
                        token: window.localStorage.getItem('token')
                    }).then(function (res) {
                        if (res.data.state == 1) {
                            _this.$message('删除成功');
                            _this.getAnswer()
                        } else {
                            if (res.data.state == '401') {
                                _this.$router.push({path: '/adminlogin'})
                            } else {
                                console.log(res.data.msg)
                            }
                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        activated(){
            this.getQuestion();
            this.getAnswer()
        }
    }
</script>