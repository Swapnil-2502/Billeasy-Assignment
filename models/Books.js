const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        trim: true
    },
    author:{
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model('Books', BookSchema);