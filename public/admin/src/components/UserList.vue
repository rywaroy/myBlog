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
                    prop="phonenumber"
                    label="手机号码">
            </el-table-column>
            <el-table-column
                    prop="creattime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="昵称">
            </el-table-column>
            <el-table-column
                    prop="isvip"
                    label="vip">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" @click="deletes(scope.$index)" size="small">删除</el-button>
                    <el-button type="text" @click="vip(scope.$index)" size="small">设为vip</el-button>
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
    .el-pagination{
        text-align: center;
        margin-top: 10px;
    }
</style>
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
        activated(){
            this.render();
        },
        methods: {
            render(){
                var _this = this;
                axios.post(plus.path + '/u/getuser', {
                    token: window.localStorage.getItem('token'),
                    page:_this.page,
                    limit:_this.limit
                }).then(function (res) {
                    if (res.data.state == 1) {
                        for(var i = 0;i<res.data.data.user.length;i++){
                            var datas = res.data.data.user[i];
                            if(datas.vip){
                                datas.isvip = '是'
                            }else{
                                datas.isvip = '否'
                            }
                        }
                        _this.tableData = res.data.data.user;
                        _this.total = res.data.data.total;
                    } else {
                        if (res.data.state == '401') {
                            _this.$router.push({path: '/adminlogin'})
                        } else {
                            console.log(res.msg)
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
                    axios.post(plus.path + '/u/deleteuser',{
                        id:_this.tableData[index]._id,
                        token: window.localStorage.getItem('token')
                    }).then(function (res) {
                        if (res.data.state == 1) {
                            _this.$message('删除成功');
                            _this.render();
                        } else {
                            if (res.data.state == '401') {
                                _this.$router.push({path: '/adminlogin'})
                            } else {
                                console.log(res.data.msg)
                            }
                        }
                    });
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
            vip(index){
                var _this = this;
                axios.post(plus.path + '/u/vip',{
                    id:_this.tableData[index]._id,
                    token: window.localStorage.getItem('token')
                }).then(function (res) {
                    if (res.data.state == 1) {
                        _this.$message('设置成功');
                        _this.render();
                    } else {
                        if (res.data.state == '401') {
                            _this.$router.push({path: '/adminlogin'})
                        } else {
                            console.log(res.msg)
                        }
                    }
                })
            },
            handleCurrentChange(val){
                this.page = val;
                this.render()
            }
        }
    }
</script>