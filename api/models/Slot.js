// Slot.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Slot
let Slot = new Schema({
    startTime: {
        type: String,
        required: true,

    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'slot'
});

module.exports = mongoose.model('Slot', Slot);