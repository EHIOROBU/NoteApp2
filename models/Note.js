const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String]
    }
})

const Note = mongoose.model("note", noteSchema)
module.exports = Note