const Reminder = require("../models/Reminder")

const fetchReminder = async (req, res) => {
    console.log(fetchReminder)
    try {
        const reminders = await Reminder.find({ userId: req.user._id })
        return res.json(reminders)
    } catch (error) {
         return res.send(error.message)
        // console.log(error)
    }
}

const createReminder = async (req, res) => {
    try {
        const userId = req.user._id;
        const reminder = new Reminder({
            userId,
            noteId: req.body.noteId,
            remind_at: req.body.remind_at,
            repeat_interval: req.body.repeat_interval
        })
        console.log(reminder)
        await reminder.save()
        res.send(reminder)
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {
    createReminder,
    fetchReminder
}