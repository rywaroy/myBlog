var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = new mongoose.Schema({
    title:String,
    create:{type:Date},
    update:Date,
    content:String,
    up:{type:Number,default:0},
    watch:{type:Number,default:0},
});

var CommentSchema = mongoose.Schema({
    nickname:String,
    vip:Boolean,
    commentContent:String,
    avatar:String,
    creat:{
        type:Date,
    },
    child:{type:Array,default:[]},
    image:{type:String,default:null},
    up:{type:Number,default:0},
    isup:{type:Boolean,default:false},
    article:{
        type:Schema.Types.ObjectId,
        ref:'article'
    },
});

var UpSchema = mongoose.Schema({
    uid:String,
    uplist:{
        type:Schema.Types.ObjectId,
        ref:'uplist'
    }
});

exports.CommentModel = mongoose.model('comment',CommentSchema);

exports.ArticleModel = mongoose.model("article", ArticleSchema);

exports.UpModel = mongoose.model('uplist',UpSchema);

