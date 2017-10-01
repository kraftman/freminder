


var helmet = require ('helmet');
var bodyParser = require('body-parser');
var home = require('./controllers/home');
var express = require('express');

var app = module.exports = express();


app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public/', express.static('public'));
app.set('view engine', 'pug');


var auth = require('./auth');

app.use(function(req, res, next) {
  res.locals.uid = req.session.passwordless || null;
  next();
})

app.use('/', home);


app.listen(80);












// import path from 'path'
// import Express from 'express'
// // import React from 'react'
// // import { createStore } from 'redux'
// // import { Provider } from 'react-redux'
// import counterApp from './reducers'
// import App from './containers/App'


//var redisStore = require('passwordless-redisstore');
//const uuidV4 = require('uuid/v4');
//var Redis = require('ioredis');
//var red = new Redis('redis');
//Serve static files

// This is fired every time the server side receives a request
//app.use(handleRender)

// We are going to fill these out in the sections to follow
//function handleRender(req, res) { /* ... */ }
//function renderFullPage(html, preloadedState) { /* ... */ }

//app.listen(port)










//
// server.send({
//
//   from: 'chris <me@itschr.is>', // sender address
//   to: 'me <me@itschr.is>',// list of receivers
//   cc: '',
//   subject: 'your subject', // Subject line
//   text: 'contant', // html body
//
// }, function (err, message) {
//
//   if(err){
//    console.log(err)
//   }else{
//    console.log("email sent")
//   }
// });



//
// s3.createBucket({Bucket: myBucket}, function(err, data) {
//
//   if (err) {
//     console.log(err);
//   } else {
//     params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};
//     s3.putObject(params, function(err, data) {
//
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Successfully uploaded data to myBucket/myKey");
//       }
//     });
//   }
// });
