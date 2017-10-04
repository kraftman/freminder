const express = require('express')
const app = express()

const users = require ('./users');
const asyncTest = require ('./async');
const literals = require ('./literals');
app.use('/async', asyncTest);
app.use('/user', users);
app.use('/literals', literals);
app.get('/',(req, res) => {
  res.send('hi!');
})

app.listen(80);
