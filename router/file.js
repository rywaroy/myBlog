/**
 * Created by qiangxl on 2017/3/26.
 */
var express = require('express');
var app = express();
var FileRouter = express.Router();
var File = require('../controllers/file.js');
var App = require('../controllers/app.js');

FileRouter.post('/host',File.upload);

module.exports = FileRouter;