var express = require('express');
var app = express();
var ArticleRouter = express.Router();
var Article = require('../controllers/article.js');
var App = require('../controllers/app.js');


ArticleRouter.post('/publish',App.hosttoken,Article.uparticle);

ArticleRouter.get('/list',Article.articlelist);

ArticleRouter.get('/info',Article.articleinfo);

ArticleRouter.post('/comment',App.token,Article.comment);

ArticleRouter.get('/comment',Article.getcomment);

ArticleRouter.get('/up',Article.getup);

ArticleRouter.post('/up',App.token,Article.articleup);

ArticleRouter.post('/respon',App.token,Article.respon);

ArticleRouter.post('/delete/article',App.hosttoken,Article.deleteartcile);

ArticleRouter.post('/delete/comment',App.hosttoken,Article.deletecomment);

ArticleRouter.post('/delete/reply',App.hosttoken,Article.deleterespon);
module.exports = ArticleRouter;