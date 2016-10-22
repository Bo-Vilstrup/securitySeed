/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({

    id: String,
    name: String,
    flashcards: [
        {
            id: String,
            category: String,
            question: String,
            answers: [
                {
                    answer: String,
                    isCorrect: Boolean,
                    ratings: {
                        rating: { type: Number, default: -1 },
                        durationElapsed: { type: Number, default: -1 },
                        correctAnswered: { type: Boolean, default: false },
                        solvedDate: { type: Date, default: '' }
                    }
                }
            ]
        }
    ]

}, {collection: "card2"});

mongoose.model("Card2", CardSchema); // entity manager