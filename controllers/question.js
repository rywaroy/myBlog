var mongoose = require('mongoose');
var uuid = require('uuid');
var Data = require('../returnData.js');
var Model = require('../model/question.js');
var UserModel = require('../model/user.js');

exports.putQuestion = function (req, res) {
    var token = req.body.token;
    var title = req.body.title;
    var content = req.body.content;
    UserModel.findOne({token: token}, {nickname: 1, avatar: 1, vip: 1, intro: 1}, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            var QuestionEntity = new Model.QuestionModel({
                title: title,
                content: content,
                user: doc
            }).save(function (err, doc) {
                if (err) {
                    console.log("error :" + err);
                } else {
                    res.send(Data(1, doc, '发表成功'))
                }
            })
        }
    })

}

exports.getlist = function (req, res) {
    var limit = Number(req.query.limit);
    var page = req.query.page;
    Model.QuestionModel.find().skip((page - 1) * limit).limit(limit).exec(function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.send(Data(1, docs, '获取成功'))
        }
    })
}

exports.questioninfo = function (req, res) {
    var id = req.query.id;
    Model.QuestionModel.findOne({_id: id}, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.send(Data(1, doc, '获取成功'))
        }
    })
}

exports.putAnswer = function (req, res) {
    var id = req.body.id;
    var content = req.body.content;
    var token = req.body.token;
    UserModel.findOne({token: token}, {nickname: 1, avatar: 1, vip: 1, intro: 1}, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            var AnswerEntity = new Model.AnswerModel({
                content: content,
                user: doc,
                question: id
            }).save(function (err, doc) {
                if (err) {
                    console.log("error :" + err);
                } else {
                    res.send(Data(1, doc, '发表成功'))
                }
            })
        }
    })
}

exports.getAnswer = function (req, res) {
    var id = req.query.id;
    var page = req.query.page;
    var limit = Number(req.query.limit);
    Model.AnswerModel.find({question: id}).skip((page - 1) * limit).limit(limit).exec(function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.send(Data(1, docs, '获取成功'))
        }
    })
}

exports.up = function (req, res) {
    var token = req.body.token;
    var id = req.body.id;
    var aid = req.body.aid;

    UserModel.findOne({token: token}, {_id: 1}, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            Model.UpQuestionModel.findOne({uid: doc._id, question: id, answer: aid}, function (err, doc1) {
                if (err) {
                    console.log(err)
                } else {
                    if (doc1) {
                        res.send(Data(0, null, '你已经点过赞了'))
                    } else {
                        var UpQuestionEntity = new Model.UpQuestionModel({
                            uid: doc._id,
                            question: id,
                            answer: aid
                        }).save(function (err, doc) {
                            if (err) {
                                console.log("error :" + err);
                            } else {
                                Model.AnswerModel.update({
                                    question: id,
                                    _id: aid
                                }, {$set: {isUp: true}}, function (err, doc2) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        res.send(Data(1, null, '点赞成功'))
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

exports.down = function (req, res) {
    var token = req.body.token;
    var id = req.body.id;
    var aid = req.body.aid;

    UserModel.findOne({token: token}, {_id: 1}, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            Model.UpQuestionModel.findOne({uid: doc._id, question: id, answer: aid}, function (err, doc1) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(doc1)
                    if (doc1) {
                        Model.UpQuestionModel.remove({uid: doc._id, question: id, answer: aid}, function (err, doc3) {
                            if (err) {
                                console.log(err)
                            } else {
                                Model.AnswerModel.update({
                                    question: id,
                                    _id: aid
                                }, {$set: {isUp: false}}, function (err, doc2) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        res.send(Data(1, null, '点赞取消'))
                                    }
                                })
                            }
                        })
                    } else {
                        res.send(Data(0, null, '你还未点过赞'))
                    }
                }
            })
        }
    })
}