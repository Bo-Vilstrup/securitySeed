/**
 * Created by bo on 10/6/16.
 */
var express = require('express');
var router = express.Router();

require('../models/card.server.model'); // this has to be moved to a config file or something
var dailyExercises = require('../controllers/dailyExercises.server.controller');



router.route('/dailyExercises')
    .get(dailyExercises.getDeck)
    .post(dailyExercises.saveEvaluation); // post is not implemented yet

module.exports = router;