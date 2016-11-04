/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');
// var Card = mongoose.model('Card');
var Card = mongoose.model('Card2');


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

exports.update = function (req, res) {
    
    var id = req.body._id;
    var editCard = {
        "category": req.body.category,
        "question": req.body.question
    };
    
    Card.findByIdAndUpdate(id, editCard, { 'new': true},function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of put (edit)




/*
 {
 "category": "String",
 "question": "String",
 "rating": {

 "durationElapsed": "Number",
 "correctAnswered": "Boolean",

 "lastRepetition": "Date",
 "nextRepetition": "Date",

 "grade": "Number",
 "interval": "Number",
 "repetition": "Number",
 "ef": "SchemaTypes.Double"

 },
 "answers": [
 {
 "answer": "String",
 "isCorrect": "Boolean"
 }
 ]
 }



*/





