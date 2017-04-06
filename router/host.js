/**
 * Created by qiangxl on 2017/3/25.
 */
var express = require('express');
var app = express();
var HostRouter = express.Router();
var Host = require('../controllers/host.js');
var App = require('../controllers/app.js');

HostRouter.post('/signup',Host.phone,Host.nick,Host.signup);
HostRouter.post('/signin',Host.signin);
HostRouter.get('/gethost',Host.gethost);
HostRouter.post('/gethost',App.hosttoken,Host.sethost)
module.exports = HostRouter;