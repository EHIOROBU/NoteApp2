const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
          ref: "User"
    },
    Reminder_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
          ref: "Reminder"
    },
    sent_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['sent', 'read', 'dismissed']
    }
})
const Notification = mongoose.model('notification', notificationSchema)

module.exports = Notification