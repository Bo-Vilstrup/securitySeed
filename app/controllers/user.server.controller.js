/**
 * Created by bo on 9/27/16.
 */
'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

// require('./config/passport')(passport);
//require('../../config/strategy/passport')(passport);
// const jwtConfig = require("../config/jwtConfig").jwtConfig;
var jwtConfig = require("../../config/config").jwtConfig;
var jwt = require('jwt-simple');


exports.signup = function (req, res) {

    // var newUser = new User(req.body);
    //
    // newUser.save(function (err, createdDocument) {
    //     if(err) {
    //         res.json(err);
    //     } else {
    //         res.json(createdDocument);
    //     }
    // });


    if (!req.body.userName || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var newUser = new User({
            userName: req.body.userName,
            password: req.body.password
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
}; // End of signup


exports.signin = function (req, res) {

    // var userName = req.body.userName;
    //
    // User.findOne({ 'userName': userName }, function (err, data) {
    //     if(err) {
    //         res.json(err);
    //     } else {
    //         if(data != null)
    //             req.session.userName = userName;
    //         res.json(data);
    //     }
    // });

    User.findOne({
        userName: req.body.userName
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var iat = new Date().getTime() / 1000; //convert to seconds
                    var exp = iat + jwtConfig.tokenExpirationTime;
                    var payload = {
                        aud: jwtConfig.audience,
                        iss: jwtConfig.issuer,
                        iat: iat,
                        exp: exp,
                        sub: user.userName
                    };
                    var token = jwt.encode(payload, jwtConfig.secret);
                    // return the information including token as JSON
                    res.json({token: 'JWT ' + token});
                } else {
                    res.status(401).send({msg: 'Authentication failed. Wrong password.'});
                }
            });
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
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of find all

exports.getOne = function (req, res) {

    var id = req.params.id;

    User.findById(id, function (err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of findById


exports.delete = function (req, res) {

    var id = req.params.id;

    User.remove({"_id": id}, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of delete


exports.save = function (req, res) {

    var newUser = new User(req.body);

    newUser.save(function (err, createdDocument) {
        if (err) {
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

    User.findByIdAndUpdate(id, editPerson, {'new': true}, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of put (edit)