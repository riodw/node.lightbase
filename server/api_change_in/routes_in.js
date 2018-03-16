/* routes.js */

'use strict'


module.exports = function (
    app,
    path,
    io,
    User
) {

    /*************************************************************
     * CONSTANTS
     *************************************************************/



     /*************************************************************
     * API - SETTERs
     *************************************************************/
    app.post('/api/users/new', (req, res) => {

        if (req.body) {
            var new_user_data = req.body;
            
            var new_user = new User;
            
            new_user.info = {
                date: Date.now(),
                name: {
                    first: new_user_data.name.first,
                    last: new_user_data.name.last,
                },
                email: new_user_data.email,
            }

            console.log(new_user);

            // Save New User
            new_user
            .save()
            .then(() => console.log(new_user));

            res.sendStatus(200);
        }
    });


    app.get('/api/users', (req, res) => {

        User.find({})
        .select({'info.email': 0, '_id': 0, '__v': 0})
        .exec(function(err, data) {
            if (err) throw err;

            if (data) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(data, null, 3));
            }
            // No Data
            else {
                res.status(409).send('No Data');
            }
        });
    });
};


/* END - routes.js */