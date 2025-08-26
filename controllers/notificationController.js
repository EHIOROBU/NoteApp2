const Notification = require("../models/notification");

const createNotification = async (req, res) => {
    try {
        const { userId, reminderId, status } = req.body;
        const notify = new Notification({
            userId,
            reminderId,
            status
        });
        await notify.save();
        res.status(201).json(notify);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const sendNotification = async (userId, reminderId) => {
    try {
        const notification = new Notification({
            userId,
            reminderId,
            status: "sent"
        });
        await notification.save();
        return notification;
    } catch (error) {
        console.error(error);
    }
};

module.exports = { createNotification, sendNotification };