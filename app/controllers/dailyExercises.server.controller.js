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
    var maxCards = 2;
    var minCards = 0;

    // // number of answers available on a card
    // var minAnswers = 1;
    // var maxAnswers = 4;

    // Get a random number of cards.
    var randomNumber = Math.random(); // [0 .. 1]
    var numberOFCards = Math.round(randomNumber * maxCards);

    for (var index = minCards; index < numberOFCards; index++) {

        var newCard = new Card2({
            
            id: "id"+index,
            name: "name"+index,
            flashcards: [
                {
                    id: "id"+1,
                    category: "category",
                    question: "question",
                    answers: [
                        {
                            answer: "answer"+1,
                            isCorrect: false
                        },
                        {
                            answer: "answer"+2,
                            isCorrect: true
                        },
                        {
                            answer: "answer"+3,
                            isCorrect: false
                        },
                        {
                            answer: "answer"+4,
                            isCorrect: false
                        }
                    ]
                }
            ]
        }); // end of card
        cards.push(newCard);
    }
    res.json({"user": cards});
}; // End of find all




// exports.getDeck = function (req, res) {
//
//     var cards = [];
//
//     var maxCards = 40;
//     var minCards = 0;
//
//     var randomNumber = Math.random(); // [0 .. 1]
//     var numberOFCards = Math.round(randomNumber * maxCards);
//
//     for (var index = minCards; index < numberOFCards; index++) {
//
//         var newCard = new Card({
//             question: "Question " + index,
//             answers: [
//                 {id: 0, text: "answers 0"},
//                 {id: 1, text: "answers 1"},
//                 {id: 2, text: "answers 2"},
//                 {id: 3, text: "answers 3"}
//             ]
//         });
//         cards.push(newCard);
//     }
//     res.json({"deck": cards});
// }; // End of find all


exports.saveEvaluation = function (req, res) {

    res.json({"dataSaved" : "not implemented yet"}); // not implemented yet

}; // End of saveEvaluation (post)