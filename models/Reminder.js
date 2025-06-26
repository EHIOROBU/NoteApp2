const mongoose = require("mongoose")


const remindMeSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
        ref: "User"
    },
    noteId: {
        type: String,
        required: true,
        ref: "Note"
    },
    remind_at:{
        type: Date,
        required: true
    },
    repeat_interval: {
        type: String,
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    is_active:{
        type: Boolean,
        default: true
    }
})
const Remind = mongoose.model('remind', remindMeSchema)
module.exports = Remind;