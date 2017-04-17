var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    user:Object,
    content:String,
    image:String,
    create:{type:Date}
});
module.exports = mongoose.model('message',MessageSchema);