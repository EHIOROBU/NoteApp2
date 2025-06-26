const jwt = require("jsonwebtoken")
const Remind = require("../models/Note")


const createReminder = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        userId = decoded._id
        console.log(decoded)
        console.log(decoded)
        const remind = new Remind({
            userId,
            noteId: req.body.noteId,
            remind_at: req.body.remind_at,
            repeat_interval: req.body.repeat_interval
        })
        console.log(remind)
        await remind.save()
        return res.send({ remind })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {
    createReminder
}