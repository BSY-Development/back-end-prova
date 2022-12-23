const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();

const Cadastro = require('../models/Cadastro');

router.post('/', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const userPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    userName: req.body.username,
    password: userPassword,
  }

  found = await Cadastro.find({ userName: newUser.userName }, { _id: 0 })
  if (found.length !== 0) {
    return res.status(409).json({ message: "Account already exists!" });
  }
  const novoCadastro = new Cadastro(newUser);
  novoCadastro
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
