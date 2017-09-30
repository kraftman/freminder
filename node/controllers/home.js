
var app = require('express')
var router = app.Router();

var passwordless = require('passwordless');

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var myBucket = 'testiesddd';
var myKey = 'test';

router.get('/', function(req,res){
  console.log(req.session.passwordless)
  res.locals.uid = req.session.passwordless || null
  res.render('index', { title: 'Hey', message: 'Hello there!', req: req })

});

// router.get('/test',function(req,res){
//   res.send('testies');
// });


router.get('/admin', passwordless.restricted(),
    function(req, res) {
        res.send(req.user );
});

router.get('/test.html', function (req, res) {
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

module.exports = router;
