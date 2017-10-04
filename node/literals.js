

const express = require ('express');
const router = express.Router();


router.get('/:someString', (req, res) => {
  res.send(`this was your string: ${req.params.someString}`);
})
module.exports = router;
