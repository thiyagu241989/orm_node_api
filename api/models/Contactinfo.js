// Contactinfo.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Contactinfo
let Contactinfo = new Schema({
    contactId: {
        type: String
    },
    Address: {
        type: String
    },
    mobile: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'contactinfo'
});

module.exports = mongoose.model('Contact', Contactinfo);