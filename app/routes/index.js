var express = require('express');
var router = express.Router();

//var configCloudEnv = require('cloud-env');

// var environment = [
//   "port: " + configCloudEnv.PORT,
//   "ip: " +configCloudEnv.IP
// ];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
                      title: 'Express',
                      env : process.env
  });
});

module.exports = router;
