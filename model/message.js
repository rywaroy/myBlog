var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    user:Object,
    content:String,
    create:{type:Date,default:Date.now}
});
module.exports = mongoose.model('message',MessageSchema);