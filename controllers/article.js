var mongoose = require('mongoose');
var uuid = require('uuid');
var Data = require('../returnData.js');
var Model = require('../model/article.js');
var UserModel = require('../model/user.js');

exports.uparticle = function (req,res) {
	var title = req.body.title;
	var content = req.body.content;
	var ArticleEntity = new Model.ArticleModel({
		title:title,
		content:content,
        create:Date.now()
	}).save(function(err,doc){
		if (err) {
            console.log("error :" + err);
        } else {
            res.send(Data(1,doc,'发表成功'))
        }
	})
}

exports.updatearticle = function (req,res) {
    var title = req.body.title;
    var content = req.body.content;
    var id =req.body.id;
    Model.ArticleModel.update({_id:id},{$set:{title:title,content:content,update:new Date()}},function (err) {
		if(err){
			console.log(err)
		}else{
			res.send(Data(1,null,'更新成功'))
		}
    })
}

exports.articlelist = function (req,res) {
    var limit = Number(req.query.limit);
    var page = req.query.page;
    Model.ArticleModel.find().skip((page-1)*limit).limit(limit).exec(function (err,docs) {
        if (err) {
            console.log("error :" + err);
        } else {
            Model.ArticleModel.count({},function (err,num) {
                if(err){
                    console.log(err)
                }else{
                    res.send(Data(1,{list:docs,total:num},'获取成功'))
                }
            })
        }
    })

}

exports.articleinfo = function (req,res){
	var id = req.query.id;
	Model.ArticleModel.findOne({_id:id},function(err,doc){
		if (err) {
            console.log("error :" + err);
        } else {
			console.log(doc)
			var num = doc.watch;

			num++;
			Model.ArticleModel.update({_id:id},{$set:{watch:num}},function (err) {
				if(err){
                    console.log("error :" + err);
				}else{
                    res.send(Data(1,doc,'获取成功'))
				}
            })

        }
	})
}

exports.articleup = function(req,res){
	var token = req.body.token;
	var id = req.body.id;
	UserModel.findOne({token:token},{_id:1},function(err,doc1){
		if(err){
			console.log("error :" + err);
		}else{
			Model.UpModel.findOne({uid:doc1._id,uplist:id},function(err,doc2){
				if(err){
					console.log("error :" + err);
				}else{
					//console.log(doc2)
					if(doc2){
						res.send(Data(0,null,'已经点过赞'));
					}else{
						var UpEntity = new Model.UpModel({
							uplist:id,
							uid:doc1._id
						}).save(function(err,doc){
							if (err) {
					            console.log("error :" + err);
					        } else {
					            //console.log(doc)
					        }
						});
						Model.ArticleModel.findOne({_id:id},function(err,doc3){
							if (err) {
					            console.log("error :" + err);
					        } else {
					            var num = doc3.up;
					            num++;
					            Model.ArticleModel.update({_id:id},{$set:{up:num}},function(err){
					            	if (err) {
					            		console.log("error :" + err);
					            	}else{
					            		res.send(Data(1,null,'点赞成功'))
					            	}
					            })
					        }
						});
						
					}
				}
			})
		}
	})
	
}

exports.comment = function (req,res){
	var id = req.body.id;
	var token = req.body.token;
	var content = req.body.content;
	var image = req.body.image;
	var user = {};

	UserModel.findOne({token:token},{nickname:1,avatar:1,vip:1},function(err,doc1){
		user = doc1;
		var CommentEntity = new Model.CommentModel({
		article:id,
		commentContent:content,
		nickname:user.nickname,
		vip:user.vip,
		avatar:user.avatar,
		image:image,
		creat:Date.now()
	}).save(function(err,doc){
		if (err) {
            console.log("error :" + err);
        } else {
            res.send(Data(1,doc,'发表成功'))
        }
	})

	
	});


}

exports.getcomment = function (req,res){
	var id = req.query.id;
    var limit = Number(req.query.limit);
    var page = req.query.page;

    Model.CommentModel.find({article:id}).skip((page-1)*limit).limit(limit).exec(function (err,docs) {
        if (err) {
            console.log("error :" + err);
        } else {
            Model.CommentModel.count({article:id},function (err,num) {
                if(err){
                    console.log(err)
                }else{
                    res.send(Data(1,{list:docs,total:num},'获取成功'))
                }
            })

        }
    })
}

exports.getup = function (req,res){
	var id = req.body.id;
	Model.UpModel.find({uplist:id},function(err,docs){
		if (err) {
            console.log("error :" + err);
        } else {
            res.send(Data(1,docs,'获取成功'))
        }
	})
}

exports.respon = function (req,res){
	var id = req.body.id;
	var cid = req.body.cid;
	var uid = req.body.uid;
	var token = req.body.token;
	var content = req.body.content;
	UserModel.findOne({token:token},{nickname:1},function(err,doc1){    //doc1个人信息
		if (err) {
            console.log("error :" + err);
        } else {
            Model.CommentModel.findOne({article:id,_id:cid},function(err,doc2){  //doc2评论信息
            	if (err) {
		            console.log("error :" + err);
		        } else {
		            if(uid){
		            	UserModel.findById(uid,{nickname:1},function(err,doc3){  //doc3被回复人信息
		            		if (err) {
					            console.log("error :" + err);
					        } else {
					          var data={user:doc1.nickname,userid:doc1._id,content:content,re_user:doc3.nickname,re_userid:doc3._id,reid:uuid.v4()};
					          doc2.child.push(data);
					          Model.CommentModel.update({article:id,_id:cid},{$set:{child:doc2.child}},function(err){
					          	if(err){
									console.log("error :" + err);
					          	}else{
					          		res.send(Data(1,data,'回复成功'))
					          	}
					          })
					        }
		            	})
		            }else{
		            	 var data={user:doc1.nickname,userid:doc1._id,content:content,reid:uuid.v4()};
				          doc2.child.push(data);
				          Model.CommentModel.update({article:id,_id:cid},{$set:{child:doc2.child}},function(err){
				          	if(err){
								console.log("error :" + err);
				          	}else{
				          		res.send(Data(1,data,'回复成功'))
				          	}
				          })
				        }
		            }

		        
            })
        }
	})
}
exports.deleteartcile = function(req,res){
	var id = req.body.id;
	Model.ArticleModel.remove({_id:id},function (err) {
        if (err){
            console.log(err)
        }else{
            res.send(Data(1,null,'删除成功'))
        }
    })
}

exports.deletecomment = function(req,res){
	var id = req.body.id;
	var cid = req.body.cid;
	Model.CommentModel.remove({_id:cid,article:id},function (err) {
        if (err){
            console.log(err)
        }else{
            res.send(Data(1,null,'删除成功'))
        }
    })
}

exports.deleterespon = function(req,res){
	var id = req.body.id;
	var cid = req.body.cid;
	var rid = req.body.rid;
	Model.CommentModel.findOne({_id:cid,article:id},function (err,doc) {
        if (err){
            console.log(err)
        }else{
            doc.child.forEach(function(el,index){
            	if(el.reid == rid){
            		doc.child.splice(index,index+1);
            		Model.CommentModel.update({_id:cid,article:id},{$set:{child:doc.child}},function(err){
            			if(err){
							console.log(err)
            			}else{
            				res.send(Data(1,null,'删除成功'))
            			}
            		})
            	}
            })
        }
    })
}





















