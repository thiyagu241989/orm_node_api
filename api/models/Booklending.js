// Booklending.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Booklending
let Booklending = new Schema({
    bklendId: {
        type: String
    },
    book: {
        type: String
    },
	date: {
        type: Date,
        default: Date.now
    },
    lendingBy: {
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
    collection: 'booklending'
});

module.exports = mongoose.model('Booklending', Booklending);