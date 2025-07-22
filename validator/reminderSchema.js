const joi = require("joi")

const reminderSchema = joi.object({
    noteId: joi.string()
        .required()
        .messages({
            'string.empty': "noteId is required"
        }),
    remind_at: joi.date()
        .required()
        .messages({
            'string.empty': "remind_At is required"
        }),
    repeat_interval: joi.date()
        .required()
        .messages({
            'string.empty': "repeat interval is required"
        })
})

const RemindMe = (data) => {
    return reminderSchema.validate(data)
}
module.exports = RemindMe;