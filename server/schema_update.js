// schema_update.js
'use strict'


/*************************************************************
 * IMPORT MODULES
 *************************************************************/
const mongoose = require('mongoose');

const uuidv1 = require('uuid/v1');

/*************************************************************
 * SCHEMA - User
 *************************************************************/
var Schema = mongoose.Schema;

/*************************************************************
 * MONGOOSE MODELS
 *************************************************************/
/* USER - From User */
var User = require('./models/user.js').User;

var Composer = require('./models/composer.js').Composer;


/*************************************************************
 * MODULE FUNCTIONS
 *************************************************************/
function schema_update() {
    return 0;
}

// Update All Users
function updateUser() {
    var totalUpdated = 0;

    // http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
    // https://stackoverflow.com/questions/43070692/update-schema-in-mongoose-to-add-new-property
    // https://docs.mongodb.com/manual/reference/method/db.collection.update/

    User.find({}, function (err, data) {
        if (err) throw err;

        if (data == null) {
            console.log('schema_update: No Users Found');
        }
        // Data Found
        else {
            var users = data;
            var totalUpdated = 0;

            // For Each User in Database
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                // Track if changed
                var updated = false;

                // user.local.user.info.uuid
                // ======================================================
                // if (!user.info.uuid) {
                //     // Set uuid
                //     user.info.uuid = uuidv1();
                //     updated = true;
                //     totalUpdated++;
                // }


                // If Changed
                if (updated) {
                    user.markModified('info');
                    // Save User
                    user.save(function (err, data) {
                        if (err) throw err;
                    });
                }
            }
            console.log('schema_update - Users - Updated: ' + totalUpdated);
        }
    });
}

function createComposer() {

    var composer = new Composer;

    var posts = [
        {
            "name": "post",
            "types": [
                "text",
                "photo",
                "link",
                "file"
            ]
        },
        {
            "name": "log",
            "types": [
                "hours",
                "case"
            ]
        },
        {
            "name": "event",
            "types": [
                "conference"
            ]
        },
        {
            "name": "report",
            "types": [
                "demographics"
            ]
        }
    ]

    for (var i=0; i < posts.length; i++) {
        composer.posts.push(posts[i]);
    }

    composer.home = {
        "composer": {
            "active_post_type": "post",
            "active_post_sub_type": "text",
            "place_holder": "New Post...",
            "show_text_input": true,

            "post_types": {
                "post": {
                    "default_option": "text",
                    "options": {
                        "text": {
                            "icon": "fas fa-comment",
                            "place_holder": "New Post..."
                        },
                        "photo": {
                            "icon": "fas fa-image",
                            "place_holder": "Drag Photo here..."
                        },
                        "link": {
                            "icon": "fas fa-link",
                            "place_holder": "Paste Link..."
                        },
                        "file": {
                            "icon": "fas fa-file",
                            "place_holder": "Drag File here..."
                        },
                        "": {
                            "color": "info",
                            "icon": "fas fa-ellipsis-h",
                            "place_holder": "New Post..."
                        }
                    }
                },
                "log": {
                    "default_option": "hours",
                    "options": {
                        "hours": {
                            "icon": "fas fa-clock",
                            "place_holder": "New Post..."
                        },
                        "case": {
                            "icon": "fas fa-heartbeat",
                            "place_holder": "Search Cases...",
                            "select_all": [{
                                    "name": "Abdominal Paracentesis",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Advanced Cardiac Life Support",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Antinuclear Antibody",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Arterial Blood Gas",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Arterial Line Placement",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Bad Cholesterol Test (Cholesterol Test)",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Biopsy of Skin",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Central Line Placement",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Chest Tube",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "EKG Interpretation",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Endotracheal Intubation",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Flouroscopy",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "IV Line Placement",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Laceration repair",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Lumbar Puncture",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "PAP Smear",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Pelvic Exam",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Template X",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Thoracentesis",
                                    "image": "fas fa-image"
                                }
                            ],
                            "select": [{
                                    "name": "Abdominal Paracentesis",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Advanced Cardiac Life Support",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Antinuclear Antibody",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Arterial Blood Gas",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Arterial Line Placement",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Bad Cholesterol Test (Cholesterol Test)",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Biopsy of Skin",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Central Line Placement",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Chest Tube",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "EKG Interpretation",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Endotracheal Intubation",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Flouroscopy",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "IV Line Placement",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Laceration repair",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Lumbar Puncture",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "PAP Smear",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Pelvic Exam",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Template X",
                                    "image": "fas fa-image"
                                },
                                {
                                    "name": "Thoracentesis",
                                    "image": "fas fa-image"
                                }
                            ]
                        },
                        "": {
                            "color": "info",
                            "icon": "fas fa-ellipsis-h"
                        }
                    }
                },
                "event": {
                    "default_option": "conference",
                    "options": {
                        "conference": {
                            "icon": "fas fa-clock",
                            "place_holder": "New Post..."
                        }
                    }
                },
                "report": {
                    "default_option": "demographics",
                    "options": {
                        "demographics": {
                            "icon": "fas fa-clock",
                            "place_holder": "New Post..."
                        }
                    }
                }
            }
        }
    }

    // Save Composer
    composer
        .save()
        .then(() => console.log(composer));
}



// Update Users
schema_update.updateUser = updateUser;
// Update Composer
schema_update.createComposer = createComposer;

module.exports = schema_update;