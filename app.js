var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var user = require('./router/user.js');
var host = require('./router/host.js');
var file = require('./router/file.js');
var article = require('./router/article.js');
var question = require('./router/question.js');
var message = require('./router/message.js');
var impression = require('./router/impression.js');
var history = require('connect-history-api-fallback');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect("mongodb://localhost/blog");
// var db = mongoose.connect("mongodb://AccessKeyID:195d0fc9cb9a4b2692de7e7bffae234f@localhost:8908/blog");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("——数据库连接成功！——");
});
app.use(cors());


app.use('/u', user);
app.use('/host', host);
app.use('/upload',file);
app.use('/article',article);
app.use('/question',question);
app.use('/message',message);
app.use('/impression',impression);

app.use(history());
app.listen(80);