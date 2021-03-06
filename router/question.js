var express = require('express');
var app = express();
var QuestionRouter = express.Router();
var Question = require('../controllers/question.js');
var App = require('../controllers/app.js');

QuestionRouter.get('/getlist',Question.getlist);

QuestionRouter.get('/questioninfo',Question.questioninfo);

QuestionRouter.post('/putquestion',App.token,Question.putQuestion);

QuestionRouter.post('/putanswer',App.token,Question.putAnswer);

QuestionRouter.get('/getanswerinfo',Question.getAnswerInfo);

QuestionRouter.get('/getanswer',Question.getAnswer);

QuestionRouter.post('/up',App.token,Question.up);

QuestionRouter.post('/down',App.token,Question.down);

QuestionRouter.post('/delete/question',App.hosttoken,Question.deleteQuestion);

QuestionRouter.post('/delete/answer',App.hosttoken,Question.deleteAnswer);


module.exports = QuestionRouter;