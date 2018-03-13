/* server.js */
// jr1i%9tc7*9611zsx31%
'use strict'


console.log('*************************************');
/*************************************************************
 * IMPORT MODULES
 *************************************************************/
/* 
 * 
 *  */

/* HTTP
 * Native NodeJS module designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses--the user is able to stream data.
 * https://nodejs.org/api/http.html#http_http */
const http = require('http');

const https = require('https');

/* console.table
 * Adds console.table method for convenience
 * https://www.npmjs.com/package/console.table */
const cTable = require('console.table');

/* OS
 * The os module provides a number of operating system-related utility methods.
 * https://nodejs.org/api/os.html#os_os */
const os = require('os');

/* File System
 * The Node.js file system module allow you to work with the file system on your computer.
 * https://nodejs.org/api/fs.html#fs_file_system */
const fs = require('fs');

/* Path
 * Native NodeJS module for resolving file and directory paths.
 * https://nodejs.org/api/path.html#path_path */
const path = require('path');

/* Child Process
 * provides the ability to spawn child processes
 * https://nodejs.org/api/child_process.html */
const { spawn } = require('child_process');



/* express
 * Fast, unopinionated, minimalist web framework for Node.js
 * https://expressjs.com */
const express = require('express');

/** cookie-parser
 * Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 * https://github.com/expressjs/cookie-parser */
const cookie_parser = require('cookie-parser');

/* body-parser
 * Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 * https://github.com/expressjs/body-parser */
const body_parser = require('body-parser');

/* method-override
 * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
 * https://github.com/expressjs/method-override */
const method_override = require('method-override');

/** express-session
 * Manage Express Sessions
 * https://github.com/expressjs/multergithub.com/expressjs/session */
const session = require('express-session');

/** connect-mongo
 * MongoDB session store for Connect and Express
 * https://github.com/jdesboeufs/connect-mongo */
const connect_mongo = require('connect-mongo')(session);

/** mongoose
 * elegant mongodb object modeling for node.js
 * http://mongoosejs.com */
const mongoose = require('mongoose');

/** moment
 * arse, validate, manipulate, and display dates and times.
 * https://momentjs.com/docs/ */
const moment = require('moment');

/** socket.io
 * elegant mongodb object modeling for node.js
 * https://www.npmjs.com/package/socket.io */
const socketio = require('socket.io');

/** jsonfile
 * Writing JSON.stringify() and then fs.writeFile() and JSON.parse() with fs.readFile() enclosed in try/catch blocks became annoying.
 * https://www.npmjs.com/package/jsonfile */
const jf = require('jsonfile');

/** uuid
 * Simple, fast generation of RFC4122 UUIDS. (Universally Unique Identifier)
 * https://github.com/kelektiv/node-uuid */
const uuidv1 = require('uuid/v1');

/** ejs
 * EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
 * http://ejs.co/#docs */
const ejs = require('ejs');



/*************************************************************
 * GLOBAL VARIABLES
 *************************************************************/
// Environment
global.ENV = process.env.ENV || '';
// Server IP
global.server_IP = process.env.IP || '127.0.0.1';
// Server Port
global.port = process.env.PORT || 8080;
// Server Startup Time
global.server_start_time = new Date().toString();

// Commit Hash
global.server_commit_sha = 'N/A';
// Commit Branch
global.server_commit_branch = 'N/A';

// Database Exists
// sudo mongod --replSet rs0
global.DB = process.env.DB || 'true';
global.database_url = 'mongodb://localhost';
// global.database_url = 'mongodb://lightbase:jr1i%259tc7*9611zsx31%25@ds229648.mlab.com:29648/lightbase';

// absolute path to views
global.views_path = path.join(__dirname + '/client/views/');


// Production Server
if (ENV == 'production') {
    console.log('ENV == production');
    ENV = 'production';
    console.log(server_IP);
    
    /*************************************************************
     * GET SERVER CONFIG SETTINGS serverConfig.json
     *************************************************************/
    var serverConfig = require('./serverConfig.json');
    console.log('\n(serverConfig.json):');
    console.table(serverConfig);
}
// Development Server
else if (ENV == 'development') {
    console.log('ENV == development');
    ENV = 'development';
    require('./server/dev_local.js');
}
// Local Server
else {
    console.log('ENV == local');
    ENV = 'local';
    require('./server/dev_local.js');

    // Commit Branch
    server_commit_branch = require('child_process')
    .execSync("git branch | grep \\* | cut -d ' ' -f2").toString().trim();
    console.log('BRANCH == ' + server_commit_branch);

    // Commit Hash
    server_commit_sha = require('child_process')
    .execSync('git rev-parse HEAD').toString().trim();
}



/*************************************************************
 * DEFINE APP
 *************************************************************/
var app = express();


/*************************************************************
 * DEFINE SERVER
 *************************************************************/
var server = http.createServer(app);
// var server_https = https.createServer(app);

// var http_app = express();

// -----------------------------
var io = socketio.listen(server);


/*************************************************************
 * USE MIDDLEWARE 
 *************************************************************/
app.use(express.static(path.resolve(__dirname, 'client')));

/* Use Cookie Parser */
app.use(cookie_parser());

