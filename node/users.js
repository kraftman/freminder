const express = require('express')

const router = express.Router();

const userMiddle = function(req, res, next, id){
  req.user = 'chris object'
  next();
}

router.param('userID', userMiddle)

router.route('/')
.get((req,res) => {
  res.send('got a user!')
})
.delete((req, res) => {
  res.send('this would delete');
})

router.route('/:userID')
.get((req, res) => {
  res.send('matched user:'+ req.user)
})

module.exports = router;
