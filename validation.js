const Joi = require('@hapi/joi');

//Validando questions
const questionValidation = data => {
    const schema = new Joi.object({
        description: Joi.string()
            .required()
            .min(1)
            .max(1000),
        userId: Joi.string()
            .required()
    })

    return schema.validate(data);
}

//Validando anwsers
const anwserValidation = data => {
    const schema = new Joi.object({
        description: Joi.string()
            .required()
            .min(1)
            .max(1000),
        questionId: Joi.string()
            .required(),
        userId: Joi.string()
            .required()
    })

    return schema.validate(data);
}

module.exports.anwserValidation = anwserValidation;
module.exports.questionValidation = questionValidation;