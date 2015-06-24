/**
 * Created by 동준 on 2015-04-22.
 */
var express = require('express');
var http = require("http");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

/** 모듈 및 레디스 설정 등등 */
app.use(favicon(__dirName + '/public/lib/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/** static 경로 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('../upload')));

/** 라우터 설정 */
app.get("/", function(req, res){
  res.sendFile(__dirname + "/public/dist/html/index.html");
});

/** 서버구동 */
http.createServer(app).listen(4000, function(){
  console.log("Express server listening on port " + 4000);
});

module.exports = app;
