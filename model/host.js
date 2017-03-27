/**
 * Created by qiangxl on 2017/3/26.
 */
var mongoose = require('mongoose');
var HostSchema = new mongoose.Schema({
    phonenumber : {type:String},
    password:{type:String},
    token:{type:String},
    nickname:{type:String},
    sex:{type:String,default:'1'},
    intro:{type:String,default:''},
    avatar:{type:String,default:''},
    laji:{type:Number,default:0}
});

var HostModel = mongoose.model("host", HostSchema);
module.exports = HostModel;