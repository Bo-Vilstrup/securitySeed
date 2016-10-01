/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');
var Deck = mongoose.model('Deck');


exports.listAll = function (req, res) {

    Deck.find(function (err, data) {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of find all


exports.getOne = function (req, res) {

    var id = req.params.id;

    Deck.findById(id, function(err, data) {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of findById


exports.delete = function (req, res) {

    var id = req.params.id;

    Deck.remove({"_id" : id}, function (err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of delete


exports.save = function (req, res) {

    var newDeck = new Deck(req.body);

    newDeck.save(function (err, createdDocument) {
        if(err) {
            res.json(err);
        } else {
            res.json(createdDocument);
        }
    });
};  // End of post (save)