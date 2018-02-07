// database.js
'use strict';


module.exports = function (server_IP) {
    return {
        // 'url': 'mongodb://' + server_IP
        'url': 'mongodb://localhost'
    };
};
// END - database.js