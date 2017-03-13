

/*jshint esversion: 6 */



console.log('started!');

var AWS = require('aws-sdk');


var s3 = new AWS.S3();
var myBucket = 'testiesddd';
var myKey = 'test';

var express = require('express');

var app = express();

app.get('/test.html', function (req, res) {
  s3.getObject({Bucket: 'tannertest', Key: 'test.txt' }, function(err,data){

    if (err) {
      console.log(err, err.stack);
      res.send('');
    } else {
      res.type('text/html')
      res.send(data.Body);           // successful response
    }
  });
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});




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
