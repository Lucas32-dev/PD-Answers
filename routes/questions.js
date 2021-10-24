const router = require('express').Router();
const Question = require('../models/question');
const Answer = require('../models/answer');
const verify = require('../verifyToken');
const { questionValidation, answerValidation } = require('../validation');
const User = require('../models/user');

router.get('/', async (req,res) => {
    try{
        const questions = await Question.find();
        res.json(questions);
    }
    catch(err){

    }
});

router.post('/', verify, async (req, res) => {
    //Verfica se é um admin
    const admin = await User.findOne({_id: req.user, role:'admin'});
    if(!admin) return res.status(401).send('Permission insufficient');

    //Valida a pergunta
    const { error } = questionValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const question = new Question({
        description: req.body.description,
        userId: req.user,
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
        const answers = await Answer.find({questionId: req.params.questionId});
        res.json({question, answers});
    }
    catch(err){

    }
});

router.put('/:questionId/answer', verify, async(req,res) => {
    //Valida a resposta
    const { error } = answerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Verifica se a pergunta já foi respondida pelo user
    const answerExist = await Answer.findOne({questionId: req.params.questionId, userId: req.user});
    if(answerExist) return res.status(400).send('Question already answered')

    const answer = new Answer({
        description: req.body.description,
        questionId: req.params.questionId,
        userId: req.user
    });

    try{
        const savedAnswer = await answer.save();
        res.send('Answer saved');
    }
    catch(err){

    }
});


module.exports = router;