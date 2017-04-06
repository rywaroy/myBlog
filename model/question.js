var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuestionSchema = new Schema({
    user:Object,
    content:String,
    title:String,
    createTime:{type:Date,default:Date.now},
});
var AnswerSchema = new Schema({
    user:Object,
    content:String,
    up:{type:Number,default:0},
    isUp:{type:Boolean,default:false},
    createTime:{type:Date,default:Date.now},
    question:{type:Schema.Types.ObjectId,ref:'question'},
});
var UpQuestionSchema = new Schema({
    uid:String,
    question:{type:Schema.Types.ObjectId,ref:'question'},
    answer:{type:Schema.Types.ObjectId,ref:'answer'}
})

exports.QuestionModel = mongoose.model('question',QuestionSchema);
exports.AnswerModel = mongoose.model('answer',AnswerSchema);
exports.UpQuestionModel = mongoose.model('upquestion',UpQuestionSchema);