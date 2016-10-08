/**
 * Created by bo on 9/27/16.
 */
'use strict';

var mongoose = require('mongoose');


var FormSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    userName : { type: String, unique: true },
    email : String,
    created : {type : Date, default : Date.now }
}, {collection : "user"});

mongoose.model("User", FormSchema); // entity manager