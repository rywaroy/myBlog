/**
 * Created by qiangxl on 2017/3/25.
 */
var mongoose = require('mongoose');
var uuid = require('uuid');
var Data = require('../returnData.js');
var UserModel = require('../model/user.js');
var LikeModel = require('../model/like.js');


exports.phone = function (req, res, next) {
    var ph = req.body.ph;
    UserModel.findOne({'phonenumber': ph}, function (err, doc) {
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

    UserModel.findOne({'nickname': nick}, function (err, doc) {
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
    var pw = req.body.pw;
    var nickname = req.body.nickname;
    var sex = req.body.sex;

    var UserEntity = new UserModel({
        phonenumber: ph,
        password: pw,
        token: uuid.v4(),
        nickname: nickname,
        sex: sex
    }).save(function (err, doc) {
        if (err) {
            console.log("error :" + err);
        } else {
            res.send(Data(1, doc, '注册成功'))
        }
    });


}

exports.signin = function (req, res) {
    var ph = req.body.ph;
    var pw = req.body.pw;
    UserModel.findOne({'phonenumber': ph}, function (err, doc) {
        if (err) {
            console.log("error :" + error);
        } else {
            if (doc) {
                if (pw == doc.password) {
                    var newtoken = uuid.v4();
                    UserModel.update({'phonenumber': ph}, {$set: {token: newtoken}}, function (err) {
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

exports.getuser = function (req, res) {
    var limit = req.body.limit;
    var page = req.body.page;
    UserModel.find({}, {phonenumber: 1, token: 1, vip: 1, nickname: 1, sex: 1, creattime: 1}, {
        skip: (page - 1) * limit,
        limit: limit
    }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            UserModel.count({}, function (err, num) {
                if (err) {
                    console.log(err)
                } else {
                    res.send(Data(1, {user: docs, total: num}, '获取成功'))
                }
            })

        }
    })
}

exports.deleteuser = function (req, res) {
    var id = req.body.id;
    UserModel.remove({_id: id}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.send(Data(1, null, '删除成功'))
        }
    })
}

exports.setvip = function (req, res) {
    var id = req.body.id;
    UserModel.update({_id: id}, {vip: true}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.send(Data(1, null, '设置成功'))
        }
    })
}

exports.getuserinfo = function (req, res) {
    var id = req.body.id;
    var uid = req.body.uid;
    UserModel.findOne({_id: id},{age:1,game1:1,hobby:1,idol:1,intro:1,like:1,nickname:1,sex:1,vip:1,islike:1},function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            if(doc){
                LikeModel.findOne({myid:uid,uid:id},function (err,doc1) {
                    if(err){
                        console.log(err)
                    }else{
                        if(doc1){
                            doc.islike = true;
                        }else{
                            doc.islike = false;
                        }
                        res.send(Data(1, doc, '获取成功'))
                    }
                })
            }


        }
    })

}

exports.upgame1 = function (req, res) {
    var token = req.body.token;
    var score = req.body.score;
    UserModel.update({token: token}, {$set: {game1: score}}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.send(Data(1, null, '更新成功'))
        }
    })

}

exports.updateUser = function (req,res) {
    var nickname = req.body.nickname;
    var avatar = req.body.avatar;
    var intro = req.body.intro;
    var age = req.body.age;
    var idol = req.body.idol;
    var hobby = req.body.hobby;
    var token = req.body.token;
    UserModel.update({token:token},{$set:{nickname:nickname,avatar:avatar,intro:intro,age:age,idol:idol,hobby:hobby}},function (err) {
        if(err){
            console.log(err)
        }else{
            res.send(Data(1,null,'更新成功'))
        }
    })
}

exports.like = function (req,res) {
    var id = req.body.id;
    var uid = req.body.uid;
    var LikeEntity = new LikeModel({
        myid:id,
        uid:uid
    }).save(function (err, doc) {
        if (err) {
            console.log("error :" + err);
        } else {
            UserModel.findOne({_id:uid},function (err,doc) {
                if(err){
                    console.log("error :" + err);
                }else{
                    var num = doc.like;
                    num++;
                    UserModel.update({_id:uid},{$set:{like:num}},function (err) {
                        if(err){
                            console.log("error :" + err);
                        }else{
                            res.send(Data(1, null, '喜欢'))
                        }
                    })
                }
            })

        }
    });
}

exports.unlike = function (req,res) {
    var id = req.body.id;
    var uid = req.body.uid;
    LikeModel.remove({myid:id,uid:uid},function (err) {
        if(err){
            console.log("error :" + err);
        }else{
            UserModel.findOne({_id:uid},function (err,doc) {
                if(err){
                    console.log("error :" + err);
                }else{
                    var num = doc.like;
                    num--;
                    UserModel.update({_id:uid},{$set:{like:num}},function (err) {
                        if(err){
                            console.log("error :" + err);
                        }else{
                            res.send(Data(1, null, '不喜欢'))
                        }
                    })
                }
            })
        }
    })
}