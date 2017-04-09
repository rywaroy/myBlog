<template>
    <div class="impression-box">
        <el-input v-model="title" placeholder="请输入内容" class="impression-add"></el-input>
        <el-button @click="addImpression()">添加</el-button>
        <div class="impression-list">
            <el-button type="primary" class="impression-list" v-for="(list,index) in item" @click="deleteImression(index)">{{list.title}}{{list.number}}</el-button>
        </div>
    </div>
</template>
<style scoped>
    .impression-box {
        padding: 20px;
    }

    .impression-add {
        width: 300px;
        margin-right: 10px;
    }
    .impression-list{
        margin-top: 20px;
    }
    .impression-list{
        margin-bottom: 5px;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default{
        data(){
            return {
                item: [],
                title: ''
            }
        },
        activated(){
            this.getImpression();
        },
        methods: {
            getImpression(){
                var _this = this;
                axios.get(plus.path + '/impression/get')
                    .then(function (res) {
                        if (res.data.state == 1) {
                            _this.item = res.data.data;
                        }
                    })
            },
            addImpression(){
                var _this = this;
                if (!this.title) {
                    return;
                }
                axios.post(plus.path + '/impression/put', {
                    token: window.localStorage.getItem('token'),
                    title: _this.title
                }).then(function (res) {
                    if (res.data.state == 1) {
                        _this.getImpression();
                        _this.title = '';
                    }
                })
            },
            deleteImression(index){
                var _this = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(plus.path + '/impression/delete', {
                        id: _this.item[index]._id,
                        token: window.localStorage.getItem('token')
                    }).then(function (res) {
                        if (res.data.state == 1) {
                            _this.$message('删除成功');
                            _this.getImpression()
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
        }
    }
</script>