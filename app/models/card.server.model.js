/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
    question : String,
    answers : [
        {id: 0, text: String},
        {id: 1, text: String},
        {id: 2, text: String},
        {id: 3, text: String}
    ]
}, {collection : "card"});

mongoose.model("Card", CardSchema); // entity manager
