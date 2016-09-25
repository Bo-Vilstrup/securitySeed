var express = require('express');
var router = express.Router();

var config = require('cloud-env');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express :: edit by Bo 1 : ' + config.PORT +' ' +config.IP });
});

module.exports = router;
