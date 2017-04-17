
var mongoose = require('mongoose');
var LikeSchema = new mongoose.Schema({
    myid:String,
    uid:String,
});
var LikeModel = mongoose.model("like", LikeSchema);

module.exports = LikeModel;