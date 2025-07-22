const Reminder = require("../models/Reminder")

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
        res.send(error.message)
    }
}
const fetchReminder = async (req, res) => {
    try {
        const getReminders = await Reminder.find({userId: req.decoded._id})
        return res.status(200).json(getReminders) 
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {
    createReminder,
    fetchReminder
}