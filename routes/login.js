const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.SECRET;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const jwtConfig = {
  expiresIn: '5h',
  algorithm: 'HS256',
};

const Cadastro = require('../models/Cadastro');

router.post('/', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    const user = await Cadastro.findOne({ userName: username });
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = jwt.sign({ data: user }, secret, jwtConfig);
            return res.status(200).json({ token: token });
        } else {
            return res.status(400).json({ error: "Invalid Password" });
        }
    } else if(username === ADMIN_USER && password === ADMIN_PASSWORD) {
        const obj = {
            userName: username,
            password,
            type: "Admin"
        }
        const token = jwt.sign({ data: obj }, secret, jwtConfig);
        return res.status(200).json({ token: token });
    } else {
        return res.status(401).json({ error: "User does not exist" });
    }
});

module.exports = router;
