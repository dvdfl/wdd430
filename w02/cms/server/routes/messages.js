var express = require('express');
var router = express.Router();

/* GET all messages. */
router.get('/', function(req, res, next) {
  res.send("Messages GET enpoint working!");
});

module.exports = router;
