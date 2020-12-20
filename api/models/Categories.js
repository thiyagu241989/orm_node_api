// Categories.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Categories
let Categories = new Schema({
    catId: {
        type: String
    },
    catName: {
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
    collection: 'categories'
});

module.exports = mongoose.model('Categories', Categories);