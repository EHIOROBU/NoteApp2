const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    reminderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Reminder"
    },
    status: {
        type: String,
        required: true,
        enum: ['sent', 'read', 'dismissed']
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;