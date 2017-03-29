var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var user = require('./router/user.js');
var host = require('./router/host.js');
var file = require('./router/file.js');
var article = require('./router/article.js')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost/test1");
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
app.use('/article',article)
app.listen(3000)