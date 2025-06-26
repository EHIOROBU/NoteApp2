const joi = require("joi")

const noteValidationSchema = joi.object({
    title: joi.string()
        .required()
        .messages({
            'string.empty': "title is required"
        }),

    content: joi.string()
        .required()
        .messages({
            'string.base': "this content should be String",
            'string.empty': "please content is required"
        }),
    tags: joi.array()
        .items(joi.string())
        .messages({
            'array.base': "all tags should be array",
            'string.base': "all tags should be string"
        })
})

const validateNote = (data) =>{
    return noteValidationSchema.validate(data)
}

module.exports = validateNote