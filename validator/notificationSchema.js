const { status } = require("express/lib/response");
const joi = require("joi")

const notificationSchema = joi.object({
    userId: joi.string()
        .required()
        .messages({
            'string.empty': "userId is required"
        }),
    reminder_id: joi.date()
        .required()
        .messages({
            'string.empty': "reminder_At is required"
        }),
    status: joi.date()
        .required()
        .messages({
            'string.empty': "repeat interval is required"
        })
})

const notify = (data) => {
    return notificationSchema.validate(data)
}
module.exports = notify;