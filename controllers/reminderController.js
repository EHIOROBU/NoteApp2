const jwt = require("jsonwebtoken")
const Reminder = require("../models/Reminder")


const createReminder = async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        userId = decoded._id
        console.log(decoded)

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
const fetchReminder = async (req, res)=>{
try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    userId = decoded._id

    const getreminder = await Reminder.find({userId})
    res.status(200).json(getreminder)

} catch (error) {
    res.send(error.message)
}
}

module.exports = {
    createReminder,
    fetchReminder
}