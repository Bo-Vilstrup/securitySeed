/**
 * Created by bo on 10/6/16.
 */
/**
* Created by bo on 9/27/16.
*/

'use strict';

var mongoose = require('mongoose');
var Card = mongoose.model('Card');

var Card2 = mongoose.model('Card2');


exports.getDeck = function (req, res) {

    var cards = [];

    // number of cards given back by dailyExercises api
    var maxCards = 0;
    var minCards = 0;

    // // number of answers available on a card
    // var minAnswers = 1;
    // var maxAnswers = 4;

    // Get a random number of cards.
    var randomNumber = Math.random(); // [0 .. 1]
    var numberOFCards = Math.round(randomNumber * maxCards) + 1;

    for (var index = minCards; index < numberOFCards; index++) {

        var newCard = new Card2({

            "category": "Category",
            "question": "question "+index,
            "rating": {
                "nextRepetition": Date.now()
            },
            "answers": [
                {
                    "answer": "Answer "+1,
                    "isCorrect": false
                },
                {
                    "answer": "Answer "+2,
                    "isCorrect": true
                },
                {
                    "answer": "Answer "+3,
                    "isCorrect": false
                },
                {
                    "answer": "Answer "+4,
                    "isCorrect": false
                }
            ]
        }); // end of card
        cards.push(newCard);
    }

   
    
    // for(var i=0; i < cards.length; i++) {
    //     var joCard = cards[i].toJSON();
    //     delete joCard.rating;
    //     cards.push(JSON.parse( JSON.stringify(joCard) ));
    //     //cards.push(obj);
    //     //console.log(obj);
    // };
    
   

    res.json({"flashcards": cards});
}; // End of find all



exports.saveEvaluation = function (req, res) {

    res.json({"dataSaved" : "ok"}); // not implemented yet

}; // End of saveEvaluation (post)


