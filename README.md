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
http://127.0.0.1:3000/

or

http://localhost:3000/


Setting up ports IP addresses and database
This seed uses the 'cloud-env' package, to ease the setup of Port, IP and databse adresses.
cloud-env provides a vendor-neutral interface for autoconfiguring your server, allowing it to run on a variety of cloud hosting platforms.
It works by checking the system environment (process.env) for known configuration strings (published by OpenShift, Heroku Modulus), normalizing the results into a well-defined list.

locate and open the file:
> config/config.js

You can change the local port number and ip addess here:
> var port = configCloudEnv.get('PORT', 3000);
> var ip = configCloudEnv.get('IP','127.0.0.1');

And you can change the name of the local database here:
> var localDataBase =  '/security_seed_1';



## I have added the following things to the express-generator seed:

#### A new directory structure:

- app (new)
    - controllers (new)
    - models (new)
    - routes (moved)
    - views (moved)


#### Refactor -> Renamed app.js to server.js

#### Changes made to server.js

```javascript
 // view engine setup
    app.set('views', path.join(__dirname, 'views'));
```

Changed to:
 
```javascript
 // view engine setup
    app.set('views', path.join(__dirname, 'app/views'));
```


#### add gitignore file

#### change package.json

    By default, OpenShift does not start the server via npm start, so you need to add the following statement,
    "main": "./bin/www", to your package.json file as sketched below:
    "scripts": {
    "start": "node ./bin/www"
    },
    "main" : "./bin/www",
    
    
    "test": "node_modules/.bin/mocha -w"

#### Change bin/www

Open the bin\www file and replace these lines:
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

with:

    var config = require('cloud-env');
    
    var port = config.PORT;
    app.set('port', port);
    var ip = config.IP;
    app.set('ip', ip);

Now localize the line that starts the server : server.listen(port); and replace it with this:
server.listen(port, ip);


#### change server.js

    npm install cors --save
    
    var cors = require('cors');
    app.use(cors());

### change bin/www

```javascript
    var connection_string = configCloudEnv.MONGODB_DB_URL + configCloudEnv.get('APP_NAME', '/cs5610');
    
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
```


MongoDB 2.4 database added.  Please make note of these credentials:

   Root User:     admin
   Root Password: gLqg5Z_69VsV
   Database Name: nodeserver

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
