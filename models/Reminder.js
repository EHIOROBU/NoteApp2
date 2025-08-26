const mongoose = require("mongoose");

const remindMeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Note"
    },
    remind_at: {
        type: Date,
        required: true
    },
    repeat_interval: {
        type: String,
        enum: ["daily", "weekly", "monthly"] // Add validation for repeat interval
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Automatically handle createdAt and updatedAt fields
});

const Reminder = mongoose.model('Reminder', remindMeSchema);
module.exports = Reminder;