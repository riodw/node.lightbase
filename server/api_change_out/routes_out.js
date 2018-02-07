/* routes_out.js */
'use strict'


module.exports = function (
    app,
    path,
    io,
    fs,
    jf,
    User
) {

    // https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/
    // https://docs.mongodb.com/manual/tutorial/change-streams-example/
    // https://docs.mongodb.com/v3.6/tutorial/change-streams-example/
    // http://plusnconsulting.com/post/MongoDB-Change-Streams/


    /*************************************************************
     * CONSTANTS
     *************************************************************/
    const changeStream = User.watch();
    
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
        User.find({}, {'info': 1, '_id': 0}, (err, data) => {
            if (err) throw err;
    
            if (data) {
                socket.emit('users', data);
            }
        });
        // USERS - Change
        changeStream.on('change', function(change) {
            console.log('changeStream');
            // expect(change).to.exist;
            // client.close();
            // done();
            User.find({}, {'info': 1, '_id': 0}, (err, data) => {
                if (err) throw err;
        
                if (data) {
                    socket.emit('users', data);
                }
            });
    
        });

    });


};
/* END - routes.js */