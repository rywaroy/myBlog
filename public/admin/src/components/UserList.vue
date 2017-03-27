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
    </div>
</template>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default{
        data(){
            return {
                tableData: []
            }
        },
        activated(){
            this.render();
        },
        methods: {
            render(){
                var _this = this;
                axios.post(plus.path + '/u/getuser', {
                    token: window.localStorage.getItem('token')
                }).then(function (res) {
                    if (res.data.state == 1) {
                        for(var i = 0;i<res.data.data.length;i++){
                            var datas = res.data.data[i];
                            if(datas.vip){
                                datas.isvip = '是'
                            }else{
                                datas.isvip = '否'
                            }
                        }
                        _this.tableData = res.data.data;
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
                            console.log(res.msg)
                        }
                    }
                })
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
            }
        }
    }
</script>