/**
 * Created by qiangxl on 2017/3/26.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    phonenumber: {type: String},
    password: {type: String},
    token: {type: String},
    nickname: {type: String},
    sex: {type: String},
    vip: {type: Boolean, default: false},
    game1: {type: Number, default: 0},
    creattime: {type: Date, default: Date.now},
    avatar:{type:String,default: ''},
    intro:{type:String,default:''}
});
var UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel; 