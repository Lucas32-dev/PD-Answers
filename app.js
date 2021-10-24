const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//Conectando no DB
mongoose.connect(process.env.CONNECT_DB, () => {
    console.log("Conectado ao DB com sucesso!");
});

//Importing routes
const questionsRoute = require('./routes/questions');

//Middlewares
app.use(express.json()); 

//Middlewares routes
app.use('/questions', questionsRoute);

app.get('/', (req,res) => {
    res.send("Bem vindo!");
});

app.listen(3000, () => console.log('Servidor online!'));