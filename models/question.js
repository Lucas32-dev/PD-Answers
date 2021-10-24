const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        min: 1,
        max: 1000,
    },
    userId: {
        type: String,
        required: true,
    }
})

module.exports = new mongoose.Model('question', questionSchema);