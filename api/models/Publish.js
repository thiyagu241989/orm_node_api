// Publish.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Publish
let Publish = new Schema({
    pubId: {
        type: String
    },
    PublishName: {
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
    collection: 'publish'
});

module.exports = mongoose.model('Publish', Publish);