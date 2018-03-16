/* routes_out.js */
'use strict'


module.exports = function (
    app,
    path,
    io,
    fs,
    jf
) {

    // https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/
    // https://docs.mongodb.com/manual/tutorial/change-streams-example/
    // https://docs.mongodb.com/v3.6/tutorial/change-streams-example/
    // http://plusnconsulting.com/post/MongoDB-Change-Streams/

    var User = require('../models/user.js').User;

    var Composer = require('../models/composer.js').Composer;


    /*************************************************************
     * CONSTANTS
     *************************************************************/
    var changeStream = {
        user: User.watch(),
        composer: Composer.watch()
    }

    
    
    // Watch For Changes
    // changeStream.next(function(err, next) {
    //     if (err) return console.log(err);
    //     expect(err).to.equal(null);
    //     expect(next).to.exist;
    //     client.close();
    //     done();
    // });


    // Socket Connection
    io.on('connection', function (socket) {
        console.log('Connection!');
        
        // USERS - Emit
        User.find({}, {'_id': 0}, (err, data) => {
            if (err) throw err;
    
            if (data) {
                socket.emit('users', data);
            }
        });
        // USERS - Change
        changeStream.user.on('change', function(change) {
            console.log('changeStream');
            // expect(change).to.exist;
            // client.close();
            // done();
            User.find({}, {'_id': 0}, (err, data) => {
                if (err) throw err;
        
                if (data) {
                    socket.emit('users', data);
                }
            });
        });
    });


    // Socket Connection
    io.on('connection', function (socket) {
        console.log('Connection!');
        
        // composer - Emit
        Composer.find({}, {'_id': 0}, (err, data) => {
            if (err) throw err;
    
            if (data) {
                console.log(data[0]);
                socket.emit('composer', data[0]);
            }
        });

        // composer - Change
        changeStream.composer.on('change', function(change) {
            console.log('changeStream');
            // expect(change).to.exist;
            // client.close();
            // done();
            Composer.find({}, {'_id': 0}, (err, data) => {
                if (err) throw err;
        
                if (data) {
                    socket.emit('composer', data[0]);
                }
            });
        });
    });


};
/* END - routes.js */