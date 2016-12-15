# The MEAN Seed

The MEAN Seed provides you with a full stack development toolkit.
MEAN is a collection of JavaScript-based technologies:
 — MongoDB
 — Express.js
 — AngularJS
 — Node.js
These technologies is used to develop web applications. From the client and server sides to databases.


## How to run the application
If you have not installed git, npm and note.js, then install them:
> sudo apt-get update
> sudo apt-get install git
> sudo apt-get install npm
> sudo apt-get install nodejs

Clone the program from github
> git clone <url>

Then install dependencies
> npm install

Now you can run the program
> npm start


You can verify that the application is runne by pointing you browser to this location:

http://127.0.0.1:3000/  or   http://localhost:3000/


## Setting up ports IP addresses and database
This seed uses the 'cloud-env' package, to ease the setup of Port, IP and databse adresses.
cloud-env provides a vendor-neutral interface for autoconfiguring your server, allowing it to run on a variety of cloud hosting platforms.
It works by checking the system environment (process.env) for known configuration strings (published by OpenShift, Heroku Modulus), normalizing the results into a well-defined list.

locate and open the file:
> config/config.js

You can change the local port number and ip addess here:
```javascript
    var port = configCloudEnv.get('PORT', 3000);
    var ip = configCloudEnv.get('IP','127.0.0.1');
```


And you can change the name of the local database here:
```
    var localDataBase =  '/security_seed_1';
```



## Testing the servers signup, login (authenticate)

Open up postman, HttpRequester or another program to handle the testing of the RESTfull API of the server.

#### Test if it is possible to sign up:
Post the json object to this address
http://localhost:3000/signup
```
{
	"userName": "test5",
	"password": "test5"
}
```

If Successful you get the following json object back
```
{
    "success": true,
    "msg": "Successful created new user."
}
```


#### Test if it is possible to signin:
Post the json object to this address
http://localhost:3000/signin
```
{
	"userName": "test5",
	"password": "test5"
}
```

If Successful you get the following json back with a web-token
```
{
    "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ5b3Vyc2l0ZS5uZXQiLCJpc3MiOiJ5b3VyY29tcGFueUBzb21ld2hlcmUuY29tIiwiaWF0IjoxNDgxMzc3OTM2LjQ5NCwiZXhwIjoxNDgxMzc5MTM2LjQ5NCwic3ViIjoidGVzdDUifQ.OTMqb7YhXtjY7Itj4irYIgm1_BYfWzr7m06QXBRPdTQ"
}
```

#### Test to see if authentications is working
If using HttpRequester then do the following:
* Click on the tab "Headers"
* From the drop-down list "Name:" chose "Authorization"
* Copy the token "JWT eyJ ..." into the text feild "Value:" and press Add

And make a get request to this address
http://localhost:3000/api/users

![Alt text](HttpRequester_authorization.png "picture of HttpRequester")


#### Configuration of web-token for authentication

locate and open the file:
> config/config.js

locate the code snippet:
```javascript
jwtConfig : {
        secret: "ChangMeToARealSecretOurIWillBeHacked",
        tokenExpirationTime : 60*20, //seconds
        audience: "yoursite.net",
        issuer: "yourcompany@somewhere.com"
    }
```

You should change the values of the jwtConfig object. for example change
the secret and the tokenExpirationTime.
you can read more about the Payload(Claims) on the website below: 


https://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs


#### How to secure a part of a web-site
locate and open the file:
> server.js

locate the two pieces of code:

```
var authenticate = require("./app/routes/authenticate.server.route");
var user = require('./app/routes/user.server.route.js');
var routes = require('./app/routes/index');
```
First: we have to import the modules (see code snippet above)
Then: we registrer the modules as middleware (see code snippet below)

```javascript
    app.use('/', authenticate);
    app.use('/api', user);
    app.use('/', routes);
```

note, when a module is prefixed with the URI path '/api' then this 
module is protected and any attempt to go to any path inside this/these 
modules needs authentication.

