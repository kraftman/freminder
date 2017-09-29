
var app = require('express')
var router = app.Router();

router.get('/', function(req,res){
  res.render('index', { title: 'Hey', message: 'Hello there!', req: req })
  // if (req.user){
  //   res.send('you are logged in, ID:  '+req.user);
  // } else {
  //   res.send('you are not logged in');
  // }
});



admin.get('/admin', passwordless.restricted(),
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
