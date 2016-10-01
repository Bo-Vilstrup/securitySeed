/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');
var Card = mongoose.model('Card');


exports.listAll = function (req, res) {

    Card.find(function (err, data) {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of find all


exports.getOne = function (req, res) {

    var id = req.params.id;

    Card.findById(id, function(err, data) {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of findById


exports.delete = function (req, res) {

    var id = req.params.id;

    Card.remove({"_id" : id}, function (err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of delete

exports.save =  function (req, res) {

    var newCard = new Card(req.body);

    newCard.save(function (err, createdDocument) {
        if(err) {
            res.json(err);
        } else {
            res.json(createdDocument);
        }
    });
};  // End of post (save)

