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
        return res.status(200).json({
            success: true,
            message: "Notification successfully created",
            data: notify
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


module.exports = { createNotification };