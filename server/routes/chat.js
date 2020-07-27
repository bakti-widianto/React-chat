var express = require('express');
var router = express.Router();
var Chat = require('../models/Chat')


/* GET users listing. */
router.get('/', function (req, res, next) {
  Chat.find()
    .then(result => console.log(result))
    .catch(err => console.log(err))
});

module.exports = router;
