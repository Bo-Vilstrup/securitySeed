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




## Best practice
Follow the link below to read more about best practice to gain performance
> https://expressjs.com/en/advanced/best-practice-performance.html

Follow the link below to read more about best practice of getting secure
>https://expressjs.com/en/advanced/best-practice-security.html

#### More on best practice 

Ensure your dependencies are secure

Using npm to manage your application’s dependencies is powerful and 
convenient. But the packages that you use may contain critical security 
vulnerabilities that could also affect your application. The security of 
your app is only as strong as the “weakest link” in your dependencies.

Use either or both of the following two tools to help ensure the security 
of third-party packages that you use: nsp and requireSafe. These two tools 
do largely the same thing.

nsp is a command-line tool that checks the Node Security Project 
vulnerability database to determine if your application uses packages 
with known vulnerabilities. Install it as follows:

> npm install nsp -g

Use this command to submit the npm-shrinkwrap.json / package.json files for validation to nodesecurity.io:

> nsp check

Here’s how to use requireSafe to audit your Node modules:

> npm install -g requiresafe
> cd your-app
> requiresafe check


#### More on securety



## Deploy

Go to Openshift and create a new gear with:
> node
> mongoDB

In this example  we will let OPENSHIFT create the
infrastructure for a Node application and then commit and push our code 
to the repository provided by OPENSHIFT.
When the application has been created, OPENSHIFT provides you with a URL
which you can use to clone the "start code" for the demo-page OPENSHIFT 
has created (we will just delete this code).

> git clone ssh://585320382d527143f4000030@securemeanseed-vilstrup.rhcloud.com/~/git/securemeanseed.git/
> cd securemeanseed/

Delete all files except (see below)
> .git
> .openshift

Open a terminal somewhere on your system and copy/paste the clone information
given by OPENSHIFT into the terminal and execute the statements.
Open the folder and delete all files related to the sample node-project created by
OPENSHIFT as sketched to the right.
Now copy ALL files/folders from your express project into this folder and do:

> Git add .
> Git commit -m "initial commit"
> Git push

