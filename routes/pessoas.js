const express = require('express');
const router = express.Router();

const Pessoa = require('../models/Pessoa');

router.get('/', (req, res) => {
  Pessoa.find({}, { _id: 0 }).count()
    .then(pessoas => {
      res.json(pessoas);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/:id', (req, res) => {
  let page = req.params.id;
  let limit = 10;
  let skip = limit * (page - 1);
  Pessoa.find({}, { _id: 0 }).skip(skip).limit(limit)
    .then(pessoas => {
      res.json(pessoas);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/novo', (req, res) => {
  if (!req.user.type) {
    res.status(401).json({ message: "You are not authorized to create a Person" })
  } else {
    const novaPessoa = new Pessoa({
      nome: req.body.nome,
      cpf: req.body.cpf,
      salarioBruto: req.body.salarioBruto,
      descontos: req.body.descontos 
    })
    novaPessoa
      .save()
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.put('/editar/:id', (req, res) => {
  if (!req.user.type) {
    return res.status(401).json({ message: "You are not authorized to edit a Person" })
  }
  const novosDados = { nome: req.body.nome, cpf: req.body.cpf, salarioBruto: req.body.salarioBruto, descontos: req.body.descontos };

  Pessoa.findOneAndUpdate({ _id: req.params.id }, novosDados, { new: true })
    .then(pessoa => {
      res.json(pessoa);
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/delete/:id', (req, res) => {
  if (!req.user.type) {
    return res.status(401).json({ message: "You are not authorized to delete a Person" })
  }
  Pessoa.findOneAndDelete({ _id: req.params.id })
    .then(pessoa => {
      res.json(pessoa);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
