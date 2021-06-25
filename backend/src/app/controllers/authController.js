const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../../config/auth.json');
const User = require("../models/User");
const { request } = require('http');
const { response } = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Client = require('../models/Client');

// gera token para valdiar usuário
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

// cadastro de usuário
router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email }))
            res.redirect('/?usuario-ja-cadastrado=true');

        const user = await User.create(req.body);

        user.password = undefined;

        generateToken({ id: user.id })

        res.redirect('/?login=true');

    } catch (err) {
        res.redirect('/?falha-no-cadastro=true');
        location.reload();

    }
});

// autenticação de usuário 
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        res.redirect('/?usuario-nao-encontrado=true');

    if (!await bcrypt.compare(password, user.password))
        res.redirect('/?senha-incorreta=true');

    generateToken({ id: user.id })
    user.password = undefined;

    res.redirect('/auth/cadastroCliente');
});

// criação de cadastro de um novo cliente
router.post('/cadastroCliente/', async (req, res) => {
    const { cpf } = req.body;

    try {
        if (await Client.findOne({ cpf }))
            res.redirect('/auth/cadastroCliente/?usuario-ja-cadastrado=true');

        const client = await Client.create({ ...req.body, user: req.userId });

        await client.save();

        res.redirect('/auth/cadastroCliente/?registro=true');

    } catch (err) {
        res.redirect('/auth/cadastroCliente/?falha-no-cadastro=true');
        location.reload();

    }

});

// busca por cliente
router.get('/cadastroCliente/:objectID', async (req, res) => {
    
try {
      const client = await Client.findById(req.params.objectID).populate(['client']);

      return res.send({ client });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading client' });
    }
});

module.exports = app => app.use('/auth', router);