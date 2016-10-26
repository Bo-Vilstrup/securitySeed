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


before(function(done){
    // var app = require('../server');
    // server = http.createServer(app);
    // server.listen(TEST_PORT,function(){
    //     console.log("Test server started "+"\n");
    //     done();
    // });
    
    var configCloudEnv = require('cloud-env');

    var app = require('../server');
    var port = configCloudEnv.get('PORT', TEST_PORT);
    var ip = configCloudEnv.get('IP','127.0.0.1');
    app.set('port', port);
    app.set('ip', ip);
    
    server = http.createServer(app);
    
    require('../config/db/db');
    
    server.listen(app.get("port"),app.get("ip"), function () {
        console.log("Server running at http://" + app.get("ip") + ":" + app.get("port") + "/" );
        done();
    });
});

after(function(done){
    server.close();
    console.log("Test server closed"+"\n");
    done();
});


describe("GET: /api/dailyExercises", function() {
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/dailyExercises",
        method: "GET",
        json: true
    };
    it("Should return all the cards" ,function(done) {
        request(options, function(err, res, body) {
            var array = body.user;
            //expect(array.length).to.have.length.equal(4);
            console.log(array);
            done();
        });
    });
}); // End of GET :: all