/* Body Parser  */
app.use(body_parser.json());

/* Use Method Override  */
app.use(method_override());

//-------------- Raven ------------------
if (ENV == 'production') {
    // Must configure Raven before doing anything else with it
    var raven_dns = 'URL';
    Raven.config(raven_dns).install();
    // The request handler must be the first middleware on the app
    app.use(Raven.requestHandler());
}



// Connect to DB
if (DB == 'true') {
    // Database Marked to exist
    console.log('DB == true');
    /*************************************************************
     * CONNECT TO MONGODB
     *************************************************************/
    var configDB = require('./server/database.js')(database_url);
    // DISABLE DATABASE
    mongoose.connect(configDB.url, function(err, db) {
            if(err) {
                console.log("ERROR: unable to connect to Database: " + err);
                return;
            }
            console.log('DB CONNECTED.');
        })
}


// Cookie Expiration time
var hour = 3600000;
// cookie_ttl    seconds   hours   days   weeks    months   years
var cookie_ttl = hour *    24 *    7 *    4 *      12 *     1;

// Define Session
if (DB == 'true') {
    app.use(
        session({
            secret: 'securedsession',
            saveUninitialized: true,
            resave: true,
            cookie: {
                maxAge: cookie_ttl
            },
            store: new connect_mongo({
                mongooseConnection: mongoose.connection,
                ttl: 14 * 24 * 60 * 60
            })
        })
    );
}
else {
    console.log('DB == false');
    app.use(
        session({
            secret: 'securedsession',
            saveUninitialized: true,
            resave: true,
            cookie: {
                maxAge: cookie_ttl
            }
        })
    );
}


/*************************************************************
 * Enable CORS (Cross-Origin Resource Sharing)
 * https://enable-cors.org/server_expressjs.html
 *************************************************************/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});


// set the view engine to ejs
app.set('view engine', 'ejs');

/*
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 ************************* MAIN ****************************
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
*/

// Force WWW.
if (ENV == 'production') {
    
    app.use((req, res, next) => {
        if (req.get('Host') === 'example.com') {
            // Redirect
            return res.redirect(301, 'https://www.example.com' + req.originalUrl);
        }
        return next();
    });
}


/*************************************************************
 * GENERAL FUNCTIONS
 *************************************************************/
require('./server/generalFunctions.js');

/*************************************************************
 * SERVER LOGGING - (req))
 *************************************************************/
var serverLog = require('./server/server_log.js');

// Log All Requests
app.use((req, res, next) => {

    serverLog.log(req, {});
    return next();
});


/*************************************************************
 * MONGOOSE MODELS
 *************************************************************/
/* USER - From User */
var User = require('./server/models/user.js').User;


//==========================================================
/*************************************************************
 * DATABASE SCHEMA UPDATES
 *************************************************************/
// var schema_update = require('./server/schema_update.js');
// schema_update.updateUser();
//===========================================================


/*
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 *********************** URL ROUTES ************************
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
*/

/*************************************************************
 * URL ROUTES
 *************************************************************/
require('./server/routes.js')(
    app,
    path,
    io,
    fs,
    jf,
    User
);

/*************************************************************
 * API CHANGE IN
 *************************************************************/
require('./server/api_change_in/routes_in.js')(
    app,
    path,
    io,
    User
);

/*************************************************************
 * API CHANGE OUT
 *************************************************************/
require('./server/api_change_out/routes_out.js')(
    app,
    path,
    io,
    fs,
    jf,
    User
);


/*************************************************************
 * Request Global
 *************************************************************/

// Final Redirect Catch All
app.all('/*', (req, res) => {

    return res.redirect('/');
});

/*************************************************************
 * MAKE SERVER
 *************************************************************/
// Catch All HTTP and Force HTTPS
// http_app.all('*', (req, res) => {

//     return res.redirect(301, '/');
// });


//-------------- SENTRY.io : Raven  -------------------
if (ENV == 'production') {
    // Optional fallthrough error handler
    app.use(function onError(err, req, res, next) {
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
        res.statusCode = 500;
        res.end(res.sentry + '\n');
    });
}



/*
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 ********************** START SERVER ***********************
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
*/

// For Local Server Creation
if (ENV == 'local') {

    server.listen(port, function () {
        console.log("\nSERVER RUNNING AT.... http://", server_IP + ":" + port);
    });
}


// Development Server Creation
if (ENV == 'development') {

    server.listen(port, function () {
        console.log("\nSERVER RUNNING AT.... http://", server_IP + ":" + port);
    });
}


// Production Server Creation
// if (ENV == 'production') {

//     /*************************************************************
//      * TLS - https
//      *************************************************************/
//     var options = {
//         key: fs.readFileSync('./server/SSL/file.key'),
//         cert: fs.readFileSync('./server/SSL/file.pem'),
//     };

//     // Create HTTPS Server    
//     server_https.listen(8443, function () {
//         console.log("\nSERVER RUNNING AT.... http://", server_IP + ":" + 8443);
//     });


//     // Create Forwarding All to HTTPS on Production Server
//     http.createServer(http_app).listen(port, function () {
//         console.log('SERVER RUNNING.... http://' + server_IP + ':' + port);
//     });
// }

/* END - server.js */