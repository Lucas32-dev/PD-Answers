const router = require('express').Router();
const Question = require('../models/question');
const Anwser = require('../models/anwser');
const verify = require('../verifyToken');
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
});

router.get('/:questionId', async(req,res) => {
    //Encotra resposta 
    try{
        const question = await Question.findById(req.params.questionId);
        const anwsers = await Anwser.find({questionId: req.params.questionId});
        res.json({question, anwsers});
    }
    catch(err){

    }
});

router.put('/:questionId/anwser', verify, async(req,res) => {
    //Valida a resposta
    const { error } = anwserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const answer = new Anwser({
        description: req.body.description,
        questionId: req.params.questionId,
        userId: req.user
    });

    try{
        const savedAnwser = await answer.save();
        res.send('Anwser saved');
    }
    catch(err){

    }
});


module.exports = router;