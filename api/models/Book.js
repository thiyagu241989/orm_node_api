// Book.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Book
let Book = new Schema({
    bkId: {
        type: String
    },
    bookName: {
        type: String
    },
    category: {
        type: String
    },
    author: {
        type: Array,
        default: null
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
    collection: 'book'
});

module.exports = mongoose.model('Book', Book);