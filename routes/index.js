var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' Hi Welcome to My channel' });
});

module.exports = router;
