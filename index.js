const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());

app.use(cors())

const pessoas = require('./routes/pessoas');
const middAuth = require('./middleware/authentication')
app.use('/api/pessoas', middAuth, pessoas);

const signup = require('./routes/cadastro')
const middSignup = require('./middleware/signup')
app.use('/signup', middSignup, signup)

const login = require('./routes/login')
app.use('/login', login)

mongoose
  .connect('mongodb://db:27017/crud-node-mongo-docker', {
    useNewUrlParser: true
  })
  .then(_result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

app.listen(9000, () => console.log('Server ativo na porta 9000'));