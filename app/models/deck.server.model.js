/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');
var CardSchema = require('../../app/models/card.server.model');

var FormSchema = new mongoose.Schema({
    deckTitle : String,
    cards : [CardSchema]
}, {collection : "deck"});

mongoose.model("Deck", FormSchema); // entity manager