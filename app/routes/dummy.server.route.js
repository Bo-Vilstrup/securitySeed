/**
 * Created by bo on 12/4/16.
 */
'use strict';

var express = require("express");
var router = express.Router();

router.get("/names",function(req,res){
    res.json([{name: "Peter"}, {name: "Kurt"},{name: "Hanne"}]);
});

router.get("/hellos",function(req,res){
    res.json([{msg: "Hello World" }, {msg: "Hello all"},{msg: "Hello guys"}]);
});
module.exports = router;