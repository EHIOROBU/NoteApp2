const mongoose = require("mongoose")
const Reminder = require("./Reminder")
const { required } = require("joi")

const notificationSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    Reminder_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sent_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }
})
const Notification = mongoose.Model('notificationSchema', notificationSchema)
module.exports = Notification