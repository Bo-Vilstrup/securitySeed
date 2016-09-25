var express = require('express');
var router = express.Router();

var config = require('cloud-env');

var environment = [
  "port: " + config.PORT,
  "ip: " +config.IP
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
                      title: 'Express',
                      env : environment
  });
});

module.exports = router;
