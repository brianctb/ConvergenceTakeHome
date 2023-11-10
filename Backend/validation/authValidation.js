const Joi = require('joi');

//a schema for signing up for reference although not included in the take home assessment
const signUpSchema = Joi.object({
    username: Joi.string().alphanum.min(5).max(10).required(),
    //require at least 1 upper case, 1 lower case letter, 1 number, 1 symbol, at least 8 length long
    password: Joi.string().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-]).{8,}$')).required()
})

const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required()
})

module.exports = {
    signUpSchema,
    loginSchema
}

