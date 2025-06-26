const Joi = require("joi");


const userValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': "username should be string",
        'string.empty': "username should be require"
    }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': "use a valid email ",
            'string.empty': "email is required"
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Use a minimum of 8 password characters',
            'string.empty': 'Password is required',
        }),
});
const LoginValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': "use valid email",
            'string.empty': "email is required"
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': "password is required"
        })
})
const validateUser = (data) => {
    return userValidationSchema.validate(data);
};
const validateLogin = (data) => {
    return LoginValidationSchema.validate(data)
}

module.exports = { validateUser, validateLogin }