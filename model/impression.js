var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImpressionListSchema = new Schema({
    title:String,
    number:{type:Number,default:0}
});
var ImpressionUserSchema = new Schema({
    userid:String,
    nickname:String,
    choose:Array
});

exports.ImpressionListModel = mongoose.model('impressionList',ImpressionListSchema);

exports.ImpressionUserModel = mongoose.model("impressionUser", ImpressionUserSchema);