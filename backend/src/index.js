const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const path = require ('path');
const session = require('express-session');
const flush = require ('connect-flash');

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'secret',
  cookie: {maxAge:6000},
  resave: false,
  saveUninitialized:false
}));

app.use(flush());

require('./app/controllers/index')(app);

// rotas para iniciar as págians em html

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/resources/front/login.html'));
});

app.get('/auth/register', function (req, res) {
  res.sendFile(path.join(__dirname + '/resources/front/register.html'));
});

app.get('/auth/cadastroCliente', function (req, res) {
  res.sendFile(path.join(__dirname + '/resources/front/cadastroCliente.html'));
});


app.listen(3000);
