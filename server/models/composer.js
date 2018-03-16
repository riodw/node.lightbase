// user.js
'use strict';


/*************************************************************
 * IMPORT MODULES
 *************************************************************/
const mongoose = require('mongoose');


/*************************************************************
 * SCHEMA - User
 *************************************************************/
var Schema = mongoose.Schema;

var composerSchema = mongoose.Schema({
    posts: [
        {
            name: {type: String, required: true},
            types: []
        }
    ],
    home: Schema.Types.Mixed
});

var Composer = mongoose.model('Composer', composerSchema);

var Models = {
    Composer: Composer
};

module.exports = Models;
// END - user.js