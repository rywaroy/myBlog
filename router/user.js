var express = require('express');
var app = express();
var UserRouter = express.Router();
var User = require('../controllers/user.js');
var App = require('../controllers/app.js');




UserRouter.post('/signup',User.phone,User.nick,User.signup);

UserRouter.post('/signin',User.signin);

UserRouter.post('/getuser',App.hosttoken,User.getuser);

UserRouter.post('/deleteuser',App.hosttoken,User.deleteuser);

UserRouter.post('/vip',App.hosttoken,User.setvip);

module.exports = UserRouter;