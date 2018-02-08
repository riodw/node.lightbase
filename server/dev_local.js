/* development.js */
'use strict'


// Get Command Line Input for Running Production Manually
process.argv.forEach(function (val, index, array) {
    // Production CMD
    if (val == 'production') {
        console.log('Command Line == Production');
        ENV = 'production';
        server_IP = '127.0.0.1';
        port = 8080;

        // If Set in Env
        if (process.env.IP)
            server_IP = process.env.IP;
        if (process.env.PORT)
            port = process.env.PORT;

        return;
    }
    // Development Command Line
    if (val == 'development') {
        console.log('Command Line == Development');
        ENV = 'development';
        server_IP = '127.0.0.1';
        port = 8080;

        return;
    }
});


/*
OLD - 
Get all IP's from computer to set Server_IP
*/
// Set IP Address
// var ifaces = os.networkInterfaces();
// Object.keys(ifaces).forEach(function (ifname) {
//     var alias = 0;

//     ifaces[ifname].forEach(function (iface) {
//         if ('IPv4' !== iface.family || iface.internal !== false) {
//             // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//             return;
//         }
//         if (alias >= 1) {
//             // this single interface has multiple ipv4 addresses
//             console.log(ifname + ':' + alias, iface.address);
//             throw "Error: " +
//                 "There are multiple IPV4 addresses. You must hard code the the IP address.";
//         } else {
//             // this interface has only one ipv4 adress
//             console.log(ifname, iface.address);
//             // Setting IP
//             server_IP = iface.address;
//         }
//         ++alias;
//     });
// });


/* END - development.js */