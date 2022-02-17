const Joi = require('joi');

const bodySchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.number().required()
});
module.exports = bodySchema;