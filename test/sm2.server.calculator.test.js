/**
 * Created by bo on 10/26/16.
 */

'use strict';

var expect = require("chai").expect;
var request = require("request");
var http = require("http");
//var app = require('../../app');
var server;
var TEST_PORT = 3456;


describe("test sm2 algorithm", function() {

    before(function (done) {
        // var app = require('../server');
        // server = http.createServer(app);
        // server.listen(TEST_PORT,function(){
        //     console.log("Test server started "+"\n");
        //     done();
        // });

        var configCloudEnv = require('cloud-env');

        var app = require('../server');
        var port = configCloudEnv.get('PORT', TEST_PORT);
        var ip = configCloudEnv.get('IP', '127.0.0.1');
        app.set('port', port);
        app.set('ip', ip);

        server = http.createServer(app);

        require('../config/db/db');

        server.listen(app.get("port"), app.get("ip"), function () {
            console.log("Server running at http://" + app.get("ip") + ":" + app.get("port") + "/");


            // make room for a test user -----
            var signup = {
                url: "http://localhost:" + TEST_PORT + "/api/signup",
                form: {"userName": "test10"}
            };
            var signin = {
                url: "http://localhost:" + TEST_PORT + "/api/signin",
                form: {"userName": "test10"}
            };


            request.post(signup, function (err, res, body) {

                if(!err) {
                    console.log("signup as: " +body);
                    request.post(signin, function (err, res, body) {
                        if(!err) {
                            console.log("signin as: " + body);
                        }
                    });
                }
            });
            
            
            // insert some data in the database
            
            // var signin = {
            //     url: "http://localhost:" + TEST_PORT + "/api/card",
            //     form: {"userName": "test10"}
            // };
            // var fl = [];
            //
            // fl = flashcards(); //JSON.parse("[{},{}]");
            // fl.forEach(function (item, index) {
            //     var i = cal.calcIntervalEF(item, 3);
            //     console.log(item);
            //     console.log(index);
            // });
            
            
            
            
            done();
        });

        

    }); // End of before

    after(function (done) {
        server.close();
        console.log("Test server closed" + "\n");
        done();
    });


    // describe("GET: /api/dailyExercises", function () {
    //     var options = {
    //         url: "http://localhost:" + TEST_PORT + "/api/dailyExercises",
    //         method: "GET",
    //         json: true
    //     };
    //     it("Should return all the cards", function (done) {
    //         request(options, function (err, res, body) {
    //             var array = body.flashcards;
    //             //expect(array.length).to.have.length.equal(4);
    //             console.log(array);
    //             done();
    //         });
    //     });
    // }); // End of GET :: all




    describe("print flashcard", function () {
       
        var flashcards = require('./testData/flashcards1');
        var cal = require("../app/sm2/spacedRepetition.server.calculator");
        
        it("yahooooooooo", function (done) {
        
            var fl = [];
        
            fl = flashcards(); //JSON.parse("[{},{}]");
            fl.forEach(function (item, index) {
                var i = cal.calcIntervalEF(item, 3);
                console.log(item);
                console.log(index);
            });
          
        
            done();
        });
       
       
    }); // End of GET :: all
    
    

}); // End of test