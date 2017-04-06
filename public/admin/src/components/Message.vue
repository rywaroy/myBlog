<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="user.nickname"
                    label="昵称">
            </el-table-column>
            <el-table-column
                    prop="create"
                    label="创建时间">
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
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default{
        data(){
            return{
                tableData:[],
                page:1,
                limit:10,
                total:0
            }
        },
        methods:{
            getMessage(){
                var _this = this;
                axios.get(plus.path + '/message/get',{
                    params:{
                        page: _this.page,
                        limit: _this.limit
                    }
                }).then(function (res) {
                    if(res.data.state == 1){
                        _this.tableData = res.data.data.list;
                        _this.total = res.data.data.total;
                    } else {
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
                this.getMessage()
            },
            deletes(index){
                var _this = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(plus.path + '/message/delete', {
                        id: _this.tableData[index]._id,
                        token: window.localStorage.getItem('token')
                    }).then(function (res) {
                        if (res.data.state == 1) {
                            _this.$message('删除成功');
                            _this.getMessage()
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
            this.getMessage()
        }
    }
</script>