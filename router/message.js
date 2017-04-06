var express = require('express');
var app = express();
var MessageRouter = express.Router();
var Message = require('../controllers/message.js');
var App = require('../controllers/app.js');


MessageRouter.get('/get',Message.getMessage);

MessageRouter.post('/put',App.token,Message.putMessage);

MessageRouter.post('/delete',App.hosttoken,Message.deleteMessage);

module.exports = MessageRouter;