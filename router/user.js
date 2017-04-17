var express = require('express');
var app = express();
var UserRouter = express.Router();
var User = require('../controllers/user.js');
var App = require('../controllers/app.js');




UserRouter.post('/signup',User.phone,User.nick,User.signup);

UserRouter.post('/signin',User.signin);

UserRouter.post('/getuser',App.hosttoken,User.getuser);

UserRouter.post('/getuserinfo',User.getuserinfo);

UserRouter.post('/upgame1',App.token,User.upgame1);

UserRouter.post('/deleteuser',App.hosttoken,User.deleteuser);

UserRouter.post('/vip',App.hosttoken,User.setvip);

UserRouter.post('/update',App.token,User.updateUser);

UserRouter.post('/like',App.token,User.like);

UserRouter.post('/unlike',App.token,User.unlike);


module.exports = UserRouter;