const Reminder = require("../models/Reminder");

const fetchReminder = async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.user._id });
        return res.status(200).json({
            success: true,
            message: "reminder successfully fetched",
            data: reminders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};

const createReminder = async (req, res) => {
    try {
        const { noteId, remind_at, repeat_interval } = req.body;
        if (!noteId || !remind_at) {
            return res.status(400).json({
                success: false,
                message: "Note ID and remind at date are required",
                error: {
                    code: "NOTEID_AND_REMIND_AT_MUST_BE_INPUTTED",
                    details: "Note ID and remind at date are required"
                }
            });
        }

        const userId = req.user._id;
        const reminder = new Reminder({
            userId,
            noteId,
            remind_at,
            repeat_interval
        });
        await reminder.save();
        return res.status(200).json({
            success: true,
            message: "reminder successfully created",
            data: reminder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};
module.exports = {
    createReminder,
    fetchReminder
};