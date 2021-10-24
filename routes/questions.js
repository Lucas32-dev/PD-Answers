const router = require('express').Router();
const Question = require('../models/question');
const { required } = require('@hapi/joi');
const { questionValidation, anwserValidation } = require('../validation');

router.get('/', async (req,res) => {
    try{
        const questions = await Question.find();
        res.json(questions);
    }
    catch(err){

    }
});

router.post('/', async (req, res) => {
    //Valida a pergunta
    const { error } = questionValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const question = new Question({
        description: req.body.description,
        userId: req.body.userId,
    });

    try{
        const savedQuestion = await question.save();
        res.send('Question saved');
    }
    catch(err){

    }
})

module.exports = router;