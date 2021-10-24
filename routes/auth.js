const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');
const { registerValidation, loginValidation } = require('../validation'); 

router.post('/register', verify, async (req,res) => {
    //Verifica se é um adiministrador
    const admin = await User.findOne({_id: req.user});
    if(admin.role != "admin") return res.status(401).send('Permission insufficient');
    console.log(admin)

    //Validando data
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Verificando se usuario ja foi registrado
    const emailExist = await User.findOne({email: req.body.email}); 
    if(emailExist) return res.status(400).send('Email already exists');

    //Cripitografando senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });

    try{
        const savedUser = await user.save();
        res.send('User saved');
    }
    catch(err){

    }
});

router.post('/login', async (req,res) => {
    //Validando data
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Verificando se email existe
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email ou senha incorretos');

    //Verificando se a senha esta correta
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Email ou senha incorretos');

    //Gerando jwt
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send('Login feito com sucesso!');
})

module.exports = router;