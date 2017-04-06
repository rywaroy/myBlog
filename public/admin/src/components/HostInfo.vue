<template>
    <div class="host-main">
        <div class="host-box">
            <div class="host-ava mb"><img :src="avatar" alt="" width="100%" height="100%"/><input @change="upload($event)" type="file" name="fileToUpload" id="fileToUpload" class="fileupload" /></div>
            <el-input v-model="nickname" placeholder="请输入昵称" class="mb"></el-input>
            <el-input
                    placeholder="请输入内容"
                    v-model="laji"
                    :disabled="true"
                    class="mb">
            </el-input>
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入简介"
                    v-model="intro"
                    class="mb">
            </el-input>
            <el-button type="primary" @click="setinfo()" style="width: 100%">修改</el-button>
        </div>
    </div>
</template>
<style scoped>
    .host-main {
        position: relative;
    }

    .host-box {
        width: 400px;
        margin: 0 auto;
        margin-top: 100px;
    }

    .host-ava {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        position: relative;
    }

    .mb {
        margin-bottom: 20px;
    }
    .fileupload{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default{
        data(){
            return {
                avatar: '',
                nickname: '',
                intro: '',
                laji: '',
                id: '',
                imageUrl: ''
            }
        },
        activated(){
            this.getinfo();
        },
        methods: {
            getinfo(){
                var _this = this;
                axios.get(plus.path + '/host/gethost', {
                    params: {
                        token: window.localStorage.getItem('token')
                    }
                }).then(function (res) {
                    if (res.data.state == 1) {
                        var datas = res.data.data;
                        _this.avatar = datas.avatar;
                        _this.nickname = datas.nickname;
                        _this.intro = datas.intro;
                        _this.laji = datas.laji;
                        _this.id = datas._id;
                    } else {
                        if (res.data.state == 401) {
                            _this.$router.push({path: '/adminlogin'})
                        } else {
                            console.log(res.msg)
                        }
                    }
                })
            },
            setinfo(){
                var _this = this;
                axios.post(plus.path + '/host/gethost', {
                    token: window.localStorage.getItem('token'),
                    avatar: _this.avatar,
                    nickname: _this.nickname,
                    intro: _this.intro,
                    id: _this.id
                }).then(function (res) {
                    if (res.data.state == 1) {
                        _this.$message('更新成功');
                    }
                })
            },
            upload(e){
                var _this = this;
                if (e.currentTarget.value.length) {
                    var fileName = e.currentTarget.value;
                    var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
                    if (extension == ".jpg" || extension == ".png" || extension == '.jpeg') {
                        var data = new FormData();
                        data.append('upload', e.currentTarget.files[0]);
                        axios.post(plus.path + '/upload/host',data,{
                            header:{
                                'Content-Type':'multipart/form-data'
                            }
                        }).then(function (data) {
                            if (data.data.state == 1){
                                _this.avatar = data.data.data.url;
                            }
                        })
                    }
                }
            }
        }
    }
</script>