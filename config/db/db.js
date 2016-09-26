/**
 * Created by bo on 9/26/16.
 */
'use strict';

var mongoose = require('mongoose');
//mongoose.Promise = global.Promise; // removes warning about promises
var configCloudEnv = require('cloud-env');

var localDataBase = '/cs5610';
var connection_string = configCloudEnv.MONGODB_DB_URL + configCloudEnv.get('APP_NAME', localDataBase);

// Connect to mongodb
var connect = function () {
    mongoose.connect(connection_string);
    console.log("connected to database: " + connection_string);
};
connect();

var db = mongoose.connection;

db.on('error', function(error){
    console.log("Error loading the db - "+ error);
});

db.on('disconnected', connect);