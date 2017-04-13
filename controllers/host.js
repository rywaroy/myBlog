/**
 * Created by qiangxl on 2017/3/25.
 */
var mongoose = require('mongoose');
var uuid = require('uuid');
var Data = require('../returnData.js');
var HostModel = require('../model/host.js');


exports.phone = function (req, res, next) {
    var ph = req.body.ph;
    HostModel.findOne({'phonenumber': ph}, function (err, doc) {
        if (err) {
            console.log("error :" + err);
        } else {
            if (doc) {
                res.send(Data(0, null, '用户名已被注册'))
            } else {
                next()
            }
        }
    })
}

exports.nick = function (req, res, next) {
    var nick = req.body.nickname;

    HostModel.findOne({'nickname': nick}, function (err, doc) {
        if (err) {
            console.log("error :" + err);
        } else {
            if (doc) {
                res.send(Data(0, null, '昵称已被占用'))
            } else {
                next()
            }
        }
    })
}

exports.signup = function (req, res) {
    var ph = req.body.ph;
    if (ph !== 'admin'){
        res.send(Data(0,null,'注册失败'))
    }
    var pw = req.body.pw;
    var nickname = req.body.nickname;

    var HostEntity = new HostModel({
        phonenumber: ph,
        password: pw,
        token: uuid.v4(),
        nickname: nickname
    }).save(function (err, doc) {
        if (err) {
            console.log("error :" + err);
        } else {
            res.send(Data(1,doc,'注册成功'))
        }
    });
}
exports.signin = function (req, res) {

    var ph = req.body.ph;
    var pw = req.body.pw;
    HostModel.findOne({'phonenumber': ph}, function (err, doc) {
        if (err) {
            console.log("error :" + error);
        } else {
            if (doc) {
                if (pw == doc.password) {
                    var newtoken = uuid.v4();
                    HostModel.update({'phonenumber': ph}, {$set: {token: newtoken}}, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            var data = doc;
                            data.token = newtoken;
                            res.send(Data(1, data, '登录成功'));
                        }
                    })
                } else {
                    res.send(Data(0, null, '密码错误'));
                }
            } else {
                res.send(Data(0, null, '用户未注册'));
            }

        }
    })
}

exports.gethost = function (req,res) {
    HostModel.findOne({},{avatar:1,nickname:1,laji:1,sex:1,intro:1},function (err,doc) {
        if (err){
            console.log(err)
        }else{
            res.send(Data(1,doc,'获取成功'))
        }
    })
}

exports.sethost = function (req,res) {
    var id = req.body.id;
    HostModel.update({_id:id},{$set:req.body},function (err) {
        if (err){
            console.log(err)
        }else{
            res.send(Data(1,null,'设置成功'))
        }
    })
}

exports.uplaji = function (req,res) {
    HostModel.findOne({},function (err,doc) {
        if(err){
            console.log(err)
        }else {
            // console.log(docs)
            var num = doc.laji;
            num++;
            HostModel.update({_id:doc._id},{$set:{laji:num}},function (err) {
                if(err){
                    console.log(err)
                }else{
                    res.send(Data(1,null,'提交成功'))
                }
            })
        }
    })
}