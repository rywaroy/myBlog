var express = require('express');
var app = express();
var ImpressionRouter = express.Router();
var Impression = require('../controllers/impression.js');
var App = require('../controllers/app.js');

ImpressionRouter.post('/put',App.hosttoken,Impression.putImpression);

ImpressionRouter.post('/delete',App.hosttoken,Impression.deleteImpression);

ImpressionRouter.get('/get',Impression.getImpression);

ImpressionRouter.post('/publish',App.token,Impression.publishImpression);

module.exports = ImpressionRouter;