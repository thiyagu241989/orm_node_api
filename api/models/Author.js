// Author.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Author
let Author = new Schema({
    authId: {
        type: String
    },
    authName: {
        type: String
    },
    age: {
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
    collection: 'author'
});

module.exports = mongoose.model('Author', Author);