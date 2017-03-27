/**
 * Created by qiangxl on 2017/3/26.
 */
var mongoose = require('mongoose');
var uuid = require('uuid');
var Data = require('../returnData.js');

// var UserModel = mongoose.model("user");
//
// var HostModel = mongoose.model("host");
var HostModel = require('../model/host.js');
var UserModel = require('../model/user.js');

exports.token = function (req,res,next) {
    var token = req.body.token;
    if(!token){
        token = req.query.token;
    }
    UserModel.findOne({token:token},function (err,doc) {
        if(err){
            console.log(err)
        }else{
            if (doc){
                next()
            }else{
                res.send(Data(401,null,'授权失败'))
            }
        }
    })
}

exports.hosttoken = function (req,res,next) {
    var token = req.body.token;
    if(!token){
        token = req.query.token;
    }
    HostModel.findOne({token:token},function (err,doc) {
        if(err){
            console.log(err)
        }else{
            if (doc){
                next()
            }else{
                res.send(Data(401,null,'授权失败'))
            }
        }
    })
}