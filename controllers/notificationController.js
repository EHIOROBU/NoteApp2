const Notification = require("../models/notification")

const createNotication = async (req, res) => {
    try {
        const { userId, reminderId, status } = req.body
        const notify = new Notification({
            userId,
            Reminder_id: reminderId,
            status
        })
        await notify.save()
        res.status(200).json(notify)
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }
}
const sendNotification = async (userId, reminderId,) => {
    try {
        const sendNotification = await Notification(userId, reminderId, "sent")
        console.log()
    } catch (error) {

    }
}


module.exports = { createNotication, sendNotification }