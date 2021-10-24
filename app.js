const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//Conectando no DB
mongoose.connect(process.env.CONNECT_DB, () => {
    console.log("Conectado ao DB com sucesso!");
});

//Importando routes
const questionsRoute = require('./routes/questions');
const authRoute = require('./routes/auth');

//Middlewares
app.use(express.json()); 

//Middlewares routes
app.use('/questions', questionsRoute);
app.use('/user', authRoute);

app.get('/', (req,res) => {
    res.send("Bem vindo!");
});

app.listen(3000, () => console.log('Servidor online!'));