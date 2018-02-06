/* routes.js */

'use strict'


module.exports = function (
    app,
    path,
    User
) {

    /*************************************************************
     * CONSTANTS
     *************************************************************/



     /*************************************************************
     * API - SETTERs
     *************************************************************/
    app.post('/api/user/new', (req, res) => {
        console.log(req.body);

        
        res.sendStatus(200);
    });


};


/* END - routes.js */