/**
 * Created by bo on 10/6/16.
 */
/**
* Created by bo on 9/27/16.
*/

'use strict';

var mongoose = require('mongoose');
//var Card = mongoose.model('Card');

var Card2 = mongoose.model('Card2');
var Cards = mongoose.model('Cards');

var cal = require('../sm2/spacedRepetition.server.calculator');


exports.getDeck = function (req, res) {

    //var cards = [];
    
    // // number of cards given back by dailyExercises api
    // var maxCards = 0;
    // var minCards = 0;
    // // Get a random number of cards.
    // var randomNumber = Math.random(); // [0 .. 1]
    // var numberOFCards = Math.round(randomNumber * maxCards) + 1;
    //
    // for (var index = minCards; index < numberOFCards; index++) {
    //
    //     var newCard = new Card2({
    //
    //         "category": "Category",
    //         "question": "question "+index,
    //         "rating": {
    //             "nextRepetition": Date.now()
    //         },
    //         "answers": [
    //             {
    //                 "answer": "Answer "+1,
    //                 "isCorrect": false
    //             },
    //             {
    //                 "answer": "Answer "+2,
    //                 "isCorrect": true
    //             },
    //             {
    //                 "answer": "Answer "+3,
    //                 "isCorrect": false
    //             },
    //             {
    //                 "answer": "Answer "+4,
    //                 "isCorrect": false
    //             }
    //         ]
    //     }); // end of card
    //     cards.push(newCard);
    // }

    Cards.find({"user": "test"/*req.session.userName*/}, function (err, userDB) {

       if(!err) {
            var db = userDB[0];
            res.json({"flashcards": db.flashcards});
        }
    });
    
    
   

    //res.json({"flashcards": cards});
}; // End of find all



exports.saveEvaluation = function (req, res) {

    var id = req.body.id;
    var grade = req.body.grade;
    
    findCard(id, function (card) {
        cal.calcIntervalEF(card, grade);
        
        editCard(card, function (cards) {
           res.json(cards); 
        });
        //res.json(editCard(card));
        
    });


    

    // cal.calcIntervalEF(card, grade);
    //
    // res.json(editCard(card));
    //

    //res.json(card); // not implemented yet

}; // End of saveEvaluation (post)




var findCard = function (id, callback) {

     Cards.find({"user": "test"/*req.session.userName*/}, function (err, userDB) {

        if (!err) {
            var db = userDB[0];
            var card = db.flashcards.id(id);
            return callback(card);
        }
    }); 
};







var editCard = function (card, callback) {

    var id = card._id;
    var editCard = {
        "category": card.category,
        "question": card.question
    };

    Cards.find({"user": "test"/*req.session.userName*/}, function (err, userDB) {

        if (!err) {
            var db = userDB[0];
            var flashcard = db.flashcards.id(id);

            flashcard.category = card.category;
            flashcard.question = card.question;

            flashcard.rating.durationElapsed = card.rating.durationElapsed;
            flashcard.rating.correctAnswered = card.rating.correctAnswered;

            flashcard.rating.lastRepetition = card.rating.lastRepetition;
            flashcard.rating.nextRepetition = card.rating.nextRepetition;

            flashcard.rating.grade = card.rating.grade;
            flashcard.rating.interval = card.rating.interval;
            flashcard.rating.repetition = card.rating.repetition;
            flashcard.rating.ef = card.rating.ef;

            flashcard.answers.forEach(function (item, index) {
                item.answer = card.answers[index].answer;
                item.isCorrect = card.answers[index].isCorrect;
            });


            db.save(function (err, createdDocument) {
                if (!err) {
                    return callback(createdDocument);
                }
            });
        }
    });
    
};





var sortByDate = function(flashcards) {

    return flashcards.sort(function(a, b) {
        return (new Date(b.rating.nextRepetition)) - (new Date(a.rating.nextRepetition));
    });

};