<template>
    <div>
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
                    label="提问者">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="问题">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" @click="deletes(scope.$index)" size="small">删除</el-button>
                    <el-button type="text" @click="check(scope.$index)" size="small">查看</el-button>
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
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default{
        data(){
            return {
                tableData: [],
                page:1,
                total:'',
                limit:10
            }
        },
        methods: {
            questionList(){
                var _this = this;
                axios.get(plus.path + '/question/getlist',{
                    params:{
                        page:_this.page,
                        limit:_this.limit
                    }
                }).then(function (res) {
                        if (res.data.state == 1) {
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
            deletes(index){
                var _this = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(plus.path + '/question/delete/question', {
                        id: _this.tableData[index]._id,
                        token: window.localStorage.getItem('token')
                    }).then(function (res) {
                        if (res.data.state == 1) {
                            _this.$message('删除成功');
                            _this.questionList()
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
            },
            check(index){
                this.$router.push({path: '/home/questioninfo', query: {id: this.tableData[index]._id}})
            },
            handleCurrentChange(val){
                this.page = val;
                this.questionList()
            }
        },
        activated(){
            this.questionList()
        }
    }
</script>