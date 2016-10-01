/**
 * Created by bo on 9/25/16.
 */
'use strict';

var express = require('express');
var router = express.Router();

require('../models/user.server.model.js'); // this has to be moved to a config file or something
var user = require('../controllers/user.server.controller.js');



router.route('/users')
    .get(user.listAll);

router.route('/user/:id')
    .get(user.getOne)
    .delete(user.delete);

router.route('/user')
    .post(user.save)
    .put(user.update);

module.exports = router;






























// By Bo Vilstrup Mortensen
// This code can be deleted ->



// var express = require('express');
// var router = express.Router();
//
// var mongoose = require('mongoose');
//
//
// var FormSchema = new mongoose.Schema({
//     firstName : String,
//     lastName : String,
//     email : String,
//     created : {type : Date, default : Date.now }
// }, {collection : "form"});
//
// var User = mongoose.model("User", FormSchema); // entity manager
//
//
// router.get('/forms', function(req, res){
//
//     User.find(function (err, data) {
//         if(err) {
//             res.json(err);
//         } else {
//             res.json(data);
//         }
//     });
// }); // End of get all
//
//
// router.get('/form/:id', function(req, res){
//
//     var id = req.params.id;
//
//     User.findById(id, function(err, data) {
//         if(err) {
//             res.json(err);
//         } else {
//             res.json(data);
//         }
//     });
// }); // End of get by id
//
//
// router.delete('/form/:id', function (req, res) {
//
//     var id = req.params.id;
//
//     User.remove({"_id" : id}, function (err, result) {
//         if(err) {
//             res.json(err);
//         } else {
//             res.json(result);
//         }
//     });
// }); // End of delete
//
//
// router.post('/form', function (req, res) {
//
//     var user = new User(req.body);
//
//     user.save(function (err, createdDocument) {
//         if(err) {
//             res.json(err);
//         } else {
//             res.json(createdDocument);
//         }
//     });
// }); // End of post (save)
//
//
// router.put('/form', function (req, res) {
//
//     var id = req.body._id;
//     var editPerson = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email
//     };
//
//     User.findByIdAndUpdate(id, editPerson, { 'new': true},function(err, result) {
//         if(err) {
//             res.json(err);
//         } else {
//             res.json(result);
//         }
//     });
//
// }); // End of put (edit)
//
//
//
//
// module.exports = router;
