/**
 * Created by bo on 9/30/16.
 */
'use strict';

var express = require('express');
var router = express.Router();

require('../../app/models/deck.server.model'); // this has to be moved to a config file or something
var deck = require('../../app/controllers/deck.server.controller');


router.route('/decks')
    .get(deck.listAll);

router.route('/form/:id')
    .get(deck.getOne)
    .delete(deck.delete);

router.route('/deck')
    .post(deck.save);

module.exports = router;