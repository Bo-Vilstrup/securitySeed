/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');

var FormSchema = new mongoose.Schema({
    deckTitle : String,
    cards : []
}, {collection : "deck"});

mongoose.model("Deck", FormSchema); // entity manager