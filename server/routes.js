// routes.js
'use strict'


module.exports = function (
    app,
    path,
    io,
    fs,
    jf,
    User
) {

    /*************************************************************
     * CONSTANTS
     *************************************************************/
    var filePath = path.join(__dirname + '/../server/');
    console.log(filePath);

    /*************************************************************
     * SHOW MAIN PAGE
     *************************************************************/
    app.get('/', (req, res) => {

        res.render(views_path + 'index', {
            'ENV': ENV,
            'ROOT_HOST': ROOT_HOST,
            'year': new Date().getFullYear(),
            'server_start_time': server_start_time,
            'server_current_time': new Date().toString()
        });
    });

    /*************************************************************
     * ENV
     *************************************************************/
    app.get('/ENV', (req, res) => {
        // Send Environment
        res.send(ENV);
    });


    /*************************************************************
     * LOAD HOME
     *************************************************************/
    app.get('/home', (req, res) => {

        // DANGER
        // res.redirect('/');
        // res.sendFile(views_path + 'app-' + ENV + '.html');
        res.render(views_path + 'app', {
            'ENV': ENV,
            'ROOT_HOST': ROOT_HOST,
            'year': new Date().getFullYear(),
            'server_commit_sha': server_commit_sha,
            'server_start_time': server_start_time,
            'server_current_time': new Date().toString()
        });
    });



    /*************************************************************
     * API - SETTERs
     *************************************************************/
    app.post('/api/test/', (req, res) => {
        console.log(req.body);
        res.sendStatus(200);
    });



    /*************************************************************
     * SOCKET IO
     *************************************************************/


    // Socket Connection
    io.on('connection', function (socket) {
        console.log('Connection!');

        // // Get (user.json) Data
        // jf.readFile(filePath + 'users.json', function (err, data) {
        //     socket.emit('users', data);
        // });
        // Get (posts.json) Data
        jf.readFile(filePath + 'posts.json', function (err, data) {
            socket.emit('posts', data);
        });



        /* UPDATES */

        // Watch For (user.json) File Update
        fs.watch(filePath + 'users.json', function (event, fileName) {
            console.log("Watch (users.json)");
            // watching my users.json file for any changes
            // NOTE: fs.watch returns event twice on detecting change due to reason that editors fire 2 events --- there are workarounds for this on stackoverflow

            // Get Data
            jf.readFile(filePath + 'users.json', function (err, data) {
                // if change detected read the users.json

                // Send Data
                // emit to all clients
                socket.emit('users', data);
            });

        });

        // Watch For (posts.json) File Update
        fs.watch(filePath + 'posts.json', function (event, fileName) {
            console.log("Watch (posts.json)");
            // watching my users.json file for any changes
            // NOTE: fs.watch returns event twice on detecting change due to reason that editors fire 2 events --- there are workarounds for this on stackoverflow

            // Get Data
            jf.readFile(filePath + 'posts.json', function (err, data) {
                // if change detected read the users.json

                // Send Data
                // emit to all clients
                socket.emit('posts', data);
            });

        });



    });



};
// END - routes.js