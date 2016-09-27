/**
 * Created by bo on 9/26/16.
 */
'use strict';

// Bring Mongoose into the app
var mongoose = require('mongoose');

// removes warning about promises
//mongoose.Promise = global.Promise;

// Bring cloud-env into the app :: 
// cloud-env provides a vendor-neutral interface for autoconfiguring your server,
// allowing it to run on a variety of cloud hosting platforms.
var configCloudEnv = require('cloud-env');

// Name of local database
var localDataBase = '/cs5610';
// Build the connection string
var dbURI = configCloudEnv.MONGODB_DB_URL + configCloudEnv.get('APP_NAME', localDataBase);


// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS ::
// For example :: require('./../model/team');