const Joi = require('@hapi/joi');

//Validando questions
const questionValidation = data => {
    const schema = new Joi.object({
        description: Joi.string()
            .required()
            .min(1)
            .max(1000)
    })

    return schema.validate(data);
}

//Validando answers
const answerValidation = data => {
    const schema = new Joi.object({
        description: Joi.string()
            .required()
            .min(1)
            .max(1000)
    })

    return schema.validate(data);
}

//Validando registro
const registerValidation = data => {
    const schema = new Joi.object({
        name: Joi.string()
            .required()
            .min(3)
            .max(20),
        email: Joi.string()
            .required()
            .email()
            .min(6)
            .max(255),
        password: Joi.string()
            .required()
            .min(6)
            .max(255),
        role: Joi.string()
            .required()
    })

    return schema.validate(data);
}

//Validando login
const loginValidation = data => {
    const schema = new Joi.object({
        email: Joi.string()
            .required()
            .email()
            .min(6)
            .max(255),
        password: Joi.string()
            .required()
            .min(6)
            .max(255)
    })

    return schema.validate(data);
}

module.exports.answerValidation = answerValidation;
module.exports.questionValidation = questionValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
