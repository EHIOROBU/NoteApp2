const Reminder = require("../models/Reminder");

const fetchReminder = async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.user._id });
        return res.status(200).json(reminders);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const createReminder = async (req, res) => {
    try {
        const { noteId, remind_at, repeat_interval } = req.body;
        if (!noteId || !remind_at) {
            return res.status(400).send("Note ID and remind at date are required");
        }

        const userId = req.user._id;
        const reminder = new Reminder({
            userId,
            noteId,
            remind_at,
            repeat_interval
        });
        await reminder.save();
        res.status(201).send(reminder);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = {
    createReminder,
    fetchReminder
};