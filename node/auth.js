
var passwordless = require('passwordless');

var cookieSession = require('cookie-session');

var Redis = require('ioredis');
var red = new Redis('redis');
var redisStore = require('passwordless-redisstore');

const uuidV4 = require('uuid/v4');

var email = require('emailjs')

var app = require('./server');


app.use(cookieSession({
  name: 'session',
  keys: ['mysecretkey'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passwordless.sessionSupport());
passwordless.init(new redisStore(6379,'redis'),{skipForceSessionSave:true});
app.use(passwordless.acceptToken({ successRedirect: '/success'}));


passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        var host = 'localhost:80';
        smtpServer.send({
            text:    'Hello!\nAccess your account here: http://'
            + host + '?token=' + tokenToSend + '&uid='
            + encodeURIComponent(uidToSend),
            from:    'me@itschr.is',
            to:      recipient,
            subject: 'Token for ' + host
        }, function(err, message) {
            if(err) {
                console.log(err);
            }
            callback(err);
        });
});

function GetUser(user, delivery, callback, req){
  red.get('email:'+user).then(res =>{
    //if they don't exist, create them
    if (res) {
      console.log(res);
      callback(null, res);
    } else {
      var uuid = uuidV4();
      red.set('email:'+user, uuid)
      .then(red.hset('user:'+uuid, email, user));
      callback(null,uuid);
    }
  })
  .catch(e => {
    console.log('error getting from redis: ',e);
    callback(null,null);
  });
}

app.post('/sendtoken',
  passwordless.requestToken(GetUser),
  function(req, res) {
    console.log('heresr');
    res.send('sent');
    //res.render('sent');
  }
);

var smtpServer = email.server.connect({
              user: 'me@itschr.is',
              password: process.env.GMAIL_OTP,
              host: 'smtp.gmail.com',
              ssl: true,
            });

// var users = [
//     { id: 1, email: 'me@itschr.is' },
//     { id: 2, email: 'alice@example.com' }
// ];




app.get('/success', function(req,res){
  res.send('successfully logged in!');
})

app.get('/logout', passwordless.logout(),
    function(req, res) {
        console.log('logged out');
        res.redirect('/');
});

//var router = express.Router();
app.get('/login', function(req, res) {

   res.send(`<html>
       <body>
           <h1>Login</h1>
           <form action="/sendtoken" method="POST">
               Email:
               <br><input name="user" type="text">
               <br><input type="submit" value="Login">
           </form>
       </body>
   </html>
`);
});
