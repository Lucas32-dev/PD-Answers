const router = require('express').Router();
const Question = require('../models/question');
const Anwser = require('../models/anwser');
const verify = require('../verifyToken');
const { questionValidation, anwserValidation } = require('../validation');
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

    //Verifica se a pergunta já foi respondida pelo user
    const anwserExist = await Anwser.findOne({questionId: req.params.questionId, userId: req.user});
    if(anwserExist) return res.status(400).json('Question already anwsered')

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