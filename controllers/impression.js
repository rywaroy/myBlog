var mongoose = require('mongoose');
var Data = require('../returnData.js');
var Model = require('../model/impression.js');
var UserModel = require('../model/user.js');

exports.putImpression = function (req,res) {
    var title = req.body.title;
    var ImpressionListEntity = new Model.ImpressionListModel({
        title:title
    }).save(function(err,doc){
        if (err) {
            console.log("error :" + err);
        } else {
            res.send(Data(1,doc,'发表成功'))
        }
    })
}

exports.deleteImpression = function (req,res) {
    var id = req.body.id;
    Model.ImpressionListModel.remove({_id:id},function (err) {
        if(err){
            console.log(err)
        }else{
            res.send(Data(1,null,'删除成功'))
        }
    })
}

exports.getImpression = function (req,res) {
    Model.ImpressionListModel.find().sort({'number':-1}).exec(function (err,docs) {
        if(err){
            console.log(err)
        }else{
            res.send(Data(1,docs,'获取成功'))
        }
    })
}

exports.publishImpression = function (req,res) {
    var datas = req.body.list;
    var token = req.body.token;
    UserModel.findOne({token:token},{ph:1,nickname:1},function (err,user) {
        if(err){
            console.log(err)
        }else{
            Model.ImpressionUserModel.findOne({userid:user._id},function (err,uselist) {
                if(err){
                    console.log(err)
                }else{
                    if(uselist){
                        res.send(Data(0,null,'你已经提交过好友印象了'))
                    }else{
                        var ImpressionUserEntity = new Model.ImpressionUserModel({
                            userid:user.id,
                            nickname:user.name,
                            choose:datas
                        }).save(function(err,doc){
                            if (err) {
                                console.log("error :" + err);
                            } else {
                                Model.ImpressionListModel.find({},function (err,docs) {
                                   if(err){
                                       console.log(err)
                                   }else{
                                       console.log(docs)
                                       for(var i in datas){
                                           for (var j in docs){
                                               if(datas[i]._id == docs[j]._id){
                                                   var num = docs[j].number;
                                                   num++;
                                                   Model.ImpressionListModel.update({_id:docs[j]._id},{$set:{number:num}},function (err,docs) {
                                                       if(err){
                                                           console.log(err)
                                                       }else{

                                                       }


                                                   })
                                               }
                                           }
                                       }
                                       res.send(Data(1,null,'提交成功'));
                                   }
                                })

                            }
                        })
                    }
                 }
            })
        }
    })
}