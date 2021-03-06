const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        min: 1,
        max: 1000,
    },
    questionId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
})

module.exports = new mongoose.model('answer', answerSchema);