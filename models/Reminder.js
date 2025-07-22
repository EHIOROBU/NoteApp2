const mongoose = require("mongoose")


const remindMeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    noteId: {
        type: String,
        required: true,
        ref: "Note"
    },
    remind_at: {
        type: Date,
        required: true
    },
    repeat_interval: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean,
        default: true
    }
})
const Reminder = mongoose.model('reminder', remindMeSchema)
module.exports = Reminder;