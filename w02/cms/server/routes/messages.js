var express = require('express');
var router = express.Router();

/* GET all messages. */
router.get('/', function(req, res, next) {
  res.send("get");
});

module.exports = router;
