var uuid = require('uuid');
var Data = require('../returnData.js');
var MessageModel = require('../model/message.js');
var UserModel = require('../model/user.js');

exports.getMessage = function (req,res) {
    var limit = Number(req.query.limit);
    var page = req.query.page;
    MessageModel.find().skip((page-1)*limit).limit(limit).sort({_id:-1}).exec(function (err,docs) {
        if(err){
            console.log(err)
        }else{
            MessageModel.count({},function (err,num) {
                if(err){
                    console.log(err)
                }else{
                    res.send(Data('1',{list:docs,total:num},'获取成功'))
                }
            })
        }
    })
}

exports.putMessage = function (req,res) {
    var token = req.body.token;
    var content = req.body.content;
    var anonymous = req.body.anonymous;
    var image = req.body.img;
    UserModel.findOne({token:token},{nickname:1,avatar:1,vip:1,intro:1},function (err,user) {
        if(err){
            console.log(err)
        }else{
            var MessageEntity = new MessageModel({
                user:anonymous?'':user,
                content:content,
                image:image,
                create:Date.now()
            }).save(function (err) {
                if(err){
                    console.log(err)
                }else{
                    res.send(Data(1,null,'留言成功'))
                }
            })
        }
    })
}
exports.deleteMessage = function (req,res) {
    var id = req.body.id;
    MessageModel.remove({_id:id},function (err) {
        if(err){
            console.log(err)
        }else{
            res.send(Data(1,null,'删除成功'))
        }
    })
}