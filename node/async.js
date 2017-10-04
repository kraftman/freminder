
const express = require ('express');
const router = express.Router();
const file = require ('fs');
router.get('/', async (req, res) => {
  try {
    var done = await file.writeFile('out2.txt', 'testing');
    throw new Error('eek')
    res.send('finished');
  } catch(e){
    res.send('failed: '+e.message);
  }
})

router.get('/par', async (req, res) => {
  try {
     let done = await Promise.all([
        file.writeFile('out2.txt', 'testing'),
        file.writeFile('out3.txt', 'testing2')
      ]
     )
     console.log(done);
     res.send('done');
  } catch(e) {
    //error handler
    res.send('failed:'+e.message)
  }
})

function getPromise(){
  return new Promise((resolve, reject) => {
    try {
    file.writeFileSync('out4.txt', 'testing')
    throw new Error ('failed');
    return resolve();
  } catch(e) {
    return reject();
  }
  })
}

router.get('/promise', (req,res) => {
  getPromise().then(() => {
    res.send('done')
  }, () =>  res.send('failed'))
})

module.exports = router;
