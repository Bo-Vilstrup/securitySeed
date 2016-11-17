/**
 * Created by bo on 9/27/16.
 */
'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

var Cards = mongoose.model('Cards');




exports.signup = function (req, res) {
    
    var newUser = new User(req.body);
    var userName = req.body.userName;

    newUser.save(function (err, createdDocument) {
        if(err) {
            res.json(err);
        } else {
            //create a place in the database for the user
            if(createdDocument != null) {
                var newUserDB = new Cards({"user": userName});
              
                newUserDB.save(function (err, db) {
                    if(err) {
                        res.json(err);
                    } else {
                        console.log("here i AM :: user.server.controller");
                        req.session.userName = userName;
                        res.json(createdDocument);
                    }
                }); // End of save newUserDB
            }
        }
    }); // End of Save newUSer
}; // End of signup


exports.signin = function (req, res) {

    var userName = req.body.userName;

    User.findOne({ 'userName': userName }, function (err, data) {
        if(err) {
            res.json(err);
        } else {
            if(data != null)
                req.session.userName = userName;
            res.json(data);
        }
    });
};

exports.signout = function (req, res) {
    
    req.body.userName = null;
    req.session.userName = null;
    res.json({"signout": "you are now logged out"});
};



exports.listAll = function (req, res) {

    User.find(function (err, data) {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of find all

exports.getOne = function (req, res) {

    var id = req.params.id;

    User.findById(id, function(err, data) {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of findById


exports.delete = function (req, res) {

    var id = req.params.id;

    User.remove({"_id" : id}, function (err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of delete


exports.save =  function (req, res) {

    var newUser = new User(req.body);
    
    newUser.save(function (err, createdDocument) {
        if(err) {
            res.json(err);
        } else {
            res.json(createdDocument);
        }
    });
};  // End of post (save)



exports.update = function (req, res) {

    var id = req.body._id;
    var editPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    User.findByIdAndUpdate(id, editPerson, { 'new': true},function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of put (edit)